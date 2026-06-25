const CACHE_NAME = "whale-parasites-associates-v1";

document.addEventListener("DOMContentLoaded", () => {
  buildJumpMenu();
  buildFilters();
  buildCards();
  setupClearCache();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
});

function buildJumpMenu() {
  const select = document.getElementById("jumpSelect");

  PARASITES.forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    const id = select.value;
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    el.open = true;
    setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    select.value = "";
  });
}

function buildFilters() {
  const tabs = document.getElementById("filterTabs");

  FILTERS.forEach(([id, label], index) => {
    const button = document.createElement("button");
    button.className = `filter-tab ${index === 0 ? "active" : ""}`;
    button.textContent = label;
    button.addEventListener("click", () => filterCards(id, button));
    tabs.appendChild(button);
  });
}

function buildCards() {
  const list = document.getElementById("cardList");

  list.innerHTML = PARASITES.map(item => `
    <details class="card" id="${item.id}" data-category="${item.categories.join(" ")}">
      <summary class="card-trigger">
        <div class="card-icon" style="background:${item.iconBg};">${item.icon}</div>
        <div class="card-meta">
          <div class="card-name">${item.name}</div>
          <div class="card-sci">${item.sci}</div>
        </div>
        <span class="card-tag ${item.tagClass}">${item.tag}</span>
        <span class="card-chevron">›</span>
      </summary>

      <div class="card-body">
        ${item.paragraphs.map(p => `<p>${p}</p>`).join("")}

        <div class="hosts-label">${item.hostsTitle}</div>
        <div class="host-chips">
          ${item.hosts.map(host => `<span class="host-chip">${host}</span>`).join("")}
        </div>

        <div class="harm-bar">
          <span>Harm level</span>
          <div class="harm-dots">
            ${[1,2,3,4].map(n => `
              <div class="dot ${n <= item.harmDots ? "filled" : ""} ${item.warn ? "warn" : ""}"></div>
            `).join("")}
          </div>
          <span>${item.harm}</span>
        </div>

        <div class="fact-row">
          ${item.facts.map(([label, value]) => `
            <span class="fact-pill"><strong>${label}</strong> ${value}</span>
          `).join("")}
        </div>
      </div>
    </details>
  `).join("");
}

function filterCards(category, btn) {
  document.querySelectorAll(".filter-tab").forEach(tab => tab.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".card").forEach(card => {
    const cats = card.dataset.category || "";
    card.dataset.hidden = category !== "all" && !cats.includes(category);
  });
}

function setupClearCache() {
  const button = document.getElementById("clearCacheBtn");
  const message = document.getElementById("updateMessage");

  button.addEventListener("click", async () => {
    if ("caches" in window) {
      const names = await caches.keys();
      await Promise.all(names.map(name => caches.delete(name)));
    }

    const checked = new Date().toLocaleString();
    localStorage.setItem("whaleParasitesLastChecked", checked);
    message.textContent = `Cache cleared. Last checked: ${checked}`;

    setTimeout(() => window.location.reload(), 700);
  });

  const lastChecked = localStorage.getItem("whaleParasitesLastChecked");
  if (lastChecked) {
    message.textContent = `Cache cleared. Last checked: ${lastChecked}`;
  }
}