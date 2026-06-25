const searchInput = document.getElementById("search-input");
const topicsContainer = document.getElementById("topics-container");
const noResults = document.getElementById("no-results");
const updateMessage = document.getElementById("update-message");
const clearCacheButton = document.getElementById("clear-cache-button");
const expandAllButton = document.getElementById("expand-all-button");
const collapseAllButton = document.getElementById("collapse-all-button");

const infoCenterData = window.appData || null;

const CACHE_MESSAGE_KEY = "mba-information-center-cache-message";
const APP_CACHE_PREFIX = "mba-information-center";

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function highlight(text, query) {
  const safeText = escapeHTML(text);
  const cleanQuery = String(query || "").trim();

  if (!cleanQuery) {
    return safeText;
  }

  const escapedQuery = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  return safeText.replace(regex, "<mark>$1</mark>");
}

function getSectionSearchText(section) {
  const cardsText = (section.cards || [])
    .map((card) => `${card.label} ${card.value} ${card.sub}`)
    .join(" ");

  const itemsText = (section.items || [])
    .map((item) => [
      item.question,
      item.answer,
      ...(item.bullets || []),
      item.script || "",
      ...(item.tags || [])
    ].join(" "))
    .join(" ");

  return normalize([
    section.label,
    section.summary,
    cardsText,
    itemsText
  ].join(" "));
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

function renderQuickReferenceCards(section, query) {
  return `
    <div class="old-quick-reference-panel">
      ${(section.cards || []).map((card) => `
        <article class="old-quick-reference-card">
          <div class="old-quick-reference-label">${highlight(card.label, query)}</div>
          <div class="old-quick-reference-value">${highlight(card.value, query)}</div>
          <div class="old-quick-reference-sub">${highlight(card.sub, query)}</div>
        </article>
      `).join("")}
    </div>
  `;
}

function renderInfoItems(section, visibleItems, query) {
  if (!visibleItems.length) {
    return "";
  }

  return visibleItems.map((item) => {
    const shouldOpenItem = Boolean(String(query || "").trim());

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
}

function renderDataError() {
  if (!topicsContainer) {
    return;
  }

  topicsContainer.innerHTML = `
    <section class="empty-state">
      <h2>Information Center data did not load</h2>
      <p>
        Replace the entire data.js file with the clean 10-topic version.
        Do not paste a topic block into the existing file.
      </p>
    </section>
  `;

  if (noResults) {
    noResults.hidden = true;
  }
}

function renderTopics(query = "") {
  if (!infoCenterData || !Array.isArray(infoCenterData.sections)) {
    renderDataError();
    return;
  }

  const cleanQuery = normalize(query);
  let visibleTopicCount = 0;

  const html = infoCenterData.sections.map((section, sectionIndex) => {
    const hasCards = Boolean(
      section.quickReference &&
      Array.isArray(section.cards) &&
      section.cards.length > 0
    );

    const sectionMatches = !cleanQuery || getSectionSearchText(section).includes(cleanQuery);

    const visibleItems = (section.items || []).filter((item) => {
      if (!cleanQuery) {
        return true;
      }

      return getItemSearchText(section, item).includes(cleanQuery);
    });

    const shouldShowSection = hasCards
      ? sectionMatches
      : sectionMatches || visibleItems.length > 0;

    if (!shouldShowSection) {
      return "";
    }

    visibleTopicCount += 1;

    const shouldOpenTopic = cleanQuery || sectionIndex === 0;
    const topicCount = hasCards ? section.cards.length : visibleItems.length;

    const quickReferenceHtml = hasCards
      ? renderQuickReferenceCards(section, query)
      : "";

    const itemsHtml = renderInfoItems(section, visibleItems, query);

    return `
      <details
        class="topic-section ${section.emergency ? "emergency-topic" : ""} ${section.quickReference ? "old-quick-reference-topic" : ""}"
        style="--topic-color: ${escapeHTML(section.color || "#005f73")};"
        ${shouldOpenTopic ? "open" : ""}
      >
        <summary>
          <span class="topic-icon" aria-hidden="true">${escapeHTML(section.icon || "🌊")}</span>
          <span class="topic-title-wrap">
            <span class="topic-title">${highlight(section.label, query)}</span>
            <span class="topic-summary">${highlight(section.summary || "", query)}</span>
          </span>
          <span class="topic-count" aria-label="topic count">${topicCount}</span>
          <span class="topic-arrow" aria-hidden="true">⌄</span>
        </summary>

        <div class="topic-content ${hasCards ? "old-quick-reference-content" : ""}">
          ${quickReferenceHtml}
          ${itemsHtml}
        </div>
      </details>
    `;
  }).join("");

  topicsContainer.innerHTML = html;

  if (noResults) {
    noResults.hidden = visibleTopicCount !== 0;
  }
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
  if (!updateMessage) {
    return;
  }

  const savedMessage = localStorage.getItem(CACHE_MESSAGE_KEY);

  if (savedMessage) {
    updateMessage.textContent = savedMessage;
  }
}

async function clearAppCache() {
  const now = new Date();
  const successMessage = `Cache cleared. Last checked: ${now.toLocaleString()}`;

  if (updateMessage) {
    updateMessage.textContent = successMessage;
  }

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

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    renderTopics(event.target.value);
  });
}

if (clearCacheButton) {
  clearCacheButton.addEventListener("click", clearAppCache);
}

if (expandAllButton) {
  expandAllButton.addEventListener("click", expandAllTopics);
}

if (collapseAllButton) {
  collapseAllButton.addEventListener("click", collapseAllTopics);
}

restoreUpdateMessage();
renderTopics();
registerServiceWorker();