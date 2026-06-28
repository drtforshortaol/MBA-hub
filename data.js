window.MBA_HUB_2 = {
  version: "2.1",
  lastUpdated: "2026-06-27",
  title: "MBA Hub 2.1",
  description: "Monterey Bay Aquarium volunteer companion hub for reference apps, guide tools, troubleshooting, tags, and cross-links.",

  categories: [
    {
      id: "aquarium-updates",
      title: "Aquarium Updates",
      icon: "📰",
      description: "Recent animal news, program changes, facility notes, and volunteer announcements."
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
      description: "Species apps, animal facts, conservation notes, and guide-ready explanations."
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
      description: "Talk outlines, themes, stories, and interpretive prompts."
    },
    {
      id: "concepts",
      title: "Concepts",
      icon: "💡",
      description: "Science, ocean literacy, ecology, and conservation concepts."
    },
    {
      id: "making-the-aquarium-come-alive",
      title: "Making the Aquarium Come Alive",
      icon: "✨",
      description: "Stories, kid facts, visitor engagement, and interpretation tools."
    },
    {
      id: "seafood-watch",
      title: "Seafood Watch",
      icon: "🍽️",
      description: "Seafood Watch tools, talking points, and visitor resources."
    },
    {
      id: "volunteer-tools",
      title: "Volunteer Tools",
      icon: "🧰",
      description: "Volunteer reference tools, procedures, quick references, troubleshooting, and support apps."
    },
    {
      id: "visitor-services",
      title: "Visitor Services",
      icon: "🗺️",
      description: "Visitor support, directions, accessibility, and service information."
    },
    {
      id: "cannery-row",
      title: "Cannery Row",
      icon: "🏛️",
      description: "Cannery Row history, concierge tools, restaurants, hotels, and walking guides."
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
      purpose: "Provide quick Information Center reference support for Monterey Bay Aquarium volunteers.",
      description: "Volunteer Information Center handbook with emergency items, quick navigation, search, dropdown sections, cache refresh, and troubleshooting.",
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
      testingStatus: "Installed in Hub 2.1; needs PC Chrome, iPhone Safari, Clear Cache, troubleshooting, tag search, and offline confirmation after upload.",
      notes: "First installed app in Hub 2. App folder path is apps/information-center/. Return to Hub path remains ../../index.html."
    }
  ],

  tagRegistry: [
    {
      tag: "information center",
      type: "app topic",
      description: "Information Center reference and volunteer support material.",
      relatedApps: ["information-center"]
    },
    {
      tag: "volunteer tools",
      type: "hub category",
      description: "Tools intended to support Monterey Bay Aquarium volunteers.",
      relatedApps: ["information-center"]
    },
    {
      tag: "quick reference",
      type: "content type",
      description: "Fast lookup material for use while guiding or assisting visitors.",
      relatedApps: ["information-center"]
    },
    {
      tag: "emergency",
      type: "procedure",
      description: "Emergency-related volunteer reference information.",
      relatedApps: ["information-center"]
    },
    {
      tag: "radio",
      type: "procedure",
      description: "Radio communication and contact workflow references.",
      relatedApps: ["information-center"]
    },
    {
      tag: "lost child",
      type: "procedure",
      description: "Lost child or separated party reference material.",
      relatedApps: ["information-center"]
    },
    {
      tag: "wheelchair",
      type: "visitor support",
      description: "Wheelchair and accessibility-related visitor support.",
      relatedApps: ["information-center"]
    },
    {
      tag: "directions",
      type: "visitor support",
      description: "Directions, location guidance, and visitor wayfinding.",
      relatedApps: ["information-center"]
    },
    {
      tag: "visitor services",
      type: "hub category",
      description: "Visitor-facing support information and service guidance.",
      relatedApps: ["information-center"]
    },
    {
      tag: "accessibility",
      type: "visitor support",
      description: "Accessibility information for visitor assistance.",
      relatedApps: ["information-center"]
    },
    {
      tag: "first aid",
      type: "procedure",
      description: "First aid and safety-related reference information.",
      relatedApps: ["information-center"]
    },
    {
      tag: "guest support",
      type: "visitor support",
      description: "General guest support and visitor assistance.",
      relatedApps: ["information-center"]
    }
  ]
};