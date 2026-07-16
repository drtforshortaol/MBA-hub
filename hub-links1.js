// ROOT HUB LINKS FILE: MBA-hub/hub-links.js
// Hub 2.2 Registry Safety Update
// Purpose: Optional intentional Hub-level cross-links.
// Use this only for relationships that are stronger or more specific than shared tags.
// Do not confuse this file with individual app data.js files.

window.MBA_HUB_LINKS = {
  version: "2.2",
  lastUpdated: "2026-07-15",

  links: [
    {
      fromApp: "mmc-narrations",
      toApps: [
        "interpretation-principles",
        "five-senses-pwa",
        "information-center"
      ],
      type: "manual-cross-link",
      reason:
        "MMC Narrations is an exhibit narration app that supports visitor-facing interpretation, guide preparation, and sensory engagement.",
      tags: [
        "mmc",
        "exhibits",
        "narrations",
        "interpretation",
        "guide talks",
        "visitor engagement"
      ],
      dateCreated: "2026-06-29",
      lastUpdated: "2026-06-29"
    },

    {
      fromApp: "open-sea",
      toApps: [
        "into-the-deep",
        "monterey-bay-habitat",
        "ocean-currents",
        "kelp-forest",
        "animal-adaptations",
        "applied-water-science-life-support"
      ],
      type: "manual-cross-link",
      reason:
        "Connects open-sea physical factors with deep-water habitats, Monterey Bay conditions, circulation, contrasting coastal habitats, animal adaptations, and aquarium water science.",
      tags: [
        "open sea",
        "pelagic zone",
        "exhibits",
        "physical environment",
        "ocean currents",
        "thermohaline circulation",
        "adaptations"
      ],
      dateCreated: "2026-07-15",
      lastUpdated: "2026-07-15"
    }
  ]
};