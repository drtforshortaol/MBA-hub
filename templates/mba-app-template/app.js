const data = window.APP_DATA || {};

function text(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "";
}

function list(id, items = []) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map(item => `<li>${item}</li>`).join("");
}

function paragraphs(id, items = []) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map(item => `<p>${item}</p>`).join("");
}

function renderImages() {
  const el = document.getElementById("imageSection");
  const images = data.images || [];
  if (!el || !images.length) {
    if (el) el.style.display = "none";
    return;
  }
  el.innerHTML = images.map(image => `
    <figure class="hero-image">
      <img src="${image.src}" alt="${image.alt || ""}" />
      <figcaption>${image.caption || ""}</figcaption>
    </figure>
  `).join("");
}

function renderQuestions() {
  const el = document.getElementById("visitorQuestions");
  const questions = data.visitorQuestions || [];
  if (!el) return;
  el.innerHTML = questions.map(item => `
    <details class="question">
      <summary>${item.question}</summary>
      <p>${item.answer}</p>
    </details>
  `).join("");
}

function renderTags() {
  const el = document.getElementById("tagList");
  if (!el) return;
  el.innerHTML = (data.tags || []).map(tag => `<button class="tag">${tag}</button>`).join("");
}

function renderRelated() {
  const el = document.getElementById("relatedItems");
  if (!el) return;
  el.innerHTML = (data.relatedItems || []).map(item => `
    <article class="related-card">
      <h3>${item.title}</h3>
      <p>${item.type || "Related Item"}</p>
      <a href="${item.url || "#"}">${item.url === "#" ? "Coming soon" : "Open"}</a>
    </article>
  `).join("");
}

text("appCategory", `${data.category || ""} · ${data.contentType || ""}`);
text("appTitle", data.title);
text("appSummary", data.summary);
text("kidsFact", data.kidsFact);
text("story", data.story);
text("versionLine", `Version ${data.version || "1.0"} · Last updated ${data.lastUpdated || ""}`);

renderImages();
list("quickFacts", data.quickFacts || []);
paragraphs("mainContent", data.mainContent || []);
renderQuestions();
list("guideNotes", data.guideNotes || []);
renderTags();
renderRelated();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
