const searchInput = document.getElementById("search-input");
const topicsContainer = document.getElementById("topics-container");
const noResults = document.getElementById("no-results");
const updateMessage = document.getElementById("update-message");
const clearCacheButton = document.getElementById("clear-cache-button");
const expandAllButton = document.getElementById("expand-all-button");
const collapseAllButton = document.getElementById("collapse-all-button");

const CACHE_MESSAGE_KEY = "mba-information-center-cache-message";
const APP_CACHE_PREFIX = "mba-information-center";

function escapeHTML(value) {
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

function highlight(text, query) {
  const safeText = escapeHTML(text);
  const cleanQuery = query.trim();

  if (!cleanQuery) {
    return safeText;
  }

  const escapedQuery = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  return safeText.replace(regex, "<mark>$1</mark>");
}

function getItemSearchText(section, item) {
  return normalize([
    section.label,
    section.summary,
    item.question,
    item.answer,
    item.script || "",
    ...(item.bullets || []),
    ...(item.tags || [])
  ].join(" "));
}

function renderTopics(query = "") {
  const cleanQuery = normalize(query);
  let visibleTopicCount = 0;

  const html = appData.sections.map((section, sectionIndex) => {
    const visibleItems = section.items.filter((item) => {
      if (!cleanQuery) return true;
      return getItemSearchText(section, item).includes(cleanQuery);
    });

    if (visibleItems.length === 0) {
      return "";
    }

    visibleTopicCount += 1;

    const shouldOpenTopic = cleanQuery || sectionIndex === 0;

    const itemsHtml = visibleItems.map((item) => {
      const shouldOpenItem = Boolean(cleanQuery);

      const bulletsHtml = item.bullets && item.bullets.length
        ? `<ul>${item.bullets.map((bullet) => `<li>${highlight(bullet, query)}</li>`).join("")}</ul>`
        : "";

      const scriptHtml = item.script
        ? `
          <div class="script-box">
            <strong>Suggested wording:</strong>
            <p>${highlight(item.script, query)}</p>
          </div>
        `
        : "";

      const tagsHtml = item.tags && item.tags.length
        ? `
          <div class="tags">
            ${item.tags.map((tag) => `<span class="tag">${highlight(tag, query)}</span>`).join("")}
          </div>
        `
        : "";

      return `
        <details class="info-item" ${shouldOpenItem ? "open" : ""}>
          <summary>${highlight(item.question, query)}</summary>
          <div class="item-body">
            <p>${highlight(item.answer, query)}</p>
            ${bulletsHtml}
            ${scriptHtml}
            ${tagsHtml}
          </div>
        </details>
      `;
    }).join("");

    return `
      <details class="topic-section ${section.emergency ? "emergency-topic" : ""}" ${shouldOpenTopic ? "open" : ""}>
        <summary>
          <span class="topic-icon" aria-hidden="true">${escapeHTML(section.icon || "🌊")}</span>
          <span class="topic-title-wrap">
            <span class="topic-title">${highlight(section.label, query)}</span>
            <span class="topic-summary">${highlight(section.summary || "", query)}</span>
          </span>
          <span class="topic-arrow" aria-hidden="true">⌄</span>
        </summary>

        <div class="topic-content">
          ${itemsHtml}
        </div>
      </details>
    `;
  }).join("");

  topicsContainer.innerHTML = html;
  noResults.hidden = visibleTopicCount !== 0;
}

function expandAllTopics() {
  document.querySelectorAll(".topic-section").forEach((topic) => {
    topic.open = true;
  });
}

function collapseAllTopics() {
  document.querySelectorAll(".topic-section").forEach((topic) => {
    topic.open = false;
  });
}

function restoreUpdateMessage() {
  const savedMessage = localStorage.getItem(CACHE_MESSAGE_KEY);

  if (savedMessage) {
    updateMessage.textContent = savedMessage;
  }
}

async function clearAppCache() {
  const now = new Date();
  const successMessage = `Cache cleared. Last checked: ${now.toLocaleString()}`;

  updateMessage.textContent = successMessage;
  localStorage.setItem(CACHE_MESSAGE_KEY, successMessage);

  try {
    if ("caches" in window) {
      const cacheNames = await caches.keys();

      const thisAppCaches = cacheNames.filter((cacheName) =>
        cacheName.startsWith(APP_CACHE_PREFIX)
      );

      await Promise.all(
        thisAppCaches.map((cacheName) => caches.delete(cacheName))
      );
    }

    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.getRegistration("./");

      if (registration) {
        await registration.update();
      }
    }
  } catch (error) {
    console.warn("Cache clear warning:", error);

    const warningMessage = `Cache check completed with a warning. Last checked: ${now.toLocaleString()}`;
    updateMessage.textContent = warningMessage;
    localStorage.setItem(CACHE_MESSAGE_KEY, warningMessage);
  }

  window.location.reload();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js", { scope: "./" }).catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
    });
  }
}

searchInput.addEventListener("input", (event) => {
  renderTopics(event.target.value);
});

clearCacheButton.addEventListener("click", clearAppCache);
expandAllButton.addEventListener("click", expandAllTopics);
collapseAllButton.addEventListener("click", collapseAllTopics);

restoreUpdateMessage();
renderTopics();
registerServiceWorker();