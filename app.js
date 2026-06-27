document.addEventListener("DOMContentLoaded", () => {
  buildCategoryFilters();
  renderHub();
  setupSearch();
  setupControls();
  setupNotice();
  setupTroubleshooting();
  setupClearCache();
  registerServiceWorker();
});

let activeCategory = "all";
let searchTerm = "";
let expandedCategories = new Set(["volunteer-tools"]);

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getData() {
  return window.MBA_HUB_2 || { categories: [], apps: [] };
}

function buildCategoryFilters() {
  const { categories } = getData();
  const container = document.getElementById("categoryFilters");
  if (!container) return;

  const buttons = [
    { id: "all", title: "All" },
    ...categories.map(category => ({ id: category.id, title: category.title }))
  ];

  container.innerHTML = buttons.map(button => `
    <button class="filter-btn${button.id === activeCategory ? " active" : ""}" type="button" data-category="${escapeHTML(button.id)}">
      ${escapeHTML(button.title)}
    </button>
  `).join("");

  container.querySelectorAll("button[data-category]").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category || "all";
      if (activeCategory !== "all") expandedCategories.add(activeCategory);
      buildCategoryFilters();
      renderHub();
    });
  });
}

function renderHub() {
  const { categories, apps } = getData();
  const list = document.getElementById("categoryList");
  const activeAppCount = document.getElementById("activeAppCount");
  const categoryCount = document.getElementById("categoryCount");
  if (!list) return;

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const activeApps = apps.filter(app => app.status !== "Retired" && app.status !== "Archived");

  if (activeAppCount) activeAppCount.textContent = String(activeApps.length);
  if (categoryCount) categoryCount.textContent = String(categories.length);

  const filteredCategories = categories
    .map(category => {
      const categoryApps = activeApps.filter(app => app.category === category.id);
      const visibleApps = categoryApps.filter(app => appMatches(app, category, normalizedSearch));
      return { ...category, apps: visibleApps, totalApps: categoryApps.length };
    })
    .filter(category => {
      if (activeCategory !== "all" && category.id !== activeCategory) return false;
      if (normalizedSearch && category.apps.length === 0) return false;
      if (!normalizedSearch && activeCategory === "all" && category.totalApps === 0) return true;
      return category.apps.length > 0 || activeCategory === category.id;
    });

  if (filteredCategories.length === 0) {
    list.innerHTML = `<div class="no-results">No apps matched your search. Try a different keyword or clear the search.</div>`;
    return;
  }

  list.innerHTML = filteredCategories.map(category => renderCategory(category)).join("");

  list.querySelectorAll(".category-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.category;
      if (!id) return;
      if (expandedCategories.has(id)) expandedCategories.delete(id);
      else expandedCategories.add(id);
      renderHub();
    });
  });
}

function appMatches(app, category, normalizedSearch) {
  if (!normalizedSearch) return true;
  const haystack = [
    app.name,
    app.description,
    app.purpose,
    app.status,
    app.testingStatus,
    app.version,
    category.title,
    ...(app.tags || [])
  ].join(" ").toLowerCase();
  return haystack.includes(normalizedSearch);
}

function renderCategory(category) {
  const isExpanded = expandedCategories.has(category.id) || activeCategory === category.id || searchTerm.trim();
  const appCountLabel = `${category.apps.length} ${category.apps.length === 1 ? "app" : "apps"}`;
  return `
    <article class="category-section" id="category-${escapeHTML(category.id)}">
      <button class="category-toggle" type="button" data-category="${escapeHTML(category.id)}" aria-expanded="${isExpanded ? "true" : "false"}">
        <span>
          <span class="category-title"><span aria-hidden="true">${escapeHTML(category.icon)}</span>${escapeHTML(category.title)}</span>
          <span class="category-meta">${escapeHTML(category.description)}</span>
        </span>
        <span class="category-meta">${escapeHTML(appCountLabel)} ${isExpanded ? "▴" : "▾"}</span>
      </button>
      <div class="category-content" ${isExpanded ? "" : "hidden"}>
        ${category.apps.length ? `<div class="app-grid">${category.apps.map(app => renderAppCard(app)).join("")}</div>` : `<div class="no-results">No apps installed in this category yet.</div>`}
      </div>
    </article>
  `;
}

function renderAppCard(app) {
  const tags = (app.tags || []).slice(0, 8).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("");
  return `
    <article class="app-card">
      <h3>${escapeHTML(app.name)}</h3>
      <p>${escapeHTML(app.description)}</p>
      <div class="app-tags" aria-label="Tags">${tags}</div>
      <div class="app-card-footer">
        <span class="status-pill">${escapeHTML(app.status)} · v${escapeHTML(app.version)}</span>
        <a class="open-app" href="${escapeHTML(app.url)}">Open App</a>
      </div>
    </article>
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
      if (input) input.value = "";
      renderHub();
      input?.focus();
    });
  }
}

function setupControls() {
  const expand = document.getElementById("expandAllBtn");
  const collapse = document.getElementById("collapseAllBtn");
  const { categories } = getData();
  expand?.addEventListener("click", () => {
    expandedCategories = new Set(categories.map(category => category.id));
    renderHub();
  });
  collapse?.addEventListener("click", () => {
    expandedCategories = new Set();
    renderHub();
  });
}

function setupNotice() {
  const notice = document.getElementById("hubNotice");
  const dismiss = document.getElementById("dismissNoticeBtn");
  const key = "mba-hub-2-notice-dismissed-v2.0";
  if (!notice || !dismiss) return;
  if (localStorage.getItem(key) === "true") notice.hidden = true;
  dismiss.addEventListener("click", () => {
    localStorage.setItem(key, "true");
    notice.hidden = true;
  });
}

function setupTroubleshooting() {
  const openButton = document.getElementById("troubleshootingBtn");
  const panel = document.getElementById("troubleshootingPanel");
  const closeButton = document.getElementById("closeTroubleshootingBtn");
  if (!openButton || !panel || !closeButton) return;

  const openPanel = () => {
    panel.hidden = false;
    openButton.setAttribute("aria-expanded", "true");
    closeButton.focus();
  };
  const closePanel = () => {
    panel.hidden = true;
    openButton.setAttribute("aria-expanded", "false");
    openButton.focus();
  };

  openButton.addEventListener("click", openPanel);
  closeButton.addEventListener("click", closePanel);
  panel.addEventListener("click", event => {
    if (event.target === panel) closePanel();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) closePanel();
  });
}

function setupClearCache() {
  const button = document.getElementById("clearHubCacheBtn");
  button?.addEventListener("click", async () => {
    showStatus("Clearing Hub 2 cache and reloading…");
    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(registration => registration.update()));
      }
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.filter(key => key.startsWith("mba-hub-2-")).map(key => caches.delete(key)));
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
    navigator.serviceWorker.register("sw.js").catch(error => {
      console.warn("Hub service worker registration failed:", error);
    });
  });
}
