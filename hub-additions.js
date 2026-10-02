// Supplemental Hub registry additions. Keeps new modular apps separate from the master registry.
(function () {
  const registry = window.MBA_HUB_REGISTRY;
  if (!registry || !Array.isArray(registry.apps)) return;

  // Dedicated category for guide knowledge, field observations, Naturalist notes,
  // and future Bay Watch / field-reference modules.
  if (Array.isArray(registry.categories) && !registry.categories.some(category => category.id === "naturalist-field-knowledge")) {
    const newCategory = {
      id: "naturalist-field-knowledge",
      title: "Naturalist & Field Knowledge",
      icon: "🌊",
      description: "Naturalist updates, field observations, Bay Watch, species highlights, and guide knowledge from Monterey Bay."
    };
    const visitorIndex = registry.categories.findIndex(category => category.id === "visitor-services");
    if (visitorIndex >= 0) registry.categories.splice(visitorIndex, 0, newCategory);
    else registry.categories.push(newCategory);
  }

  if (!registry.apps.some(app => app.id === "flamboyant-cuttlefish")) {
    registry.apps.push({
      id: "flamboyant-cuttlefish",
      name: "Flamboyant Cuttlefish",
      folder: "flamboyant-cuttlefish",
      url: "apps/flamboyant-cuttlefish/index.html",
      category: "animals",
      appType: "Animal guide PWA dropdown app",
      version: "1.0",
      releaseDate: "2026-10-01",
      lastUpdated: "2026-10-01",
      purpose: "Provide a guide-friendly reference for flamboyant cuttlefish and the Ocean in Motion exhibit.",
      description: "Searchable species guide covering quick facts, reproduction, hunting, walking behavior, color change, anatomy, intelligence, toxicity, biomimicry, Aquarium connections, and visitor talking points.",
      tags: ["flamboyant cuttlefish","cuttlefish","cephalopod","animals","ocean in motion","camouflage","chromatophores","cuttlebone","tetrodotoxin","intelligence","visitor questions","biomimicry"],
      relatedApps: ["interpretation-principles","five-senses-pwa","naturalist-field-notes"],
      status: "Active",
      testingStatus: "Uploaded to Hub; needs iPhone Safari, Hub display, search, Return to Hub, and offline confirmation.",
      notes: "App folder path is apps/flamboyant-cuttlefish/. Return to Hub path is ../../index.html."
    });
  }

  if (!registry.apps.some(app => app.id === "naturalist-field-notes")) {
    registry.apps.push({
      id: "naturalist-field-notes",
      name: "Naturalist Field Notes",
      folder: "naturalist-field-notes",
      url: "apps/naturalist-field-notes/index.html",
      category: "naturalist-field-knowledge",
      appType: "Naturalist field notes and reference PWA",
      version: "0.4",
      releaseDate: "2026-10-02",
      lastUpdated: "2026-10-02",
      purpose: "Preserve dated naturalist updates while extracting reusable Q&A, Bay Watch sightings, and links to durable species guides.",
      description: "Searchable weekly field notes with current observations, archive, visitor Q&A, Bay Watch, species highlights, photographs, and Naturalist resources.",
      tags: ["naturalist","field notes","field knowledge","visitor questions","bay watch","sightings","humpback whales","orcas","dolphins","species highlights","monterey bay"],
      relatedApps: ["flamboyant-cuttlefish"],
      status: "Active",
      testingStatus: "Dedicated Naturalist & Field Knowledge category; ready for iPhone Safari and offline testing.",
      notes: "App folder path is apps/naturalist-field-notes/. Field Notes preserve when events happened; species guides preserve durable species information. Bay Watch remains structured for a future standalone app."
    });
  } else {
    // Keep an existing registry entry aligned with the dedicated category.
    const naturalistApp = registry.apps.find(app => app.id === "naturalist-field-notes");
    naturalistApp.category = "naturalist-field-knowledge";
  }
})();
