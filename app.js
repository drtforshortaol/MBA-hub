(function () {
  const hub = window.MBA_HUB || {};
  const allItems = hub.categories || [];

  const appState = {
    currentView: "home",
    currentCategory: null,
    searchTerm: ""
  };

  function getCategoryItems() {
    return allItems.filter(item => item.type !== "APP");
  }

  function getAppItems() {
    return allItems.filter(item => item.type === "APP");
  }

  function getAppsForCategory(categoryTitle) {
    return getAppItems().filter(app => app.parentCategory === categoryTitle);
  }

  function findRoot() {
    return (
      document.getElementById("app") ||
      document.getElementById("hub") ||
      document.getElementById("content") ||
      document.querySelector("main") ||
      document.body
    );
  }

  function createTagList(tags) {
    if (!tags || !tags.length) return "";

    return `
      <div class="tag-list">
        ${tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `;
  }

  function isOpenable(item) {
    return item.url && item.url !== "#";
  }

  function hasChildApps(item) {
    return getAppsForCategory(item.title).length > 0;
  }

  function createChildAppPreview(item) {
    const apps = getAppsForCategory(item.title);

    if (!apps.length) return "";

    return `
      <div class="child-app-preview">
        <strong>Available inside:</strong>
        <ul>
          ${apps.map(app => `<li>${escapeHtml(app.icon || "•")} ${escapeHtml(app.title)}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  function createCard(item) {
    const openable = isOpenable(item);
    const categoryHasApps = item.type !== "APP" && hasChildApps(item);

    let buttonText = "Coming soon";
    let buttonClass = "card-button disabled";

    if (openable) {
      buttonText = "Open";
      buttonClass = "card-button open";
    } else if (categoryHasApps) {
      buttonText = "Open category";
      buttonClass = "card-button open";
    }

    return `
      <article class="hub-card ${categoryHasApps ? "has-apps" : ""}" data-title="${escapeHtml(item.title)}">
        <div class="card-icon">${item.icon || "🌊"}</div>
        <h2>${escapeHtml(item.title)}</h2>
        <p>${escapeHtml(item.description || "")}</p>
        ${createTagList(item.tags)}
        ${createChildAppPreview(item)}
        <button class="${buttonClass}" data-url="${escapeHtml(item.url || "#")}" data-title="${escapeHtml(item.title)}">
          ${buttonText}
        </button>
      </article>
    `;
  }

  function createBannerHTML() {
    const banners = hub.banners || [];
    if (!banners.length) return "";

    const today = new Date();

    const activeBanners = banners.filter(banner => {
      const start = banner.startDate ? new Date(banner.startDate) : null;
      const end = banner.expirationDate ? new Date(banner.expirationDate) : null;

      if (start && today < start) return false;
      if (end && today > end) return false;
      return true;
    });

    if (!activeBanners.length) return "";

    return `
      <section class="hub-banners">
        ${activeBanners.map(banner => `
          <div class="hub-banner">
            <strong>${escapeHtml(banner.title)}</strong>
            <span>${escapeHtml(banner.message || "")}</span>
          </div>
        `).join("")}
      </section>
    `;
  }

  function renderHeader(title, subtitle, showBackButton) {
    return `
      <header class="hub-header">
        <div>
          ${showBackButton ? `<button class="back-button" id="backButton">← Back</button>` : ""}
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(subtitle || "")}</p>
        </div>

        <div class="hub-search-wrap">
          <input
            id="hubSearch"
            class="hub-search"
            type="search"
            placeholder="Search the Hub..."
            value="${escapeHtml(appState.searchTerm)}"
            autocomplete="off"
          />
        </div>
      </header>
    `;
  }

  function renderHome() {
    appState.currentView = "home";
    appState.currentCategory = null;

    const root = findRoot();
    const categories = getCategoryItems();
    const filtered = filterItems(categories, appState.searchTerm);

    root.innerHTML = `
      ${renderHeader("MBA Volunteer Hub", "Choose a category to begin.", false)}
      ${createBannerHTML()}
      <section class="hub-grid">
        ${filtered.map(createCard).join("")}
      </section>
    `;

    attachEvents();
  }

  function renderCategory(categoryTitle) {
    appState.currentView = "category";
    appState.currentCategory = categoryTitle;

    const root = findRoot();
    const category = getCategoryItems().find(item => item.title === categoryTitle);
    const apps = getAppsForCategory(categoryTitle);
    const filteredApps = filterItems(apps, appState.searchTerm);

    root.innerHTML = `
      ${renderHeader(
        categoryTitle,
        category ? category.description : "Category apps and resources.",
        true
      )}

      <section class="hub-grid">
        ${
          filteredApps.length
            ? filteredApps.map(createCard).join("")
            : `<div class="empty-message">No apps are available in this category yet.</div>`
        }
      </section>
    `;

    attachEvents();
  }

  function renderSearchResults() {
    const root = findRoot();
    const results = filterItems(allItems, appState.searchTerm);

    root.innerHTML = `
      ${renderHeader("Search Results", `Results for “${appState.searchTerm}”`, true)}
      <section class="hub-grid">
        ${
          results.length
            ? results.map(createCard).join("")
            : `<div class="empty-message">No matching Hub items found.</div>`
        }
      </section>
    `;

    attachEvents();
  }

  function filterItems(items, searchTerm) {
    const q = (searchTerm || "").trim().toLowerCase();

    if (!q) return items;

    return items.filter(item => {
      const title = item.title || "";
      const description = item.description || "";
      const category = item.category || "";
      const parentCategory = item.parentCategory || "";
      const contentType = item.contentType || "";
      const locationType = item.locationType || "";
      const tags = (item.tags || []).join(" ");

      const haystack = [
        title,
        description,
        category,
        parentCategory,
        contentType,
        locationType,
        tags
      ].join(" ").toLowerCase();

      return haystack.includes(q);
    });
  }

  function attachEvents() {
    const searchInput = document.getElementById("hubSearch");
    const backButton = document.getElementById("backButton");

    if (searchInput) {
      searchInput.addEventListener("input", event => {
        appState.searchTerm = event.target.value;

        if (appState.searchTerm.trim()) {
          renderSearchResults();
        } else if (appState.currentView === "category" && appState.currentCategory) {
          renderCategory(appState.currentCategory);
        } else {
          renderHome();
        }
      });
    }

    if (backButton) {
      backButton.addEventListener("click", () => {
        appState.searchTerm = "";
        renderHome();
      });
    }

    document.querySelectorAll(".card-button").forEach(button => {
      button.addEventListener("click", event => {
        const url = event.currentTarget.getAttribute("data-url");
        const title = event.currentTarget.getAttribute("data-title");

        if (!url || url === "#") {
          const apps = getAppsForCategory(title);

          if (apps.length) {
            appState.searchTerm = "";
            renderCategory(title);
          }

          return;
        }

        window.location.href = url;
      });
    });

    document.querySelectorAll(".hub-card").forEach(card => {
      card.addEventListener("click", event => {
        if (event.target.classList.contains("card-button")) return;

        const title = card.getAttribute("data-title");
        const item = allItems.find(entry => entry.title === title);

        if (!item) return;

        if (item.type === "APP" && isOpenable(item)) {
          window.location.href = item.url;
          return;
        }

        const apps = getAppsForCategory(item.title);
        if (apps.length) {
          appState.searchTerm = "";
          renderCategory(item.title);
        }
      });
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  document.addEventListener("DOMContentLoaded", renderHome);
})();