// ROOT HUB TAG FILE: MBA-hub/hub-tags.js
// Hub 2.2 Registry Safety Update
// Purpose: Master Hub tag registry.
// Do not confuse this file with individual app data.js files.

window.MBA_HUB_TAGS = {
  version: "2.2",
  lastUpdated: "2026-06-27",

  tags: [
    {
      tag: "information center",
      type: "app topic",
      description: "Information Center reference and volunteer support material.",
      relatedApps: ["information-center"],
      relatedCategories: ["volunteer-tools"],
      notes: "Primary tag for the Information Center Handbook app."
    },
    {
      tag: "volunteer tools",
      type: "hub category",
      description: "Tools intended to support Monterey Bay Aquarium volunteers.",
      relatedApps: ["information-center"],
      relatedCategories: ["volunteer-tools"],
      notes: "General category tag for volunteer support apps."
    },
    {
      tag: "handbook",
      type: "content type",
      description: "Structured reference handbook content.",
      relatedApps: ["information-center"],
      relatedCategories: ["volunteer-tools"],
      notes: "Used for apps that function as handbook-style references."
    },
    {
      tag: "quick reference",
      type: "content type",
      description: "Fast lookup material for use while guiding or assisting visitors.",
      relatedApps: ["information-center"],
      relatedCategories: ["volunteer-tools"],
      notes: "Useful for information that needs to be found quickly."
    },
    {
      tag: "emergency",
      type: "procedure",
      description: "Emergency-related volunteer reference information.",
      relatedApps: ["information-center"],
      relatedCategories: ["volunteer-tools", "visitor-services"],
      notes: "High-priority tag for urgent procedures or emergency guidance."
    },
    {
      tag: "radio",
      type: "procedure",
      description: "Radio communication and contact workflow references.",
      relatedApps: ["information-center"],
      relatedCategories: ["volunteer-tools"],
      notes: "Used for apps or sections involving radio calls or staff communication."
    },
    {
      tag: "lost child",
      type: "procedure",
      description: "Lost child or separated party reference material.",
      relatedApps: ["information-center"],
      relatedCategories: ["volunteer-tools", "visitor-services"],
      notes: "Used for separated child or party procedures."
    },
    {
      tag: "wheelchair",
      type: "visitor support",
      description: "Wheelchair and accessibility-related visitor support.",
      relatedApps: ["information-center"],
      relatedCategories: ["visitor-services", "volunteer-tools"],
      notes: "Used for accessibility and visitor mobility support."
    },
    {
      tag: "directions",
      type: "visitor support",
      description: "Directions, location guidance, and visitor wayfinding.",
      relatedApps: ["information-center"],
      relatedCategories: ["visitor-services"],
      notes: "Used for wayfinding and location guidance."
    },
    {
      tag: "visitor services",
      type: "hub category",
      description: "Visitor-facing support information and service guidance.",
      relatedApps: ["information-center"],
      relatedCategories: ["visitor-services"],
      notes: "Used for guest-facing service and support material."
    },
    {
      tag: "accessibility",
      type: "visitor support",
      description: "Accessibility information for visitor assistance.",
      relatedApps: ["information-center"],
      relatedCategories: ["visitor-services", "volunteer-tools"],
      notes: "Used for accessibility services, mobility support, and inclusive visitor guidance."
    },
    {
      tag: "first aid",
      type: "procedure",
      description: "First aid and safety-related reference information.",
      relatedApps: ["information-center"],
      relatedCategories: ["volunteer-tools", "visitor-services"],
      notes: "Used for first aid, safety, or health-related visitor support."
    },
    {
      tag: "guest support",
      type: "visitor support",
      description: "General guest support and visitor assistance.",
      relatedApps: ["information-center"],
      relatedCategories: ["visitor-services", "volunteer-tools"],
      notes: "Broad tag for helping visitors with practical needs."
    }
  ]
};