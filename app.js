const searchInput = document.getElementById("search-input");
const content = document.getElementById("content");
const emergencySection = document.getElementById("emergency-section");
const updateMessage = document.getElementById("update-message");
const clearCacheButton = document.getElementById("clear-cache-button");
const topicButtonList = document.getElementById("topic-button-list");
const selectedTopicLabel = document.getElementById("selected-topic-label");
const topicDropdown = document.getElementById("topic-dropdown");

const CACHE_MESSAGE_KEY = "mba-information-center-cache-message";
const APP_CACHE_PREFIX = "mba-information-center";

let currentSectionIndex = 0;

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function renderTopicButtons() {
  topicButtonList.innerHTML = appData.sections.map((section, index) => `
    <button
      class="topic-button ${index === currentSectionIndex ? "active" : ""}"
      type="button"
      data-section-index="${index}"
    >
      ${escapeHTML(section.label)}
    </button>
  `).join("");

  selectedTopicLabel.textContent = appData.sections[currentSectionIndex].label;

  document.querySelectorAll(".topic-button").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionIndex = Number(button.dataset.sectionIndex);

      currentSectionIndex = sectionIndex;
      searchInput.value = "";

      renderTopicButtons();
      renderSection(currentSectionIndex);

      topicDropdown.open = false;
      content.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderEmergency() {
  emergencySection.innerHTML = `
    <h2>${escapeHTML(appData.emergency.title)}</h2>
    <div class="emergency-grid">
      ${appData.emergency.items.map((item) => `
        <article class="emergency-card">
          <h3>${escapeHTML(item.label)}</h3>
          <p>${escapeHTML(item.text)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderSection(index) {
  const section = appData.sections[index] || appData.sections[0];

  content.innerHTML = `
    <h2>${escapeHTML(section.label)}</h2>
    <div class="accordion">
      ${section.items.map((item) => `
        <details>
          <summary>${escapeHTML(item.question)}</summary>
          <p>${escapeHTML(item.answer)}</p>
        </details>
      `).join("")}
    </div>
  `;
}

function renderSearchResults(query) {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) {
    renderTopicButtons();
    renderSection(currentSectionIndex);
    return;
  }

  const results = [];

  appData.sections.forEach((section) => {
    section.items.forEach((item) => {
      const searchableText = `${section.label} ${item.question} ${item.answer}`.toLowerCase();

      if (searchableText.includes(cleanQuery)) {
        results.push({
          section: section.label,
          question: item.question,
          answer: item.answer
        });
      }
    });
  });

  selectedTopicLabel.textContent = `Search: ${query}`;

  document.querySelectorAll(".topic-button").forEach((button) => {
    button.classList.remove("active");
  });

  if (results.length === 0) {
    content.innerHTML = `
      <h2>Search Results</h2>
      <p class="empty-state">No matching topics found. Try another keyword or choose a topic from the dropdown.</p>
    `;
    return;
  }

  content.innerHTML = `
    <h2>Search Results</h2>
    <p class="result-count">${results.length} result${results.length === 1 ? "" : "s"} found.</p>
    <div class="accordion">
      ${results.map((item) => `
        <details open>
          <summary>${highlight(item.question, query)}</summary>
          <p class="section-label">${highlight(item.section, query)}</p>
          <p>${highlight(item.answer, query)}</p>
        </details>
      `).join("")}
    </div>
  `;
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
  renderSearchResults(event.target.value);
});

clearCacheButton.addEventListener("click", clearAppCache);

restoreUpdateMessage();
renderTopicButtons();
renderEmergency();
renderSection(currentSectionIndex);
registerServiceWorker();