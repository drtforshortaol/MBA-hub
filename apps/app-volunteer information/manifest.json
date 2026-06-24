const CACHE_MESSAGE_KEY = "mba-information-center-cache-message";

const sectionsContainer = document.getElementById("sectionsContainer");
const quickCards = document.getElementById("quickCards");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
const updateMessage = document.getElementById("updateMessage");
const clearCacheButton = document.getElementById("clearCacheButton");
const expandAllButton = document.getElementById("expandAllButton");
const collapseAllButton = document.getElementById("collapseAllButton");

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

function itemSearchText(section, item) {
  return normalize([
    section.title,
    section.summary,
    item.title,
    item.body,
    item.script || "",
    ...(item.bullets || []),
    ...(item.tags || [])
  ].join(" "));
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

function renderQuickCards() {
  quickCards.innerHTML = APP_DATA.quickCards.map(card => `
    <article class="quick-card">
      <h2>${escapeHTML(card.title)}</h2>
      <p>${escapeHTML(card.text)}</p>
    </article>
  `).join("");
}

function renderSections(query = "") {
  const cleanQuery = normalize(query);
  let visibleSectionCount = 0;

  const html = APP_DATA.sections.map((section, sectionIndex) => {
    const matchingItems = section.items.filter(item => {
      if (!cleanQuery) return true;
      return itemSearchText(section, item).includes(cleanQuery);
    });

    if (matchingItems.length === 0) {
      return "";
    }

    visibleSectionCount += 1;

    const itemsHtml = matchingItems.map(item => {
      const bulletsHtml = item.bullets && item.bullets.length
        ? `<ul>${item.bullets.map(bullet => `<li>${highlight(bullet, query)}</li>`).join("")}</ul>`
        : "";

      const tagsHtml = item.tags && item.tags.length
        ? `
          <div class="tags">
            ${item.tags.map(tag => `<span class="tag">${highlight(tag, query)}</span>`).join("")}
          </div>
        `
        : "";

      const scriptHtml = item.script
        ? `
          <div class="script-box">
            <strong>Suggested wording:</strong>
            <p>${highlight(item.script, query)}</p>
          </div>
        `
        : "";

      return `
        <article class="info-item">
          <h3>${highlight(item.title, query)}</h3>
          <p>${highlight(item.body, query)}</p>
          ${bulletsHtml}
          ${scriptHtml}
          ${tagsHtml}
        </article>
      `;
    }).join("");

    const shouldOpen = cleanQuery || sectionIndex === 0;

    return `
      <article class="info-section ${shouldOpen ? "open" : ""}">
        <button class="section-toggle" type="button" aria-expanded="${shouldOpen ? "true" : "false"}">
          <span class="section-title-wrap">
            <span class="section-title">${highlight(section.title, query)}</span>
            <span class="section-summary">${highlight(section.summary, query)}</span>
          </span>
          <span class="chevron" aria-hidden="true">⌄</span>
        </button>

        <div class="section-content">
          <div class="item-grid">
            ${itemsHtml}
          </div>
        </div>
      </article>
    `;
  }).join("");

  sectionsContainer.innerHTML = html;
  noResults.classList.toggle("hidden", visibleSectionCount !== 0);

  wireSectionToggles();
}

function wireSectionToggles() {
  const toggles = document.querySelectorAll(".section-toggle");

  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const section = toggle.closest(".info-section");
      const isOpen = section.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

function expandAll() {
  document.querySelectorAll(".info-section").forEach(section => {
    section.classList.add("open");
    const toggle = section.querySelector(".section-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  });
}

function collapseAll() {
  document.querySelectorAll(".info-section").forEach(section => {
    section.classList.remove("open");
    const toggle = section.querySelector(".section-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
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
  const message = `Cache cleared. Last checked: ${now.toLocaleString()}`;

  updateMessage.textContent = message;
  localStorage.setItem(CACHE_MESSAGE_KEY, message);

  try {
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
    }

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(registration => registration.update()));
    }
  } catch (error) {
    console.warn("Cache clear encountered an issue:", error);
  }

  window.location.reload();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(error => {
        console.warn("Service worker registration failed:", error);
      });
    });
  }
}

searchInput.addEventListener("input", event => {
  renderSections(event.target.value);
});

clearCacheButton.addEventListener("click", clearAppCache);
expandAllButton.addEventListener("click", expandAll);
collapseAllButton.addEventListener("click", collapseAll);

restoreUpdateMessage();
renderQuickCards();
renderSections();
registerServiceWorker();