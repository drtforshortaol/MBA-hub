const sectionSelect = document.getElementById("section-select");
const content = document.getElementById("dropdown-content");
const imageList = document.getElementById("image-list");

document.getElementById("app-title").textContent = appData.title;
document.getElementById("app-description").textContent = appData.description;

function loadSections() {
  sectionSelect.innerHTML = "";

  appData.sections.forEach((section, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = section.label;
    sectionSelect.appendChild(option);
  });

  renderSection(0);
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

function renderImages() {
  imageList.innerHTML = appData.images.map((image) => `
    <article class="image-card">
      <p><strong>Filename:</strong> ${image.src}</p>
      <p><strong>Alt text:</strong> ${image.alt}</p>
      <p><strong>Caption:</strong> ${image.caption}</p>
    </article>
  `).join("");
}

sectionSelect.addEventListener("change", (event) => {
  renderSection(Number(event.target.value));
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

loadSections();
renderImages();