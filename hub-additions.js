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
  // Species guides linked from Naturalist Field Notes. Registered here so they
  // appear as separate alphabetically sorted entries in the Hub Animals category.
  const newSpeciesGuides = [
    {
      id: "hopkins-rose-nudibranch",
      name: "Hopkins’ Rose Nudibranch",
      folder: "hopkins-rose-nudibranch",
      url: "apps/hopkins-rose-nudibranch/index.html",
      category: "animals",
      appType: "Illustrated species guide",
      version: "1.0",
      releaseDate: "2026-10-08",
      lastUpdated: "2026-10-08",
      purpose: "Explore Hopkins’ rose nudibranch biology, anatomy, life cycle and changing range.",
      description: "Seven illustrated photographs and diagrams, dorid identification, egg ribbons, gills, rhinophores, diet and warming-water observations.",
      tags: ["nudibranch","Hopkins rose","Ceratodoris rosacea","sea slug","dorid","marine invertebrate","animals"],
      relatedApps: ["naturalist-field-notes"],
      status: "Active"
    },
    {
      id: "pseudo-nitzschia",
      name: "Pseudo-nitzschia",
      folder: "pseudo-nitzschia",
      url: "apps/pseudo-nitzschia/index.html",
      category: "animals",
      appType: "Marine life and harmful algal bloom guide",
      version: "1.0",
      releaseDate: "2026-10-08",
      lastUpdated: "2026-10-08",
      purpose: "Explain Pseudo-nitzschia diatoms, domoic acid and marine food web impacts.",
      description: "Illustrated guide to diatom biology, harmful algal blooms, domoic acid and marine mammals. Diatoms are not animals; this guide is filed under Animals for volunteer browsing.",
      tags: ["Pseudo-nitzschia","diatoms","phytoplankton","harmful algal bloom","domoic acid","marine life"],
      relatedApps: ["naturalist-field-notes"],
      status: "Active"
    }
  ];
  newSpeciesGuides.push({
    id: "pacific-white-sided-dolphin",
    name: "Pacific White-Sided Dolphin",
    folder: "pacific-white-sided-dolphin",
    url: "apps/pacific-white-sided-dolphin/index.html",
    category: "animals",
    appType: "Illustrated species guide",
    version: "1.0",
    releaseDate: "2026-10-08",
    lastUpdated: "2026-10-08",
    purpose: "Explain Pacific white-sided dolphins, Brownell coloration, taxonomy, biology and superpods.",
    description: "Four-image species guide based on March 12, 2026 Naturalist Field Notes.",
    tags: ["Pacific white-sided dolphin","Brownell morph","dolphins","superpods","marine mammals"],
    relatedApps: ["naturalist-field-notes"],
    status: "Active"
  });
  newSpeciesGuides.forEach(guide => {
    if (!registry.apps.some(app => app.id === guide.id)) registry.apps.push(guide);
  });

})();
