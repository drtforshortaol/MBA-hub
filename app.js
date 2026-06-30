// ROOT HUB FILE: MBA-hub/app.js
// Hub 2.2.2 Floor-Use Layout Cleanup
// Purpose: Root Hub behavior, install panel, help panel, search, filtering, app cards, tags, and related apps.
// Do not confuse this with individual app app.js files.

document.addEventListener("DOMContentLoaded", () => {
  buildCategoryFilters();
  renderHub();
  setupSearch();
  setupControls();
  setupNotice();
  setupInstallPanel();
  setupHelpPanel();
  setupClearCache();
  registerServiceWorker();
});

let activeCategory = "all";
let searchTerm = "";
let expandedCategories = new Set();

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function getData() {
  return window.MBA_HUB_REGISTRY || {
    version: "2.2.2",
    lastUpdated: "",
    title: "MBA Hub",
    description: "",
    categories: [],
    apps: []
  };
}

function getTagsData() {
  return window.MBA_HUB_TAGS || {
    version: "2.2",
    lastUpdated: "",
    tags: []
  };
}

function getLinksData() {
  return window.MBA_HUB_LINKS || {
    version: "2.2",
    lastUpdated: "",
    links: []
  };
}

function getActiveApps() {
  const { apps } = getData();

  return apps.filter((app) => {
    return app.status !== "Retired" && app.status !== "Archived";
  });
}

function getCategoryById(categoryId) {
  const { categories } = getData();
  return categories.find((category) => category.id === categoryId);
}

function buildCategoryFilters() {
  const { categories } = getData();
  const container = document.getElementById("categoryFilters");

  if (!container) return;

  const buttons = [
    { id: "all", title: "All" },
    ...categories.map((category) => ({
      id: category.id,
      title: category.title
    }))
  ];

  container.innerHTML = buttons
    .map((button) => {
      const activeClass = button.id === activeCategory ? " active" : "";

      return `
        <button
          class="filter-btn${activeClass}"
          type="button"
          data-category="${escapeHTML(button.id)}"
        >
          ${escapeHTML(button.title)}
        </button>
      `;
    })
    .join("");

  container.querySelectorAll("button[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category || "all";

      if (activeCategory !== "all") {
        expandedCategories.add(activeCategory);
      }

      buildCategoryFilters();
      renderHub();
    });
  });
}

function renderHub() {
  const { categories } = getData();
  const apps = getActiveApps();

  const list = document.getElementById("categoryList");
  const activeAppCount = document.getElementById("activeAppCount");
  const categoryCount = document.getElementById("categoryCount");

  if (!list) return;

  const normalizedSearch = normalize(searchTerm);

  if (activeAppCount) {
    activeAppCount.textContent = String(apps.length);
  }

  if (categoryCount) {
    categoryCount.textContent = String(categories.length);
  }

  const filteredCategories = categories
    .map((category) => {
      const categoryApps = apps.filter((app) => app.category === category.id);

      const visibleApps = categoryApps.filter((app) =>
        appMatches(app, category, normalizedSearch)
      );

      return {
        ...category,
        apps: visibleApps,
        totalApps: categoryApps.length
      };
    })
    .filter((category) => {
      if (activeCategory !== "all" && category.id !== activeCategory) {
        return false;
      }

      if (normalizedSearch && category.apps.length === 0) {
        return false;
      }

      if (!normalizedSearch && activeCategory === "all" && category.totalApps === 0) {
        return true;
      }

      return category.apps.length > 0 || activeCategory === category.id;
    });

  const visibleAppCount = filteredCategories.reduce((total, category) => {
    return total + category.apps.length;
  }, 0);

  updateSearchResultStatus(visibleAppCount, normalizedSearch);

  if (filteredCategories.length === 0) {
    list.innerHTML = `
      <div class="no-results">
        No apps matched your search. Try a different keyword or clear the search.
      </div>
    `;
    return;
  }

  list.innerHTML = filteredCategories.map((category) => renderCategory(category)).join("");

  setupCategoryToggles(list);
  setupTagButtons(list);
}

