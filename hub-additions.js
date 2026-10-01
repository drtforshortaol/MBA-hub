// Supplemental Hub registry additions. Keeps new modular apps separate from the master registry.
(function () {
  const registry = window.MBA_HUB_REGISTRY;
  if (!registry || !Array.isArray(registry.apps)) return;
  if (registry.apps.some(app => app.id === "flamboyant-cuttlefish")) return;

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
    relatedApps: ["interpretation-principles","five-senses-pwa"],
    status: "Active",
    testingStatus: "Uploaded to Hub; needs iPhone Safari, Hub display, search, Return to Hub, and offline confirmation.",
    notes: "App folder path is apps/flamboyant-cuttlefish/. Return to Hub path is ../../index.html."
  });
})();
