function renderRelatedHubTopics(currentAppId) {
  const container = document.getElementById("relatedHubTopics");
  const registry = window.MBA_APP_REGISTRY || [];

  if (!container) return;

  const currentApp = registry.find((app) => app.id === currentAppId);

  if (!currentApp || !currentApp.relatedApps || currentApp.relatedApps.length === 0) {
    container.innerHTML = "";
    return;
  }

  const relatedApps = currentApp.relatedApps
    .map((id) => registry.find((app) => app.id === id))
    .filter(Boolean);

  if (relatedApps.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <h2>Related Hub Topics</h2>
    <div class="related-link-grid">
      ${relatedApps.map((app) => `
        <a class="related-link-card" href="../../${app.path}">
          <span class="related-icon">${app.icon || "🔗"}</span>
          <strong>${app.title}</strong>
          <small>${app.category}</small>
        </a>
      `).join("")}
    </div>
  `;
}

window.renderRelatedHubTopics = renderRelatedHubTopics;