function updateSearchResultStatus(visibleAppCount, normalizedSearch) {
  const status = document.getElementById("searchResultStatus");

  if (!status) return;

  const categoryText =
    activeCategory === "all"
      ? "all categories"
      : getCategoryById(activeCategory)?.title || activeCategory;

  if (!normalizedSearch && activeCategory === "all") {
    status.textContent = "";
    return;
  }

  if (normalizedSearch) {
    status.textContent = `Showing ${visibleAppCount} ${
      visibleAppCount === 1 ? "app" : "apps"
    } for “${searchTerm}” in ${categoryText}.`;
    return;
  }

  status.textContent = `Showing ${visibleAppCount} ${
    visibleAppCount === 1 ? "app" : "apps"
  } in ${categoryText}.`;
}

function setupCategoryToggles(list) {
  list.querySelectorAll(".category-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.category;

      if (!id) return;

      if (expandedCategories.has(id)) {
        expandedCategories.delete(id);
      } else {
        expandedCategories.add(id);
      }

      renderHub();
    });
  });
}

function setupTagButtons(list) {
  const input = document.getElementById("searchInput");

  list.querySelectorAll("button[data-tag]").forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tag || "";

      searchTerm = tag;

      if (input) {
        input.value = tag;
        input.focus();
      }

      expandedCategories = new Set(getData().categories.map((category) => category.id));
      renderHub();
    });
  });
}

function appMatches(app, category, normalizedSearch) {
  if (!normalizedSearch) return true;

  const relatedText = getRelatedApps(app)
    .map((relatedApp) => `${relatedApp.name} ${relatedApp.description}`)
    .join(" ");

  const tagRegistryText = getMatchingTagRegistryText(app);

  const haystack = [
    app.id,
    app.name,
    app.folder,
    app.url,
    app.description,
    app.purpose,
    app.status,
    app.testingStatus,
    app.version,
    app.appType,
    category.title,
    category.description,
    relatedText,
    tagRegistryText,
    ...(app.tags || [])
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedSearch);
}

function getMatchingTagRegistryText(app) {
  const { tags } = getTagsData();
  const appTags = new Set((app.tags || []).map((tag) => normalize(tag)));

  return tags
    .filter((tagEntry) => appTags.has(normalize(tagEntry.tag)))
    .map((tagEntry) => {
      return [
        tagEntry.tag,
        tagEntry.type,
        tagEntry.description,
        ...(tagEntry.relatedCategories || []),
        ...(tagEntry.notes ? [tagEntry.notes] : [])
      ].join(" ");
    })
    .join(" ");
}

function renderCategory(category) {
  const isExpanded =
    expandedCategories.has(category.id) ||
    activeCategory === category.id ||
    Boolean(searchTerm.trim());

  const appCountLabel = `${category.apps.length} ${
    category.apps.length === 1 ? "app" : "apps"
  }`;

  return `
    <article class="category-section" id="category-${escapeHTML(category.id)}">
      <button
        class="category-toggle"
        type="button"
        data-category="${escapeHTML(category.id)}"
        aria-expanded="${isExpanded ? "true" : "false"}"
      >
        <span>
          <span class="category-title">
            <span aria-hidden="true">${escapeHTML(category.icon || "🌊")}</span>
            ${escapeHTML(category.title)}
          </span>
          <span class="category-meta">
            ${escapeHTML(category.description)}
          </span>
        </span>

        <span class="category-meta">
          ${escapeHTML(appCountLabel)} ${isExpanded ? "▴" : "▾"}
        </span>
      </button>

      <div class="category-content" ${isExpanded ? "" : "hidden"}>
        ${
          category.apps.length
            ? `<div class="app-grid">${category.apps
                .map((app) => renderAppCard(app))
                .join("")}</div>`
            : `<div class="no-results">No apps installed in this category yet.</div>`
        }
      </div>
    </article>
  `;
}

