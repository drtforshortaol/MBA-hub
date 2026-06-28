/* APP CONTENT DATA FILE: apps/five-senses-pwa/data.js */

window.FIVE_SENSES_DATA = {
  app: {
    name: "Five Senses Guide",
    version: "v1.1",
    lastUpdated: "2026-06-28",
    folder: "five-senses-pwa",
    category: "Learning Tools",
    tags: [
      "five senses",
      "science",
      "learning",
      "observation",
      "education",
      "dropdown guide"
    ]
  },

  senses: [
    {
      id: "sight",
      title: "Sight",
      summary: "Sight helps us notice color, shape, movement, distance, light, and detail.",
      howItWorks:
        "The eyes collect light. The brain uses that information to help us recognize people, places, objects, patterns, motion, and changes around us.",
      examples: [
        "Reading words on a page or screen",
        "Seeing traffic lights change color",
        "Noticing facial expressions",
        "Watching a ball move through the air",
        "Comparing shapes, sizes, and patterns"
      ],
      activity:
        "Look around the room and choose three objects. Describe their color, shape, size, and position without touching them.",
      reviewQuestions: [
        "What are two things sight helps you notice?",
        "Why is light important for seeing?",
        "What is one safety situation where sight helps?"
      ],
      tags: ["eyes", "light", "color", "shape", "movement"]
    },
    {
      id: "hearing",
      title: "Hearing",
      summary: "Hearing helps us notice sounds, voices, music, warnings, rhythm, and direction.",
      howItWorks:
        "The ears collect sound vibrations. The brain interprets those signals as voices, music, noises, alerts, and other sound patterns.",
      examples: [
        "Listening to someone speak",
        "Hearing a doorbell or alarm",
        "Recognizing a song",
        "Noticing if a sound is loud or quiet",
        "Knowing when something is coming closer"
      ],
      activity:
        "Close your eyes for ten seconds and listen carefully. Name three different sounds you notice.",
      reviewQuestions: [
        "What are two sounds you hear every day?",
        "Why can warning sounds be important?",
        "How can hearing help with communication?"
      ],
      tags: ["ears", "sound", "voice", "music", "warning"]
    },
    {
      id: "smell",
      title: "Smell",
      summary: "Smell helps us notice odors, food aromas, smoke, flowers, freshness, and danger.",
      howItWorks:
        "The nose detects tiny particles in the air. The brain connects those signals with memories, safety clues, food, places, and experiences.",
      examples: [
        "Smelling fresh bread or cooked food",
        "Noticing smoke or something burning",
        "Recognizing flowers",
        "Knowing if food smells spoiled",
        "Remembering a place because of its scent"
      ],
      activity:
        "With permission, smell two safe items such as fruit, soap, or spices. Describe each smell using words like sweet, sharp, fresh, strong, or mild.",
      reviewQuestions: [
        "How can smell help keep you safe?",
        "What is one smell you like?",
        "Why might smell be connected to memory?"
      ],
      tags: ["nose", "odor", "aroma", "safety", "memory"]
    },
    {
      id: "taste",
      title: "Taste",
      summary: "Taste helps us notice flavors such as sweet, salty, sour, bitter, and savory.",
      howItWorks:
        "The tongue has taste buds that detect flavor signals. Smell also affects how food tastes, so taste and smell often work together.",
      examples: [
        "Tasting sweet fruit",
        "Noticing salty crackers",
        "Recognizing sour lemon",
        "Tasting bitter dark chocolate",
        "Enjoying savory soup"
      ],
      activity:
        "Think of one food for each flavor: sweet, salty, sour, bitter, and savory. Write or say your examples.",
      reviewQuestions: [
        "What are the five common flavor types?",
        "How do smell and taste work together?",
        "Why should you never taste unknown substances?"
      ],
      tags: ["tongue", "flavor", "food", "sweet", "salty", "sour", "bitter", "savory"]
    },
    {
      id: "touch",
      title: "Touch",
      summary: "Touch helps us notice texture, pressure, temperature, pain, and movement.",
      howItWorks:
        "Nerves in the skin send signals to the brain. Touch helps us understand whether something is soft, rough, hot, cold, sharp, smooth, heavy, or gentle.",
      examples: [
        "Feeling if a surface is smooth or rough",
        "Knowing if water is warm or cold",
        "Holding a pencil or tool",
        "Feeling pressure from a hug or handshake",
        "Pulling away from something too hot"
      ],
      activity:
        "Place three safe objects in a bag. Without looking, use touch to describe each one and guess what it is.",
      reviewQuestions: [
        "What are two things touch can tell you?",
        "Why is pain sometimes useful?",
        "How does touch help with everyday tasks?"
      ],
      tags: ["skin", "texture", "temperature", "pressure", "pain"]
    }
  ],

  extras: [
    {
      id: "sense-teamwork",
      title: "How the Senses Work Together",
      body: [
        "The senses often work as a team. When you eat soup, you may see the bowl, smell the aroma, taste the flavor, feel the warmth, and hear the spoon touch the bowl.",
        "Using more than one sense can help you understand something more clearly. This is called making observations."
      ],
      prompts: [
        "Describe breakfast using at least three senses.",
        "Describe a park, beach, or classroom using all five senses.",
        "Which two senses do you use most when crossing a street safely?"
      ],
      tags: ["teamwork", "observation", "multi-sensory"]
    },
    {
      id: "observation-practice",
      title: "Observation Practice",
      body: [
        "Good observations are specific. Instead of saying “I see a thing,” try saying “I see a small round red object on the table.”",
        "Scientists, students, artists, cooks, builders, caregivers, and many other people use careful observations every day."
      ],
      prompts: [
        "Find one object and describe it using sight and touch.",
        "Listen for a sound and describe whether it is loud, quiet, near, far, steady, or changing.",
        "Choose a safe food and describe its smell and taste."
      ],
      tags: ["science skill", "description", "careful noticing"]
    },
    {
      id: "safety-notes",
      title: "Safety Notes",
      body: [
        "Never taste unknown items, chemicals, plants, medicines, or anything that an adult has not said is safe.",
        "Do not smell unknown chemicals closely. Some strong smells can be unsafe.",
        "Use caution with hot, sharp, sticky, or rough objects when exploring touch."
      ],
      prompts: [
        "Name one sense that can warn you about danger.",
        "Why is it important not to taste unknown things?",
        "What should you do if something smells like smoke?"
      ],
      tags: ["safety", "unknown items", "adult supervision"]
    },
    {
      id: "quick-review",
      title: "Quick Review Questions",
      body: [
        "Use these questions at the end of a short lesson or as a fast review."
      ],
      prompts: [
        "Which body part is most connected with sight?",
        "Which sense helps you hear music?",
        "Which sense helps you notice if food smells spoiled?",
        "Which sense helps you notice sweet and salty flavors?",
        "Which sense helps you feel if something is hot or cold?",
        "Can one activity use all five senses? Give an example."
      ],
      tags: ["review", "questions", "lesson check"]
    }
  ],

  references: [
    "Content: Original educational summary created for this Five Senses Guide app update.",
    "Image: Original SVG header visual included as images/header-five-senses.svg.",
    "Design standard: Hub-compatible PWA structure with top bar controls, dropdown sections, references, version display, troubleshooting, README, changelog, manifest, and service worker.",
    "Safety note: Educational content only. Adult supervision is recommended for any smell, taste, or touch activity."
  ]
};