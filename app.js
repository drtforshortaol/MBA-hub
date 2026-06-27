const CACHE_MESSAGE_KEY = "whale-parasites-associates-cache-message";
const APP_CACHE_PREFIX = "whale-parasites-associates";

document.addEventListener("DOMContentLoaded", () => {
  buildJumpMenu();
  buildFilters();
  buildCards();
  restoreUpdateMessage();
  setupClearCache();
  registerServiceWorker();

  if (window.renderRelatedHubTopics) {
    window.renderRelatedHubTopics("whale-parasites-associates");
  }
});

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildJumpMenu() {
  const select = document.getElementById("jumpSelect");

  PARASITES.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const id = select.value;
    if (!id) return;

    const card = document.getElementById(id);
    if (!card) return;

    card.open = true;

    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 75);

    select.value = "";
  });
}

function buildFilters() {
  const filterTabs = document.getElementById("filterTabs");

  filterTabs.innerHTML = FILTERS.map(([id, label], index) => `
    <button
      class="filter-tab ${index === 0 ? "active" : ""}"
      type="button"
      data-filter="${escapeHTML(id)}"
    >
      ${escapeHTML(label)}
    </button>
  `).join("");

  document.querySelectorAll(".filter-tab").forEach((button) => {
    button.addEventListener("click", () => {
      filterCards(button.dataset.filter, button);
    });
  });
}

function buildCards() {
  const cardList = document.getElementById("cardList");

  cardList.innerHTML = PARASITES.map((item) => {
    const paragraphs = item.paragraphs
      .map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`)
      .join("");

    const hosts = item.hosts
      .map((host) => `<span class="host-chip">${escapeHTML(host)}</span>`)
      .join("");

    const dots = [1, 2, 3, 4].map((number) => {
      const filled = number <= item.harmDots ? "filled" : "";
      const warn = item.warn ? "warn" : "";
      return `<span class="dot ${filled} ${warn}"></span>`;
    }).join("");

    const facts = item.facts
      .map(([label, value]) => `
        <span class="fact-pill">
          <strong>${escapeHTML(label)}</strong> ${escapeHTML(value)}
        </span>
      `)
      .join("");

    return `
      <details class="card" id="${escapeHTML(item.id)}" data-category="${escapeHTML(item.categories.join(" "))}">
        <summary class="card-trigger">
          <div class="card-icon" style="background:${escapeHTML(item.iconBg)};">${escapeHTML(item.icon)}</div>

          <div class="card-meta">
            <div class="card-name">${escapeHTML(item.name)}</div>
            <div class="card-sci">${escapeHTML(item.sci)}</div>
          </div>

          <span class="card-tag ${escapeHTML(item.tagClass)}">${escapeHTML(item.tag)}</span>
          <span class="card-chevron">›</span>
        </summary>

        <div class="card-body">
          ${paragraphs}

          <div class="hosts-label">${escapeHTML(item.hostsTitle)}</div>
          <div class="host-chips">
            ${hosts}
          </div>

          <div class="harm-bar">
            <span class="harm-label">Harm</span>
            <div class="harm-dots">${dots}</div>
            <span>${escapeHTML(item.harm)}</span>
          </div>

          <div class="fact-row">
            ${facts}
          </div>
        </div>
      </details>
    `;
  }).join("");
}

function filterCards(category, activeButton) {
  document.querySelectorAll(".filter-tab").forEach((button) => {
    button.classList.remove("active");
  });

  activeButton.classList.add("active");

  document.querySelectorAll(".card").forEach((card) => {
    const categories = card.dataset.category || "";
    const shouldHide = category !== "all" && !categories.includes(category);
    card.dataset.hidden = shouldHide ? "true" : "false";
  });
}

function restoreUpdateMessage() {
  const updateMessage = document.getElementById("updateMessage");
  const savedMessage = localStorage.getItem(CACHE_MESSAGE_KEY);

  if (savedMessage) {
    updateMessage.textContent = savedMessage;
  }
}

function setupClearCache() {
  const button = document.getElementById("clearCacheBtn");
  const updateMessage = document.getElementById("updateMessage");

  button.addEventListener("click", async () => {
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

        await Promise.all(thisAppCaches.map((cacheName) => caches.delete(cacheName)));
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

    setTimeout(() => window.location.reload(), 700);
  });
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