/* APP CONTENT DATA FILE: apps/mmc-narrations/data.js */

window.MMC_NARRATIONS_DATA = {
  appName: "MMC Narrations",
  version: "v1.0",
  lastUpdated: "2026-06-29",
  status: "Draft",
  intro:
    "Mobile-friendly dropdown narration tool for quick reference, interpretive prompts, and reusable speaking notes.",

  sections: [
    {
      id: "overview",
      title: "How to Use This App",
      category: "Orientation",
      summary: "Quick instructions for using the narration dropdowns.",
      body: [
        "Use the search box to find narration sections by topic, keyword, or tag.",
        "Open a dropdown before or during prep to review key narration points.",
        "Use Expand All for review mode and Collapse All for quick navigation.",
        "Replace this placeholder content with the final MMC narration material from the source TSX file."
      ],
      prompts: [
        "What is the main visitor takeaway?",
        "What is the simplest way to explain this topic?",
        "What question could invite visitor participation?"
      ],
      tags: ["orientation", "how-to", "volunteer-tool"]
    },
    {
      id: "opening-narration",
      title: "Opening Narration",
      category: "Narration",
      summary: "A starter section for welcome or opening remarks.",
      body: [
        "Use this section for the first narration block.",
        "Keep the opening brief, welcoming, and easy to adapt for different audiences.",
        "Add any location-specific or exhibit-specific language here."
      ],
      prompts: [
        "Welcome visitors and orient them to the experience.",
        "Preview one or two things they can look for.",
        "Invite curiosity with a simple question."
      ],
      tags: ["opening", "welcome", "guide-talk"]
    },
    {
      id: "main-story",
      title: "Main Story or Core Message",
      category: "Narration",
      summary: "The main interpretive message or central story.",
      body: [
        "Use this dropdown for the central narration content.",
        "Organize the material into short, readable paragraphs.",
        "Keep the content flexible enough for quick review on iPhone."
      ],
      prompts: [
        "What is the one thing visitors should remember?",
        "What sensory detail makes this story feel alive?",
        "How does this connect to Monterey Bay?"
      ],
      tags: ["story", "interpretation", "core-message"]
    },
    {
      id: "visitor-questions",
      title: "Visitor Questions",
      category: "FAQ",
      summary: "Common questions and short answer prompts.",
      body: [
        "Add visitor questions from the source material here.",
        "Use short, direct answers first, then add more detail if needed.",
        "Cross-link to deeper apps when the Hub supports related-app suggestions."
      ],
      prompts: [
        "What do visitors ask most often?",
        "What answer should stay short?",
        "What question deserves a deeper related app?"
      ],
      tags: ["faq", "visitor-questions", "quick-answer"]
    },
    {
      id: "closing-narration",
      title: "Closing Narration",
      category: "Narration",
      summary: "Closing remarks, reflection, or action-oriented wrap-up.",
      body: [
        "Use this section for closing language.",
        "End with a memorable takeaway, positive action, or invitation to keep exploring.",
        "Keep the close warm and concise."
      ],
      prompts: [
        "What should visitors do next?",
        "What positive action can they take?",
        "What final image or idea should they leave with?"
      ],
      tags: ["closing", "call-to-action", "visitor-engagement"]
    }
  ],

  references: [
    {
      label: "Content source",
      note: "User-provided MMC Narrations.tsx file. Final narration text still needs to be imported into data.js."
    },
    {
      label: "App standards",
      note: "Built to the App Building Core Categories protocol for hub-compatible dropdown PWAs."
    },
    {
      label: "Image note",
      note: "Current header visual is an inline CSS/SVG-style visual block, not an external photo. Replace or supplement with a sourced image in images/ when available."
    }
  ]
};