const sectionSelect = document.getElementById("section-select");
const searchInput = document.getElementById("search-input");
const content = document.getElementById("content");
const emergencySection = document.getElementById("emergency-section");
const imageList = document.getElementById("image-list");

function loadSectionOptions() {
  sectionSelect.innerHTML = "";

  appData.sections.forEach((section, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = section.label;
    sectionSelect.appendChild(option);
  });
}

function renderEmergency() {
  emergencySection.innerHTML = `
    <h2>${appData.emergency.title}</h2>
    <div class="emergency-grid">
      ${appData.emergency.items.map((item) => `
        <article class="emergency-card">
          <h3>${item.label}</h3>
          <p>${item.text}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function renderSection(index) {
  const section = appData.sections[index];

  content.innerHTML = `
    <h2>${section.label}</h2>
    <div class="accordion">
      ${section.items.map((item) => `
        <details>
          <summary>${item.question}</summary>
          <p>${item.answer}</p>
        </details>
      `).join("")}
    </div>
  `;
}

function renderSearchResults(query) {
  const cleanQuery = query.trim().toLowerCase();

  if (!cleanQuery) {
    renderSection(Number(sectionSelect.value || 0));
    return;
  }

  const results = [];

  appData.sections.forEach((section) => {
    section.items.forEach((item) => {
      const searchableText = `${section.label} ${item.question} ${item.answer}`.toLowerCase();

      if (searchableText.includes(cleanQuery)) {
        results.push({
          section: section.label,
          question: item.question,
          answer: item.answer
        });
      }
    });
  });

  if (results.length === 0) {
    content.innerHTML = `
      <h2>Search Results</h2>
      <p class="empty-state">No matching topics found. Try another keyword or choose a topic from the dropdown.</p>
    `;
    return;
  }

  content.innerHTML = `
    <h2>Search Results</h2>
    <p class="result-count">${results.length} result${results.length === 1 ? "" : "s"} found.</p>
    <div class="accordion">
      ${results.map((item) => `
        <details open>
          <summary>${item.question}</summary>
          <p class="section-label">${item.section}</p>
          <p>${item.answer}</p>
        </details>
      `).join("")}
    </div>
  `;
}

function renderImages() {
  imageList.innerHTML = appData.images.map((image) => `
    <article class="image-card">
      <p><strong>Filename:</strong> ${image.src}</p>
      <p><strong>Alt text:</strong> ${image.alt}</p>
      <p><strong>Caption:</strong> ${image.caption}</p>
    </article>
  `).join("");
}

sectionSelect.addEventListener("change", () => {
  searchInput.value = "";
  renderSection(Number(sectionSelect.value));
});

searchInput.addEventListener("input", (event) => {
  renderSearchResults(event.target.value);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

loadSectionOptions();
renderEmergency();
renderSection(0);
renderImages();