function renderAppCard(app) {
  const tags = renderTags(app.tags || []);
  const related = renderRelatedApps(app);

  return `
    <article class="app-card" id="app-${escapeHTML(app.id)}">
      <h3>${escapeHTML(app.name)}</h3>

      <p>${escapeHTML(app.description)}</p>

      ${
        tags
          ? `<div class="app-tags" aria-label="Tags">${tags}</div>`
          : ""
      }

      ${related}

      <div class="app-card-footer">
        <span class="status-pill">
          ${escapeHTML(app.status || "Active")} · v${escapeHTML(app.version || "1.0")}
        </span>

        <a class="open-app" href="${escapeHTML(app.url)}">
          Open App
        </a>
      </div>
    </article>
  `;
}

function renderTags(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return "";

  return tags
    .slice(0, 12)
    .map((tag) => {
      return `
        <button
          class="tag"
          type="button"
          data-tag="${escapeHTML(tag)}"
          title="Filter by ${escapeHTML(tag)}"
        >
          ${escapeHTML(tag)}
        </button>
      `;
    })
    .join("");
}

function getRelatedApps(app) {
  const apps = getActiveApps();
  const relatedMap = new Map();

  getManualRelatedApps(app, apps).forEach((relatedApp) => {
    relatedMap.set(relatedApp.id, {
      ...relatedApp,
      relatedReason: "manual"
    });
  });

  getHubLinkRelatedApps(app, apps).forEach((relatedApp) => {
    if (!relatedMap.has(relatedApp.id)) {
      relatedMap.set(relatedApp.id, {
        ...relatedApp,
        relatedReason: "hub link"
      });
    }
  });

  getSharedTagRelatedApps(app, apps).forEach((relatedApp) => {
    if (!relatedMap.has(relatedApp.id)) {
      relatedMap.set(relatedApp.id, {
        ...relatedApp,
        relatedReason: "shared tag"
      });
    }
  });

  return Array.from(relatedMap.values());
}

function getManualRelatedApps(app, apps) {
  if (!Array.isArray(app.relatedApps) || app.relatedApps.length === 0) {
    return [];
  }

  return app.relatedApps
    .map((relatedId) => apps.find((candidate) => candidate.id === relatedId))
    .filter(Boolean);
}

function getHubLinkRelatedApps(app, apps) {
  const { links } = getLinksData();

  if (!Array.isArray(links) || links.length === 0) {
    return [];
  }

  return links
    .filter((link) => link.fromApp === app.id || link.toApp === app.id)
    .map((link) => {
      const relatedId = link.fromApp === app.id ? link.toApp : link.fromApp;
      return apps.find((candidate) => candidate.id === relatedId);
    })
    .filter(Boolean);
}

function getSharedTagRelatedApps(app, apps) {
  const sourceTags = new Set((app.tags || []).map((tag) => normalize(tag)));

  if (sourceTags.size === 0) return [];

  return apps
    .filter((candidate) => candidate.id !== app.id)
    .map((candidate) => {
      const candidateTags = candidate.tags || [];
      const sharedTags = candidateTags.filter((tag) => sourceTags.has(normalize(tag)));

      return {
        candidate,
        sharedTags
      };
    })
    .filter((item) => item.sharedTags.length > 0)
    .sort((a, b) => b.sharedTags.length - a.sharedTags.length)
    .slice(0, 6)
    .map((item) => ({
      ...item.candidate,
      sharedTags: item.sharedTags
    }));
}

