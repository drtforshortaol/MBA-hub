const hub = window.MBA_HUB || { categories: [], banners: [] };
const tileGrid = document.getElementById("tileGrid");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const bannerArea = document.getElementById("bannerArea");
const categoryJump = document.getElementById("categoryJump");
const recentPanel = document.getElementById("recentPanel");
const recentSearches = document.getElementById("recentSearches");
const RECENT_KEY = "mbaRecentSearches";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function isActiveBanner(banner) {
  const today = todayISO();
  return (!banner.startDate || banner.startDate <= today) && (!banner.expirationDate || banner.expirationDate >= today);
}

function renderBanners() {
  const active = (hub.banners || []).filter(isActiveBanner);
  bannerArea.innerHTML = active.map(banner => `
    <article class="banner">
      <div class="banner__label">${banner.category || "Update"}</div>
      <h2>${banner.title}</h2>
      <p>${banner.message || ""}</p>
      <small>Expires ${banner.expirationDate || "when removed"}</small>
    </article>
  `).join("");
}

function slugify(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function tileMarkup(item) {
  const id = slugify(item.title);
  const tags = (item.tags || []).map(tag => `<button class="tag" data-tag="${tag}">${tag}</button>`).join("");
  return `
    <article class="tile" id="${id}">
      <div class="tile__icon">${item.icon || "•"}</div>
      <h3>${item.title}</h3>
      <p>${item.description || ""}</p>
      <div class="tags">${tags}</div>
      <a class="open-link ${item.url === "#" ? "disabled" : ""}" href="${item.url || "#"}">${item.url === "#" ? "Coming soon" : "Open"}</a>
    </article>
  `;
}

function renderTiles(items = hub.categories || []) {
  tileGrid.innerHTML = items.map(tileMarkup).join("");
  bindTags();
}

function matches(item, query) {
  const q = query.toLowerCase();
  const text = [item.title, item.description, ...(item.tags || [])].join(" ").toLowerCase();
  return text.includes(q);
}

function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRecentSearch(query) {
  const q = query.trim();
  if (!q) return;
  const existing = getRecentSearches().filter(item => item.toLowerCase() !== q.toLowerCase());
  const updated = [q, ...existing].slice(0, 6);
  localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  renderRecentSearches();
}

function renderRecentSearches() {
  const items = getRecentSearches();
  if (!items.length) {
    recentPanel.style.display = "none";
    recentSearches.innerHTML = "";
    return;
  }
  recentPanel.style.display = "block";
  recentSearches.innerHTML = items.map(item => `<button class="recent-chip" data-query="${item}">${item}</button>`).join("");
  document.querySelectorAll(".recent-chip").forEach(button => {
    button.addEventListener("click", () => {
      searchInput.value = button.dataset.query;
      renderSearch(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function renderSearch(remember = false) {
  const q = searchInput.value.trim();
  if (!q) {
    searchResults.innerHTML = "";
    renderTiles();
    return;
  }
  const matchesList = (hub.categories || []).filter(item => matches(item, q));
  searchResults.innerHTML = `<strong>${matchesList.length} result${matchesList.length === 1 ? "" : "s"}</strong>`;
  renderTiles(matchesList);
  if (remember) saveRecentSearch(q);
}

function renderCategoryJump() {
  categoryJump.innerHTML = `<option value="">Choose a category...</option>` +
    (hub.categories || []).map(item => `<option value="${slugify(item.title)}">${item.icon || ""} ${item.title}</option>`).join("");
}

function bindCategoryJump() {
  categoryJump.addEventListener("change", () => {
    const targetId = categoryJump.value;
    if (!targetId) return;
    searchInput.value = "";
    searchResults.innerHTML = "";
    renderTiles();
    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  });
}

function bindTags() {
  document.querySelectorAll(".tag").forEach(button => {
    button.addEventListener("click", () => {
      searchInput.value = button.dataset.tag;
      renderSearch(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

renderBanners();
renderCategoryJump();
renderRecentSearches();
renderTiles();
bindCategoryJump();
searchInput.addEventListener("input", () => renderSearch(false));
searchInput.addEventListener("search", () => renderSearch(true));
searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") renderSearch(true);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
