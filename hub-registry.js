// ROOT HUB REGISTRY FILE: MBA-hub/hub-registry.js
// Hub 2.2 Registry Safety Update
// Purpose: Master list of installed Hub apps.
// Do not confuse this file with individual app data.js files.

window.MBA_HUB_REGISTRY = {
  version: "2.2",
  lastUpdated: "2026-06-28",
  title: "MBA Hub 2.2",
  description:
    "Monterey Bay Aquarium volunteer companion hub for reference apps, guide tools, troubleshooting, tags, and cross-links.",

  categories: [
    {
      id: "aquarium-updates",
      title: "Aquarium Updates",
      icon: "📰",
      description:
        "Recent animal news, program changes, facility notes, and volunteer announcements."
    },
    {
      id: "exhibits",
      title: "Exhibits",
      icon: "🌊",
      description: "Exhibit reference apps and habitat information."
    },
    {
      id: "animals",
      title: "Animals",
      icon: "🐟",
      description:
        "Species apps, animal facts, conservation notes, and guide-ready explanations."
    },
    {
      id: "visitor-questions",
      title: "Visitor Questions",
      icon: "❓",
      description: "Common visitor questions and short answers."
    },
    {
      id: "guide-talks",
      title: "Guide Talks",
      icon: "🎤",
      description:
        "Talk outlines, themes, stories, and interpretive prompts."
    },
    {
      id: "concepts",
      title: "Concepts",
      icon: "💡",
      description:
        "Science, ocean literacy, ecology, and conservation concepts."
    },
    {
      id: "making-the-aquarium-come-alive",
      title: "Making the Aquarium Come Alive",
      icon: "✨",
      description:
        "Stories, kid facts, visitor engagement, and interpretation tools."
    },
    {
      id: "seafood-watch",
      title: "Seafood Watch",
      icon: "🍽️",
      description:
        "Seafood Watch tools, talking points, and visitor resources."
    },
    {
      id: "volunteer-tools",
      title: "Volunteer Tools",
      icon: "🧰",
      description:
        "Volunteer reference tools, procedures, quick references, troubleshooting, and support apps."
    },
    {
      id: "visitor-services",
      title: "Visitor Services",
      icon: "🗺️",
      description:
        "Visitor support, directions, accessibility, and service information."
    },
    {
      id: "cannery-row",
      title: "Cannery Row",
      icon: "🏛️",
      description:
        "Cannery Row history, concierge tools, restaurants, hotels, and walking guides."
    }
  ],

  apps: [
    {
      id: "information-center",
      name: "Information Center Handbook",
      folder: "information-center",
      url: "apps/information-center/index.html",
      category: "volunteer-tools",
      appType: "PWA dropdown reference app",
      version: "2.1",
      releaseDate: "2026-06-27",
      lastUpdated: "2026-06-27",
      purpose:
        "Provide quick Information Center reference support for Monterey Bay Aquarium volunteers.",
      description:
        "Volunteer Information Center handbook with emergency items, quick navigation, search, dropdown sections, cache refresh, and troubleshooting.",
      tags: [
        "information center",
        "volunteer tools",
        "handbook",
        "quick reference",
        "emergency",
        "radio",
        "lost child",
        "wheelchair",
        "directions",
        "visitor services",
        "accessibility",
        "first aid",
        "guest support"
      ],
      relatedApps: [],
      status: "Active",
      testingStatus:
        "Installed in Hub 2.2; needs PC Chrome, iPhone Safari, Clear Cache, troubleshooting, tag search, related app display, and offline confirmation after upload.",
      notes:
        "First installed app in Hub 2. App folder path is apps/information-center/. Return to Hub path remains ../../index.html."
    },
    {
      id: "northern-elephant-seal",
      name: "Northern Elephant Seal",
      folder: "northern-elephant-seal",
      url: "apps/northern-elephant-seal/index.html",
      category: "animals",
      appType: "Animal guide PWA dropdown app",
      version: "1.2",
      releaseDate: "2026-06-28",
      lastUpdated: "2026-06-28",
      purpose:
        "Provide guide-friendly northern elephant seal reference support for Monterey Bay Aquarium volunteer conversations.",
      description:
        "Animal guide page for northern elephant seal size, migration, breeding, deep diving, underwater sleep, buoyancy, conservation comeback, beach-safe visitor messaging, visitor Q&A, and guide notes.",
      tags: [
        "elephant seal",
        "northern elephant seal",
        "marine mammal",
        "pinniped",
        "true seal",
        "phocid",
        "deep diving",
        "migration",
        "rookery",
        "sleep",
        "buoyancy",
        "conservation",
        "beach safety",
        "visitor question",
        "animals"
      ],
      relatedApps: [
        "marine-mammal-rescue",
        "great-white-shark",
        "deep-sea",
        "upwelling",
        "responsible-wildlife-viewing"
      ],
      status: "Active",
      testingStatus:
        "Final Hub-ready v1.2 registry entry added; needs PC Chrome, iPhone Safari, Clear Cache, Animals category display, direct app link, images, dropdowns, search, troubleshooting, and offline confirmation after upload.",
      notes:
        "App folder path is apps/northern-elephant-seal/. Return to Hub path remains ../../index.html. Related app links are planned cross-links and may remain inactive until companion apps are created."
    }
  ]
};
