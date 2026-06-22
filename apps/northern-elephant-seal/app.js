const DATA = window.APP_DATA;

const sectionImages = {
  snapshot: ["size_compare", "size_sketch"],
  where: ["migration_map", "cons_basics"],
  natural: ["rookery_scene", "calendar", "diet_diagram"],
  why: ["cons_comeback", "cons_success"],
  sleep: ["sleep_diagram", "buoyancy_chart"]
};

const imageByName = Object.fromEntries((DATA.images || []).map(img => {
  const name = img.src.split("/").pop().replace(/\.(jpe?g|png|webp|gif|svg)$/i, "");
  return [name, img];
}));

function imageHtml(keys) {
  return keys.map(key => {
    const img = imageByName[key];
    if (!img) return "";
    return `<figure class="fig"><img src="${img.src}" alt="${img.alt}" loading="lazy"><figcaption class="cap">${img.caption}</figcaption></figure>`;
  }).join("");
}

function para(text) {
  return String(text || "").split("\n").filter(Boolean).map(t => `<p>${t}</p>`).join("");
}

function list(items) {
  return `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;
}

function accordionItem(icon, title, sub, html, open=false) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `<article class="item">
    <button class="trigger" type="button" aria-expanded="${open}" aria-controls="${id}">
      <span class="ticon">${icon}</span>
      <span class="ttext"><span class="ttitle">${title}</span><span class="tsub">${sub}</span></span>
      <span class="chev">▼</span>
    </button>
    <div class="panel ${open ? "open" : ""}" id="${id}">
      <div class="panel-inner">${html}</div>
    </div>
  </article>`;
}

function build() {
  document.querySelector("#app-title").textContent = DATA.title;
  document.querySelector("#scientific-name").textContent = DATA.scientificName;
  document.querySelector("#summary").textContent = DATA.summary;

  const snap = DATA.snapshot;
  document.querySelector("#snapshot-strip").innerHTML = [
    ["Length", snap.lengthSize],
    ["Weight", snap.weight],
    ["Diet", snap.diet],
    ["Depth", snap.depth],
    ["Status", snap.conservationStatus]
  ].map(([k,v]) => `<div class="stat"><div class="key">${k}</div><div class="val">${v}</div></div>`).join("");

  const natural = DATA.naturalHistory;
  const naturalHtml = `
    ${imageHtml(["rookery_scene", "calendar", "diet_diagram"])}
    <div class="grid2">
      ${Object.entries({
        Habitat: natural.habitat,
        Range: natural.range,
        Depth: natural.depth,
        Diet: natural.diet,
        Predators: natural.predators,
        Behavior: natural.behavior,
        Lifespan: natural.lifespan,
        "Conservation Status": natural.conservationStatus
      }).map(([k,v]) => `<div class="cell"><div class="key">${k}</div><div class="val">${v}</div></div>`).join("")}
    </div>
    <div class="callout"><b>Adaptations:</b> ${natural.adaptations.join(" ")}</div>`;

  const qaHtml = DATA.visitorQuestions.map(q => `<div class="qa"><h3>${q.question}</h3><p>${q.answer}</p></div>`).join("");
  const tagsHtml = `<div class="chips">${DATA.tags.map(t => `<span class="chip">${t}</span>`).join("")}</div>`;
  const relatedHtml = `<div class="related">${DATA.relatedItems.map(item => `<a href="${item.url}"><b>${item.title}</b><small>${item.type} · ${item.tags.join(", ")}</small></a>`).join("")}</div>`;

  document.querySelector("#accordion").innerHTML = [
    accordionItem("📌", "Snapshot / Quick Facts", "Size, diet, predators, range, and status", `${imageHtml(["size_compare", "size_sketch"])}<div class="grid2">${Object.entries(snap).map(([k,v]) => `<div class="cell"><div class="key">${k.replace(/([A-Z])/g, " $1")}</div><div class="val">${v}</div></div>`).join("")}</div>`, true),
    accordionItem("🎈", "Short Fun Kids Fact", "A quick fact children remember", para(DATA.kidsFact)),
    accordionItem("🌊", "Story", "A short spoken mini-script", para(DATA.story)),
    accordionItem("📍", "Where to See It at MBA", "Marine mammal cart and coastal viewing context", `${imageHtml(["migration_map", "cons_basics"])}${para(DATA.whereToSee)}`),
    accordionItem("🔎", "Natural History", "Habitat, behavior, adaptations, and ecology", naturalHtml),
    accordionItem("💙", "Why It Matters", "Conservation and beach-safe messaging", `${imageHtml(["cons_comeback", "cons_success"])}${para(DATA.whyItMatters)}`),
    accordionItem("🙋", "Visitor Q & A", "Guide-friendly answers to common questions", qaHtml),
    accordionItem("🧭", "Guide Notes", "Talking points for volunteers", list(DATA.guideNotes)),
    accordionItem("🏷️", "Tags", "Cross-link tags for the MBA Hub", tagsHtml),
    accordionItem("🔗", "Related Items", "Suggested companion apps", relatedHtml),
    accordionItem("🗓️", "Version / Last Updated", "Publication metadata", `<p><b>Version:</b> ${DATA.version}</p><p><b>Last updated:</b> ${DATA.lastUpdated}</p>`)
  ].join("");

  document.querySelectorAll(".trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      panel.classList.toggle("open", !expanded);
    });
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}

build();