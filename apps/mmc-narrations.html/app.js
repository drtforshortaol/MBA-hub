/* APP FILE: apps/mmc-narrations/app.js */

(function () {
  "use strict";

  const APP_DATA = window.MMC_NARRATIONS_DATA || {
    appName: "MMC Narrations",
    version: "v1.0",
    sections: [],
    references: []
  };

  const dropdownContainer = document.getElementById("dropdownContainer");
  const searchInput = document.getElementById("searchInput");
  const resultCount = document.getElementById("resultCount");
  const referencesList = document.getElementById("referencesList");
  const versionDisplay = document.getElementById("versionDisplay");

  const troubleshootingButton = document.getElementById("troubleshootingButton");
  const troubleshootingPanel = document.getElementById("troubleshootingPanel");
  const closeTroubleshootingButton = document.getElementById("closeTroubleshootingButton");

  const clearCacheButton = document.getElementById("clearCacheButton");
  const expandAllButton = document.getElementById("expandAllButton");
  const collapseAllButton = document.getElementById("collapseAllButton");
  const resetSearchButton = document.getElementById("resetSearchButton");

  function normalizeText(value) {
    return String(value || "").toLowerCase().trim();
  }

  function createTextList(items, className) {
    const list = document.createElement("ul");
    list.className = className;

    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });

    return list;
  }

  function createSectionCard(section) {
    const details = document.createElement("details");
    details.className = "dropdown-card";
    details.dataset.searchText = normalizeText([
      section.title,
      section.category,
      section.summary,
      ...(section.body || []),
      ...(section.prompts || []),
      ...(section.tags || [])
    ].join(" "));

    const summary = document.createElement("summary");
    summary.className = "dropdown-summary";

    const summaryText = document.createElement("div");

    const title = document.createElement("div");
    title.className = "dropdown-summary-title";
    title.textContent = section.title;

    const meta = document.createElement("div");
    meta.className = "dropdown-summary-meta";
    meta.textContent = `${section.category || "Section"} · ${section.summary || ""}`;

    summaryText.appendChild(title);
    summaryText.appendChild(meta);

    const chevron = document.createElement("div");
    chevron.className = "dropdown-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "⌄";

    summary.appendChild(summaryText);
    summary.appendChild(chevron);

    const body = document.createElement("div");
    body.className = "dropdown-body";

    if (Array.isArray(section.body) && section.body.length) {
      const bodyTitle = document.createElement("h3");
      bodyTitle.textContent = "Narration Notes";
      body.appendChild(bodyTitle);

      section.body.forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        body.appendChild(p);
      });
    }

    if (Array.isArray(section.prompts) && section.prompts.length) {
      const promptTitle = document.createElement("h3");
      promptTitle.textContent = "Prompts";
      body.appendChild(promptTitle);
      body.appendChild(createTextList(section.prompts, "prompt-list"));
    }

    if (Array.isArray(section.tags) && section.tags.length) {
      const tagRow = document.createElement("div");
      tagRow.className = "tag-row";
      section.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tagRow.appendChild(span);
      });
      body.appendChild(tagRow);
    }

    details.appendChild(summary);
    details.appendChild(body);

    return details;
  }

  function renderSections() {
    dropdownContainer.innerHTML = "";

    if (!APP_DATA.sections || APP_DATA.sections.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "No narration sections are loaded yet. Add entries to data.js.";
      dropdownContainer.appendChild(empty);
      updateResultCount(0, 0);
      return;
    }

    APP_DATA.sections.forEach((section) => {
      dropdownContainer.appendChild(createSectionCard(section));
    });

    updateResultCount(APP_DATA.sections.length, APP_DATA.sections.length);
  }

  function renderReferences() {
    referencesList.innerHTML = "";

    const references = APP_DATA.references || [];

    if (!references.length) {
      const li = document.createElement("li");
      li.textContent = "No references listed yet.";
      referencesList.appendChild(li);
      return;
    }

    references.forEach((reference) => {
      const li = document.createElement("li");
      li.textContent = `${reference.label}: ${reference.note}`;
      referencesList.appendChild(li);
    });
  }

  function updateResultCount(visible, total) {
    resultCount.textContent = `${visible} of ${total} sections shown`;
  }

  function filterSections() {
    const query = normalizeText(searchInput.value);
    const cards = Array.from(document.querySelectorAll(".dropdown-card"));

    let visibleCount = 0;

    cards.forEach((card) => {
      const matches = !query || card.dataset.searchText.includes(query);
      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    });

    updateResultCount(visibleCount, cards.length);
  }

  function setAllDropdowns(open) {
    document.querySelectorAll(".dropdown-card").forEach((card) => {
      if (!card.hidden) {
        card.open = open;
      }
    });
  }

  async function clearAppCache() {
    const buttonOriginalText = clearCacheButton.textContent;
    clearCacheButton.textContent = "Clearing...";

    try {
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
      }

      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.update()));
      }

      clearCacheButton.textContent = "Cache Cleared";
      window.setTimeout(() => {
        window.location.reload();
      }, 650);
    } catch (error) {
      console.error("Cache clear failed:", error);
      clearCacheButton.textContent = "Reloading...";
      window.location.reload();
    } finally {
      window.setTimeout(() => {
        clearCacheButton.textContent = buttonOriginalText;
      }, 1800);
    }
  }

  function openTroubleshooting() {
    troubleshootingPanel.hidden = false;
    troubleshootingButton.setAttribute("aria-expanded", "true");
    closeTroubleshootingButton.focus();
  }

  function closeTroubleshooting() {
    troubleshootingPanel.hidden = true;
    troubleshootingButton.setAttribute("aria-expanded", "false");
    troubleshootingButton.focus();
  }

  function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").catch((error) => {
          console.warn("Service worker registration failed:", error);
        });
      });
    }
  }

  function bindEvents() {
    searchInput.addEventListener("input", filterSections);

    expandAllButton.addEventListener("click", () => setAllDropdowns(true));
    collapseAllButton.addEventListener("click", () => setAllDropdowns(false));

    resetSearchButton.addEventListener("click", () => {
      searchInput.value = "";
      filterSections();
      searchInput.focus();
    });

    clearCacheButton.addEventListener("click", clearAppCache);

    troubleshootingButton.addEventListener("click", openTroubleshooting);
    closeTroubleshootingButton.addEventListener("click", closeTroubleshooting);

    troubleshootingPanel.addEventListener("click", (event) => {
      if (event.target === troubleshootingPanel) {
        closeTroubleshooting();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !troubleshootingPanel.hidden) {
        closeTroubleshooting();
      }
    });
  }

  function init() {
    versionDisplay.textContent = APP_DATA.version || "v1.0";
    renderSections();
    renderReferences();
    bindEvents();
    registerServiceWorker();
  }

  init();
})();