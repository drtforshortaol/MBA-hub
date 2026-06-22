const data = window.APP_DATA;

document.title = `${data.title} | MBA Hub`;

document.getElementById("app-title").textContent = data.title;
document.getElementById("app-summary").textContent = data.summary;

const heroSection = document.getElementById("hero-section");
const content = document.getElementById("content");

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function makeDropdown(title, innerHTML, open = false) {
  return `
    <details class="dropdown" ${open ? "open" : ""}>
      <summary>${escapeHTML(title)}</summary>
      <div class="dropdown-body">
        ${innerHTML}
      </div>
    </details>
  `;
}

function list(items) {
  return `<ul>${items.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>`;
}

function paragraphs(items) {
  return items.map(item => `<p>${escapeHTML(item)}</p>`).join("");
}

function renderHero() {
  if (!data.images || !data.images.length) return;

  const image = data.images[0];

  heroSection.innerHTML = `
    <figure class="hero-card">
      <img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt)}">
      <figcaption class="hero-caption">${escapeHTML(image.caption)}</figcaption>
    </figure>
  `;
}

function renderMainContent() {
  return data.mainContent.map(block => `
    <div class="content-block">
      <h3>${escapeHTML(block.heading)}</h3>
      ${Array.isArray(block.body) ? paragraphs(block.body) : `<p>${escapeHTML(block.body)}</p>`}
    </div>
  `).join("");
}

function renderQuestions() {
  return data.visitorQuestions.map(item => `
    <div class="qa">
      <p class="question">${escapeHTML(item.question)}</p>
      <p class="answer">${escapeHTML(item.answer)}</p>
    </div>
  `).join("");
}

function renderTags() {
  return `
    <div class="tag-wrap">
      ${data.tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}
    </div>
  `;
}

function renderRelated() {
  return `
    <div class="related-wrap">
      ${data.relatedItems.map(item => `
        <a class="related-card" href="${escapeHTML(item.url)}">
          <strong>${escapeHTML(item.title)}</strong>
          <span>${escapeHTML(item.type)} · ${item.tags.map(escapeHTML).join(", ")}</span>
        </a>
      `).join("")}
    </div>
  `;
}

function renderVersion() {
  return `
    <p><strong>Version:</strong> ${escapeHTML(data.version)}</p>
    <p><strong>Last updated:</strong> ${escapeHTML(data.lastUpdated)}</p>
    <p><strong>Category:</strong> ${escapeHTML(data.category)}</p>
    <p><strong>Content type:</strong> ${escapeHTML(data.contentType)}</p>
    <p><strong>Location type:</strong> ${escapeHTML(data.locationType)}</p>
    <p><strong>Status:</strong> Ready for MBA Hub publication.</p>
  `;
}

function renderApp() {
  renderHero();

  content.innerHTML = [
    makeDropdown("Quick Facts", list(data.quickFacts), true),
    makeDropdown("Short Fun Kids Fact", `<p>${escapeHTML(data.kidsFact)}</p>`),
    makeDropdown("Story", `<p>${escapeHTML(data.story)}</p>`),
    makeDropdown("Main Content", renderMainContent()),
    makeDropdown("Visitor Questions", renderQuestions()),
    makeDropdown("Guide Notes", list(data.guideNotes)),
    makeDropdown("Tags", renderTags()),
    makeDropdown("Related Items", renderRelated()),
    makeDropdown("Version / Last Updated", renderVersion())
  ].join("");
}

renderApp();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(error => {
      console.warn("Service worker registration failed:", error);
    });
  });
}
