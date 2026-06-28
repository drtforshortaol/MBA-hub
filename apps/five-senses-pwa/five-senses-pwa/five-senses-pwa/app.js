/* APP FILE: apps/five-senses-pwa/app.js */

(function () {
  "use strict";

  const DATA = window.FIVE_SENSES_DATA;

  const elements = {
    senseList: document.getElementById("senseList"),
    extraList: document.getElementById("extraList"),
    referenceList: document.getElementById("referenceList"),
    searchInput: document.getElementById("searchInput"),
    resultNote: document.getElementById("resultNote"),
    expandAllButton: document.getElementById("expandAllButton"),
    collapseAllButton: document.getElementById("collapseAllButton"),
    resetSearchButton: document.getElementById("resetSearchButton"),
    clearCacheButton: document.getElementById("clearCacheButton"),
    dismissNoticeButton: document.getElementById("dismissNoticeButton"),
    notificationArea: document.getElementById("notificationArea"),
    troubleshootingPanel: document.getElementById("troubleshootingPanel"),
    troubleshootingOpenButton: document.getElementById("troubleshootingOpenButton"),
    troubleshootingCloseButton: document.getElementById("troubleshootingCloseButton")
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value || "").toLowerCase().trim();
  }

  function makeList(items) {
    if (!items || !items.length) {
      return "";
    }

    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function makeTagRow(tags) {
    if (!tags || !tags.length) {
      return "";
    }

    return `
      <div class="tag-row" aria-label="Tags">
        ${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `;
  }

  function buildSearchText(item) {
    return normalize(JSON.stringify(item));
  }

  function renderSenses() {
    if (!elements.senseList || !DATA || !Array.isArray(DATA.senses)) {
      return;
    }

    elements.senseList.innerHTML = DATA.senses
      .map((sense) => {
        return `
          <details class="accordion-item searchable-item" data-search="${escapeHtml(buildSearchText(sense))}">
            <summary>${escapeHtml(sense.title)}</summary>
            <div class="accordion-content">
              <p><strong>Summary:</strong> ${escapeHtml(sense.summary)}</p>

              <div class="info-grid">
                <div class="info-box">
                  <h3>How it works</h3>
                  <p>${escapeHtml(sense.howItWorks)}</p>
                </div>

                <div class="info-box">
                  <h3>Everyday examples</h3>
                  ${makeList(sense.examples)}
                </div>

                <div class="info-box">
                  <h3>Activity idea</h3>
                  <p>${escapeHtml(sense.activity)}</p>
                </div>

                <div class="info-box">
                  <h3>Review questions</h3>
                  ${makeList(sense.reviewQuestions)}
                </div>
              </div>

              ${makeTagRow(sense.tags)}
            </div>
          </details>
        `;
      })
      .join("");
  }

  function renderExtras() {
    if (!elements.extraList || !DATA || !Array.isArray(DATA.extras)) {
      return;
    }

    elements.extraList.innerHTML = DATA.extras
      .map((section) => {
        return `
          <details class="accordion-item searchable-item" data-search="${escapeHtml(buildSearchText(section))}">
            <summary>${escapeHtml(section.title)}</summary>
            <div class="accordion-content">
              ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}

              <div class="info-box">
                <h3>Prompts</h3>
                ${makeList(section.prompts)}
              </div>

              ${makeTagRow(section.tags)}
            </div>
          </details>
        `;
      })
      .join("");
  }

  function renderReferences() {
    if (!elements.referenceList || !DATA || !Array.isArray(DATA.references)) {
      return;
    }

    elements.referenceList.innerHTML = DATA.references
      .map((reference) => `<li>${escapeHtml(reference)}</li>`)
      .join("");
  }

  function getSearchableItems() {
    return Array.from(document.querySelectorAll(".searchable-item"));
  }

  function setAllDropdowns(open) {
    getSearchableItems().forEach((item) => {
      if (!item.hidden) {
        item.open = open;
      }
    });
  }

  function filterContent() {
    const query = normalize(elements.searchInput ? elements.searchInput.value : "");
    const items = getSearchableItems();
    let matches = 0;

    items.forEach((item) => {
      const text = normalize(item.dataset.search);
      const isMatch = !query || text.includes(query);

      item.hidden = !isMatch;

      if (query && isMatch) {
        item.open = true;
      }

      if (isMatch) {
        matches += 1;
      }
    });

    if (elements.resultNote) {
      if (!query) {
        elements.resultNote.textContent = "";
      } else if (matches === 1) {
        elements.resultNote.textContent = "1 matching section found.";
      } else {
        elements.resultNote.textContent = `${matches} matching sections found.`;
      }
    }
  }

  function resetSearch() {
    if (elements.searchInput) {
      elements.searchInput.value = "";
    }

    getSearchableItems().forEach((item) => {
      item.hidden = false;
      item.open = false;
    });

    if (elements.resultNote) {
      elements.resultNote.textContent = "";
    }

    if (elements.searchInput) {
      elements.searchInput.focus();
    }
  }

  function openTroubleshooting() {
    if (!elements.troubleshootingPanel) {
      return;
    }

    elements.troubleshootingPanel.hidden = false;
    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      if (elements.troubleshootingCloseButton) {
        elements.troubleshootingCloseButton.focus();
      }
    }, 0);
  }

  function closeTroubleshooting() {
    if (!elements.troubleshootingPanel) {
      return;
    }

    elements.troubleshootingPanel.hidden = true;
    document.body.style.overflow = "";

    if (elements.troubleshootingOpenButton) {
      elements.troubleshootingOpenButton.focus();
    }
  }

  async function clearAppCache() {
    const confirmed = window.confirm(
      "Clear this app cache and reload? This helps force the newest version to appear."
    );

    if (!confirmed) {
      return;
    }

    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));
      }

      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
      }

      const separator = window.location.href.includes("?") ? "&" : "?";
      window.location.replace(`${window.location.href}${separator}cache-bust=${Date.now()}`);
    } catch (error) {
      console.error("Cache clearing failed:", error);
      window.alert(
        "Cache clearing did not complete. Try a browser hard refresh or manually clear browser website data."
      );
    }
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
    });
  }

  function bindEvents() {
    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", filterContent);
    }

    if (elements.expandAllButton) {
      elements.expandAllButton.addEventListener("click", () => setAllDropdowns(true));
    }

    if (elements.collapseAllButton) {
      elements.collapseAllButton.addEventListener("click", () => setAllDropdowns(false));
    }

    if (elements.resetSearchButton) {
      elements.resetSearchButton.addEventListener("click", resetSearch);
    }

    if (elements.clearCacheButton) {
      elements.clearCacheButton.addEventListener("click", clearAppCache);
    }

    if (elements.dismissNoticeButton && elements.notificationArea) {
      elements.dismissNoticeButton.addEventListener("click", () => {
        elements.notificationArea.hidden = true;
      });
    }

    if (elements.troubleshootingOpenButton) {
      elements.troubleshootingOpenButton.addEventListener("click", openTroubleshooting);
    }

    if (elements.troubleshootingCloseButton) {
      elements.troubleshootingCloseButton.addEventListener("click", closeTroubleshooting);
    }

    if (elements.troubleshootingPanel) {
      elements.troubleshootingPanel.addEventListener("click", (event) => {
        if (event.target === elements.troubleshootingPanel) {
          closeTroubleshooting();
        }
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && elements.troubleshootingPanel && !elements.troubleshootingPanel.hidden) {
        closeTroubleshooting();
      }
    });
  }

  function init() {
    renderSenses();
    renderExtras();
    renderReferences();
    bindEvents();
    registerServiceWorker();
  }

  document.addEventListener("DOMContentLoaded", init);
})();