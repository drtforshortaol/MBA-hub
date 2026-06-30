// ROOT HUB LINKS FILE: MBA-hub/hub-links.js
// Hub 2.2 Registry Safety Update
// Purpose: Optional intentional Hub-level cross-links.
// Use this only for relationships that are stronger or more specific than shared tags.
// Do not confuse this file with individual app data.js files.

window.MBA_HUB_LINKS = {
  version: "2.2",
  lastUpdated: "2026-06-29",

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
        "MMC Narrations supports guide talks, visitor question responses, and interpretive storytelling. These related apps support interpretation principles, sensory engagement, and volunteer reference support.",
      tags: [
        "narrations",
        "interpretation",
        "guide talks",
        "visitor engagement",
        "volunteer tools"
      ],
      dateCreated: "2026-06-29",
      lastUpdated: "2026-06-29"
    }
  ]
};