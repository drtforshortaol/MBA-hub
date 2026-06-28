const APP_CACHE_PREFIX = "applied-water-science-life-support";
const CACHE_MESSAGE_KEY = `${APP_CACHE_PREFIX}-cache-message`;

const cards = Array.from(document.querySelectorAll(".card"));
const tagChips = Array.from(document.querySelectorAll(".tag-chip"));
const searchInput = document.getElementById("searchInput");
const resultsLabel = document.getElementById("resultsLabel");

function toggleCard(card) {
  const isOpen = card.classList.toggle("open");
  const header = card.querySelector(".card-header");
  if (header) header.setAttribute("aria-expanded", String(isOpen));
}

function openCardFromHash() {
  const id = window.location.hash.replace("#", "");
  if (!id) return;
  const card = document.getElementById(id);
  if (!card) return;
  card.classList.add("open");
  const header = card.querySelector(".card-header");
  if (header) header.setAttribute("aria-expanded", "true");
  setTimeout(() => card.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
}

function activeTag() {
  return document.querySelector(".tag-chip.active")?.dataset.tag || "all";
}

function normalize(value) {
  return String(value || "").toLowerCase();
}

function cardMatches(card, tag, query) {
  const tags = normalize(card.dataset.tags);
  const haystack = normalize([
    card.dataset.title,
    card.id,
    card.textContent
  ].join(" "));
  const tagOK = tag === "all" || tags.includes(tag);
  const queryOK = !query || haystack.includes(query);
  return tagOK && queryOK;
}

function applyFilters() {
  const tag = activeTag();
  const query = normalize(searchInput.value.trim());
  let visible = 0;

  cards.forEach(card => {
    const show = cardMatches(card, tag, query);
    card.classList.toggle("hidden", !show);
    if (!show) card.classList.remove("open");
    if (show) visible += 1;
  });

  const tagText = tag === "all" ? "all topics" : tag.replaceAll("-", " ");
  resultsLabel.textContent = `Showing ${visible} topic${visible === 1 ? "" : "s"} for ${tagText}${query ? ` matching “${query}”` : ""}`;
}

document.querySelectorAll(".card-header").forEach(header => {
  header.addEventListener("click", () => toggleCard(header.closest(".card")));
});

tagChips.forEach(chip => {
  chip.addEventListener("click", () => {
    tagChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    applyFilters();
  });
});

searchInput.addEventListener("input", applyFilters);

document.getElementById("troubleBtn").addEventListener("click", () => {
  document.getElementById("troublePanel").classList.toggle("hidden");
});

document.getElementById("closeTroubleBtn").addEventListener("click", () => {
  document.getElementById("troublePanel").classList.add("hidden");
});

document.getElementById("clearCacheBtn").addEventListener("click", async () => {
  if ("caches" in window) {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(APP_CACHE_PREFIX)).map(name => caches.delete(name)));
  }
  localStorage.setItem(CACHE_MESSAGE_KEY, `Cache cleared ${new Date().toLocaleString()}. Reopen the app to reload fresh files.`);
  alert("Cache cleared. Reopen the app to reload fresh files.");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(console.warn);
  });
}

window.addEventListener("hashchange", openCardFromHash);
openCardFromHash();
applyFilters();
