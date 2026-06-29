// ROOT HUB REGISTRY FILE: MBA-hub/hub-registry.js
// Hub 2.2 Registry Safety Update

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
  id: "interpretation-principles",
  name: "Six Interpretation Principles",
  folder: "interpretation-principles",
  url: "apps/interpretation-principles/index.html",
  category: "volunteer-tools",
  appType: "PWA interpretation reference app",
  version: "1.0",
  releaseDate: "2026-06-28",
  lastUpdated: "2026-06-28",
  purpose:
    "Provide Monterey Bay Aquarium volunteers with Freeman Tilden's six interpretation principles adapted for effective guest engagement and guide conversations.",
  description:
    "Volunteer guide to the six interpretation principles with dropdown lessons, examples, visitor conversations, child engagement techniques, tags, cross-links, search, and offline support.",
  tags: [
    "interpretation",
    "Freeman Tilden",
    "guide talks",
    "visitor engagement",
    "storytelling",
    "questioning",
    "children",
    "guest interaction",
    "communication",
    "volunteer tools",
    "education",
    "training",
    "kelp forest",
    "visitor questions"
  ],
  relatedApps: [
    "five-senses-pwa",
    "information-center",
    "mba-leadership",
    "applied-water-science-life-support"
  ],
  status: "Active",
  testingStatus:
    "Needs PC Chrome, iPhone Safari, Clear Cache, Volunteer Tools category display, Guide Talks and Concepts cross-links, dropdown testing, search, tag display, troubleshooting, and offline confirmation.",
  notes:
    "App folder path is apps/interpretation-principles/. Return to Hub path remains ../../index.html."
},
    {
      id: "five-senses-pwa",
      name: "Using the Five Senses",
      folder: "five-senses-pwa",
      url: "apps/five-senses-pwa/index.html",
      category: "volunteer-tools",
      appType: "PWA interpretation skills app",
      version: "1.2",
      releaseDate: "2026-06-28",
      lastUpdated: "2026-06-28",
      purpose:
        "Help Monterey Bay Aquarium volunteers use multisensory interpretation to make exhibits accessible, engaging, and memorable.",
      description:
        "MBA interpretation skills guide for using touch, hearing, smell, and taste comparisons with guests.",
      tags: [
        "five senses",
        "interpretation skills",
        "volunteer tools",
        "accessibility",
        "guest engagement",
        "touch",
        "hearing",
        "smell",
        "taste",
        "multisensory interpretation"
      ],
      relatedApps: ["information-center"],
      status: "Active",
      testingStatus:
        "Independent app opens correctly. Needs Hub display confirmation, PC Chrome, iPhone Safari, Clear Cache, troubleshooting, search, and offline testing.",
      notes:
        "Preservation rebuild from original five-senses.html. App folder path is apps/five-senses-pwa/. Return to Hub path remains ../../index.html."
    },

    {
      id: "northern-elephant-seal",
      name: "Northern Elephant Seal",
      folder: "northern-elephant-seal-pwa-v1.2-final-hub (2)",
      url: "apps/northern-elephant-seal-pwa-v1.2-final-hub%20(2)/index.html",
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
        "Temporary registry path corrected to match uploaded folder; needs PC Chrome, iPhone Safari, Clear Cache, Animals category display, direct app link, images, dropdowns, search, troubleshooting, and offline confirmation after upload.",
      notes:
        "Temporary path uses the uploaded folder name apps/northern-elephant-seal-pwa-v1.2-final-hub (2)/. Recommended cleanup later: rename/move files to apps/northern-elephant-seal/ and restore the clean registry URL apps/northern-elephant-seal/index.html. Return to Hub path remains ../../index.html."
    },

    {
      id: "mba-leadership",
      name: "MBA Leadership",
      folder: "mba-leadership",
      url: "apps/mba-leadership/index.html",
      category: "aquarium-updates",
      appType: "PWA dropdown reference app",
      version: "1.0",
      releaseDate: "2026-06-28",
      lastUpdated: "2026-06-28",
      purpose:
        "Provide Monterey Bay Aquarium volunteers with leadership arrivals and photos for floor identification.",
      description:
        "New leadership arrivals with photos, dropdown cards, tags, search, quick links, and offline support.",
      tags: [
        "leadership",
        "new arrivals",
        "staff",
        "volunteer reference",
        "guide program",
        "executive team",
        "aquarium updates"
      ],
      relatedApps: ["information-center"],
      status: "Active",
      testingStatus:
        "Needs PC Chrome, iPhone Safari, Clear Cache, Aquarium Updates category display, direct app link, images, dropdowns, search, quick links, and offline confirmation.",
      notes:
        "App folder path is apps/mba-leadership/. Return to Hub path remains ../../index.html."
    },

    {
      id: "applied-water-science-life-support",
      name: "Applied Water Science",
      folder: "applied-water-science-life-support",
      url: "apps/applied-water-science-life-support/index.html",
      category: "concepts",
      appType: "PWA dropdown reference app",
      version: "1.0",
      releaseDate: "2026-06-28",
      lastUpdated: "2026-06-28",
      purpose:
        "Provide volunteer reference support for aquarium seawater intake, water quality, exhibit flow, biofouling, pigging, and life support systems.",
      description:
        "Guide to the Aquarium's seawater intake, life support systems, exhibit water flow, filtration, biofouling, pigging operations, water chemistry, and volunteer talking points.",
      tags: [
        "water science",
        "applied water science",
        "life support",
        "life support systems",
        "lss",
        "water quality",
        "engineering",
        "infrastructure",
        "filtration",
        "mechanical filtration",
        "biological filtration",
        "protein skimmer",
        "ozone",
        "uv sterilization",
        "water intake",
        "pump house",
        "water flow",
        "flow rate",
        "biofouling",
        "pigging",
        "pipeline pig",
        "barnacles",
        "mussels",
        "hydroids",
        "sea stars",
        "tube worms",
        "algae",
        "biofilm",
        "upwelling",
        "open sea",
        "kelp forest",
        "monterey bay habitats",
        "sea otters",
        "behind the scenes",
        "volunteer guide",
        "visitor questions",
        "animal care"
      ],
      relatedApps: [
        "information-center",
        "kelp-forest",
        "open-sea",
        "monterey-bay-habitats",
        "sea-otters",
        "upwelling",
        "visitor-questions"
      ],
      status: "Active",
      testingStatus:
        "Needs PC Chrome, iPhone Safari, Clear Cache, Concepts category display, direct app link, dropdowns, search, troubleshooting, and offline confirmation after upload.",
      notes:
        "App folder path is apps/applied-water-science-life-support/. Return to Hub path remains ../../index.html."
    }
  ]
};