function renderRelatedApps(app) {
  const relatedApps = getRelatedApps(app);

  if (relatedApps.length === 0) return "";

  const links = relatedApps
    .map((relatedApp) => {
      const label = relatedApp.sharedTags?.length
        ? `${relatedApp.name} · ${relatedApp.sharedTags.slice(0, 2).join(", ")}`
        : relatedApp.name;

      return `
        <a class="related-link" href="#app-${escapeHTML(relatedApp.id)}">
          ${escapeHTML(label)}
        </a>
      `;
    })
    .join("");

  return `
    <div class="related-apps-block">
      <p class="related-apps-title">Related apps</p>
      <div class="related-apps">
        ${links}
      </div>
    </div>
  `;
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  const clear = document.getElementById("clearSearchBtn");

  if (input) {
    input.addEventListener("input", () => {
      searchTerm = input.value;
      renderHub();
    });
  }

  if (clear) {
    clear.addEventListener("click", () => {
      searchTerm = "";
      activeCategory = "all";

      if (input) {
        input.value = "";
        input.focus();
      }

      expandedCategories = new Set();
      buildCategoryFilters();
      renderHub();
    });
  }
}

function setupControls() {
  const expand = document.getElementById("expandAllBtn");
  const collapse = document.getElementById("collapseAllBtn");
  const { categories } = getData();

  if (expand) {
    expand.addEventListener("click", () => {
      expandedCategories = new Set(categories.map((category) => category.id));
      renderHub();
    });
  }

  if (collapse) {
    collapse.addEventListener("click", () => {
      expandedCategories = new Set();
      renderHub();
    });
  }
}

function setupNotice() {
  const notice = document.getElementById("hubNotice");
  const dismiss = document.getElementById("dismissNoticeBtn");
  const key = "mba-hub-2-notice-dismissed-v2.2.2";

  if (!notice || !dismiss) return;

  if (localStorage.getItem(key) === "true") {
    notice.hidden = true;
  }

  dismiss.addEventListener("click", () => {
    localStorage.setItem(key, "true");
    notice.hidden = true;
  });
}

function setupInstallPanel() {
  const openButton = document.getElementById("installBtn");
  const panel = document.getElementById("installPanel");
  const closeButton = document.getElementById("closeInstallBtn");

  setupModal(openButton, panel, closeButton);
}

function setupHelpPanel() {
  const openButton = document.getElementById("helpBtn");
  const panel = document.getElementById("helpPanel");
  const closeButton = document.getElementById("closeHelpBtn");

  setupModal(openButton, panel, closeButton);
}

function setupModal(openButton, panel, closeButton) {
  if (!openButton || !panel || !closeButton) return;

  const openPanel = () => {
    panel.hidden = false;
    openButton.setAttribute("aria-expanded", "true");

    setTimeout(() => {
      closeButton.focus();
    }, 0);
  };

  const closePanel = () => {
    panel.hidden = true;
    openButton.setAttribute("aria-expanded", "false");

    setTimeout(() => {
      openButton.focus();
    }, 0);
  };

  openButton.addEventListener("click", openPanel);
  closeButton.addEventListener("click", closePanel);

  panel.addEventListener("click", (event) => {
    if (event.target === panel) {
      closePanel();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      closePanel();
    }
  });
}

function setupClearCache() {
  const button = document.getElementById("clearHubCacheBtn");

  if (!button) return;

  button.addEventListener("click", async () => {
    showStatus("Clearing Hub cache and reloading…");

    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();

        await Promise.all(
          registrations.map((registration) => registration.update())
        );
      }

      if ("caches" in window) {
        const keys = await caches.keys();

        await Promise.all(
          keys
            .filter((key) => key.startsWith("mba-hub-"))
            .map((key) => caches.delete(key))
        );
      }
    } catch (error) {
      console.warn("Cache clear issue:", error);
    } finally {
      window.location.reload();
    }
  });
}

function showStatus(message) {
  const status = document.getElementById("statusMessage");

  if (!status) return;

  status.textContent = message;
  status.hidden = false;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.warn("Hub service worker registration failed:", error);
    });
  });
}