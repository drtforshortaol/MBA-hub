document.addEventListener("DOMContentLoaded", () => {
  renderHub();
  setupHubCacheButton();
  showHubCacheMessage();
  registerHubServiceWorker();
});

function renderHub() {
  const hub = window.MBA_HUB || {};
  const categories = hub.categories || [];
  const apps = window.MBA_APP_REGISTRY || [];

  const versionLine = document.getElementById("hub-version");
  if (versionLine) {
    versionLine.textContent = `Version ${hub.version || "unknown"} • Updated ${hub.lastUpdated || "unknown"}`;
  }

  renderBanners(hub.banners || []);
  renderCategories(categories, apps);
}

function renderBanners(banners) {
  const bannerArea = document.getElementById("banner-area");
  if (!bannerArea) return;

  bannerArea.innerHTML = "";

  banners.forEach((banner) => {
    const card = document.createElement("article");
    card.className = "banner-card";
    card.innerHTML = `
      <strong>${escapeHTML(banner.title || "Update")}</strong>
      <p>${escapeHTML(banner.message || "")}</p>
    `;
    bannerArea.appendChild(card);
  });
}

function renderCategories(categories, apps) {
  const categoryArea = document.getElementById("category-area");
  if (!categoryArea) return;

  categoryArea.innerHTML = "";

  categories.forEach((category) => {
    const children = apps.filter((app) => app.category === category.title);

    const section = document.createElement("section");
    section.className = children.length ? "category-card category-open" : "category-card category-empty";

    const childrenMarkup = children.length
      ? children.map((app) => {
          const appPath = app.path || app.url || "#";
          return `
            <a class="app-link" href="${escapeAttribute(appPath)}">
              <span class="app-title">${escapeHTML(app.icon || "📘")} ${escapeHTML(app.title || "Untitled App")}</span>
              <span class="app-description">${escapeHTML(app.description || "")}</span>
            </a>
          `;
        }).join("")
      : `<div class="coming-soon">Coming soon</div>`;

    section.innerHTML = `
      <button class="category-button" type="button">
        <span class="category-title"><span class="category-icon">${escapeHTML(category.icon || "📁")}</span>${escapeHTML(category.title || "Category")}</span>
        <span class="category-status">${children.length ? "Open" : "Coming soon"}</span>
      </button>
      <p class="category-description">${escapeHTML(category.description || "")}</p>
      <div class="category-content">
        ${childrenMarkup}
      </div>
    `;

    categoryArea.appendChild(section);
  });

  setupCategoryDropdowns();
}

function setupCategoryDropdowns() {
  const buttons = document.querySelectorAll(".category-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".category-card");
      if (card) {
        card.classList.toggle("expanded");
      }
    });
  });
}

function setupHubCacheButton() {
  const button = document.getElementById("clear-cache-button");
  if (button) {
    button.addEventListener("click", clearHubCache);
  }
}

function showHubCacheMessage() {
  const message = document.getElementById("hub-update-message");
  const lastClear = localStorage.getItem("lastHubCacheClear");

  if (message && lastClear) {
    message.textContent = "Hub cache last cleared: " + lastClear;
  }
}

async function clearHubCache() {
  const message = document.getElementById("hub-update-message");

  if (message) {
    message.textContent = "Clearing Hub cache...";
  }

  try {
    if ("caches" in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    }

    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.update()));
    }

    const now = new Date().toLocaleString();
    localStorage.setItem("lastHubCacheClear", now);

    if (message) {
      message.textContent = "Hub cache cleared. Last checked: " + now;
    }

    setTimeout(() => {
      window.location.reload();
    }, 800);
  } catch (error) {
    console.error("Hub cache clear failed:", error);

    if (message) {
      message.textContent = "Hub cache clear attempted, but there may have been an error.";
    }

    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
}

function registerHubServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch((error) => {
      console.warn("Hub service worker registration failed:", error);
    });
  }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHTML(value);
}
