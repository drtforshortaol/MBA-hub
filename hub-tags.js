// ROOT HUB TAG FILE: MBA-hub/hub-tags.js
// Hub 2.2 Registry Safety Update
// Purpose: Master Hub tag registry.
// Do not confuse this file with individual app data.js files.

window.MBA_HUB_TAGS = {
version: "2.2",
lastUpdated: "2026-07-15",

tags: [
{
tag: "information center",
type: "app topic",
description:
"Information Center reference and volunteer support material.",
relatedApps: ["information-center"],
relatedCategories: ["volunteer-tools"],
notes: "Primary tag for the Information Center Handbook app."
},
{
tag: "volunteer tools",
type: "hub category",
description:
"Tools intended to support Monterey Bay Aquarium volunteers.",
relatedApps: [
"information-center",
"interpretation-principles",
"five-senses-pwa"
],
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
description:
"Fast lookup material for use while guiding or assisting visitors.",
relatedApps: [
"information-center",
"mmc-narrations",
"open-sea"
],
relatedCategories: [
"volunteer-tools",
"exhibits"
],
notes: "Useful for information that needs to be found quickly."
},
{
tag: "emergency",
type: "procedure",
description:
"Emergency-related volunteer reference information.",
relatedApps: ["information-center"],
relatedCategories: [
"volunteer-tools",
"visitor-services"
],
notes:
"High-priority tag for urgent procedures or emergency guidance."
},
{
tag: "radio",
type: "procedure",
description:
"Radio communication and contact workflow references.",
relatedApps: ["information-center"],
relatedCategories: ["volunteer-tools"],
notes:
"Used for apps or sections involving radio calls or staff communication."
},
{
tag: "lost child",
type: "procedure",
description:
"Lost child or separated party reference material.",
relatedApps: ["information-center"],
relatedCategories: [
"volunteer-tools",
"visitor-services"
],
notes: "Used for separated child or party procedures."
},
{
tag: "wheelchair",
type: "visitor support",
description:
"Wheelchair and accessibility-related visitor support.",
relatedApps: ["information-center"],
relatedCategories: [
"visitor-services",
"volunteer-tools"
],
notes:
"Used for accessibility and visitor mobility support."
},
{
tag: "directions",
type: "visitor support",
description:
"Directions, location guidance, and visitor wayfinding.",
relatedApps: ["information-center"],
relatedCategories: ["visitor-services"],
notes: "Used for wayfinding and location guidance."
},
{
tag: "visitor services",
type: "hub category",
description:
"Visitor-facing support information and service guidance.",
relatedApps: ["information-center"],
relatedCategories: ["visitor-services"],
notes:
"Used for guest-facing service and support material."
},
{
tag: "accessibility",
type: "visitor support",
description:
"Accessibility information for visitor assistance.",
relatedApps: [
"information-center",
"five-senses-pwa"
],
relatedCategories: [
"visitor-services",
"volunteer-tools"
],
notes:
"Used for accessibility services, mobility support, and inclusive visitor guidance."
},
{
tag: "first aid",
type: "procedure",
description:
"First aid and safety-related reference information.",
relatedApps: ["information-center"],
relatedCategories: [
"volunteer-tools",
"visitor-services"
],
notes:
"Used for first aid, safety, or health-related visitor support."
},
{
tag: "mmc",
type: "exhibit",
description:
"MMC exhibit-related narration, interpretation, and visitor-facing talking point material.",
relatedApps: ["mmc-narrations"],
relatedCategories: ["exhibits"],
dateCreated: "2026-06-29",
lastUpdated: "2026-06-29",
notes: "Created for MMC Narrations exhibit app."
},
{
tag: "narrations",
type: "content type",
description:
"Apps or sections containing spoken narration prompts, script notes, or interpretive talk material.",
relatedApps: ["mmc-narrations"],
relatedCategories: [
"exhibits",
"guide-talks"
],
dateCreated: "2026-06-29",
lastUpdated: "2026-06-29",
notes:
"Used for MMC Narrations and future narration-based apps."
},
{
tag: "exhibits",
type: "hub category",
description:
"Exhibit reference apps, habitat information, and exhibit-specific interpretation tools.",
relatedApps: [
"mmc-narrations",
"open-sea"
],
relatedCategories: ["exhibits"],
dateCreated: "2026-06-29",
lastUpdated: "2026-07-15",
notes:
"Used for apps that belong in the Exhibits category."
},
{
tag: "interpretation",
type: "concept",
description:
"Apps that help volunteers explain exhibits, animals, places, or concepts to visitors.",
relatedApps: [
"mmc-narrations",
"interpretation-principles",
"open-sea"
],
relatedCategories: [
"exhibits",
"guide-talks",
"making-the-aquarium-come-alive",
"volunteer-tools"
],
dateCreated: "2026-06-29",
lastUpdated: "2026-07-15",
notes:
"Useful for cross-linking talk tools and visitor engagement apps."
},
{
tag: "guide talks",
type: "hub category",
description:
"Talk outlines, narration tools, stories, themes, and interpretive prompts for guide conversations.",
relatedApps: [
"interpretation-principles",
"mmc-narrations"
],
relatedCategories: [
"guide-talks",
"exhibits",
"volunteer-tools"
],
dateCreated: "2026-06-29",
lastUpdated: "2026-06-29",
notes:
"Added to support guide-talk-related app discovery."
},
{
tag: "visitor engagement",
type: "interpretive skill",
description:
"Tools and content that help volunteers engage visitors through questions, stories, sensory prompts, and conversation.",
relatedApps: [
"interpretation-principles",
"five-senses-pwa",
"mmc-narrations"
],
relatedCategories: [
"exhibits",
"guide-talks",
"making-the-aquarium-come-alive",
"volunteer-tools"
],
dateCreated: "2026-06-29",
lastUpdated: "2026-06-29",
notes:
"Used for apps that help volunteers make visitor interactions more meaningful."
},
{
tag: "monterey bay aquarium",
type: "organization",
description:
"Apps or reference material related to Monterey Bay Aquarium volunteer use.",
relatedApps: [
"information-center",
"interpretation-principles",
"five-senses-pwa",
"mmc-narrations",
"mba-leadership",
"applied-water-science-life-support",
"open-sea"
],
relatedCategories: [
"aquarium-updates",
"exhibits",
"volunteer-tools",
"concepts",
"visitor-services"
],
dateCreated: "2026-06-29",
lastUpdated: "2026-07-15",
notes:
"General organization tag for MBA volunteer hub apps."
},
{
tag: "guest support",
type: "visitor support",
description:
"General guest support and visitor assistance.",
relatedApps: ["information-center"],
relatedCategories: [
"visitor-services",
"volunteer-tools"
],
notes:
"Broad tag for helping visitors with practical needs."
},
{
tag: "open sea",
type: "exhibit",
description:
"Open-ocean and pelagic exhibit interpretation.",
relatedApps: ["open-sea"],
relatedCategories: ["exhibits"],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Primary exhibit tag for the Open Sea app."
},
{
tag: "pelagic zone",
type: "habitat",
description:
"Open-ocean waters away from shore and above the seafloor.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Used for open-ocean habitat content."
},
{
tag: "intangible environment",
type: "concept",
description:
"Environmental conditions such as light, pressure, oxygen, temperature, salinity, nutrients, sound, and currents.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Connects physical-factor topics used in exhibit interpretation."
},
{
tag: "physical environment",
type: "concept",
description:
"Physical conditions that shape marine habitats and animal adaptations.",
relatedApps: [
"open-sea",
"applied-water-science-life-support"
],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Used for exhibit and concept apps focused on environmental conditions."
},
{
tag: "temperature",
type: "physical factor",
description:
"Ocean temperature, thermal layers, thermoclines, and temperature-related adaptations.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports temperature-related Open Sea content."
},
{
tag: "thermocline",
type: "physical factor",
description:
"The ocean layer where temperature changes with depth.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports Open Sea temperature-layer content."
},
{
tag: "light",
type: "physical factor",
description:
"Light penetration, wavelength filtering, color, and the euphotic zone.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports light and color content in the Open Sea app."
},
{
tag: "pressure",
type: "physical factor",
description:
"Water pressure with depth and pressure-related animal adaptations.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports pressure-related Open Sea content."
},
{
tag: "oxygen",
type: "physical factor",
description:
"Dissolved oxygen, oxygen minimum zones, and deep-water ventilation.",
relatedApps: [
"open-sea",
"applied-water-science-life-support"
],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports oxygen-related exhibit and water science content."
},
{
tag: "salinity",
type: "physical factor",
description:
"Ocean salt concentration, density, and salinity-driven circulation.",
relatedApps: [
"open-sea",
"applied-water-science-life-support"
],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports salinity and density content."
},
{
tag: "nutrients",
type: "physical factor",
description:
"Marine nutrients such as nitrate, phosphate, and iron that support phytoplankton production.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports nutrient-related Open Sea content."
},
{
tag: "ocean currents",
type: "concept",
description:
"Ocean-water movement, transport, circulation, and current-related animal strategies.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports Open Sea current and circulation content."
},
{
tag: "thermohaline circulation",
type: "concept",
description:
"Large-scale ocean circulation driven by differences in temperature and salinity.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports Open Sea deep-circulation and oxygen-transport content."
},
{
tag: "adaptations",
type: "biology concept",
description:
"Animal structures, behaviors, and physiological traits that support survival.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"animals",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports animal adaptation content in the Open Sea app."
},
{
tag: "bioluminescence",
type: "biology concept",
description:
"Light produced by living organisms for communication, camouflage, defense, or feeding.",
relatedApps: ["open-sea"],
relatedCategories: [
"exhibits",
"animals",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"Supports deep-water and Open Sea adaptation content."
},
{
tag: "volunteer training",
type: "content purpose",
description:
"Reference material intended to support aquarium volunteer learning and preparation.",
relatedApps: [
"information-center",
"interpretation-principles",
"five-senses-pwa",
"mmc-narrations",
"open-sea",
"applied-water-science-life-support"
],
relatedCategories: [
"volunteer-tools",
"exhibits",
"concepts"
],
dateCreated: "2026-07-15",
lastUpdated: "2026-07-15",
notes:
"General discovery tag for volunteer learning apps."
}
]
};
