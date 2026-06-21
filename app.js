const hub = window.MBA_HUB || { categories: [], banners: [] };
const tileGrid = document.getElementById("tileGrid");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const bannerArea = document.getElementById("bannerArea");

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

function tileMarkup(item) {
  const tags = (item.tags || []).map(tag => `<button class="tag" data-tag="${tag}">${tag}</button>`).join("");
  return `
    <article class="tile">
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

function renderSearch() {
  const q = searchInput.value.trim();
  if (!q) {
    searchResults.innerHTML = "";
    renderTiles();
    return;
  }
  const matchesList = (hub.categories || []).filter(item => matches(item, q));
  searchResults.innerHTML = `<strong>${matchesList.length} result${matchesList.length === 1 ? "" : "s"}</strong>`;
  renderTiles(matchesList);
}

function bindTags() {
  document.querySelectorAll(".tag").forEach(button => {
    button.addEventListener("click", () => {
      searchInput.value = button.dataset.tag;
      renderSearch();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

renderBanners();
renderTiles();
searchInput.addEventListener("input", renderSearch);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
