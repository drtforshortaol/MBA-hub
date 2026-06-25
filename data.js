const appData = {
  sections: [
    {
      id: "quick-reference-emergency-info",
      label: "Quick Reference & Emergency Info",
      icon: "🚨",
      summary: "Important phone numbers, emergency contacts, and visitor support resources.",
      emergency: true,
      quickReference: true,
      color: "#c0392b",
      cards: [
        {
          label: "IC Extension",
          value: "4986",
          sub: "Information Center phone, internal."
        },
        {
          label: "Center Desk",
          value: "4840",
          sub: "Lost children, high-value lost items, emergencies."
        },
        {
          label: "Membership Desk",
          value: "4910",
          sub: "Guest complaints, remedies, lockers, service animals."
        },
        {
          label: "Aquarium Main",
          value: "(831) 648-4800",
          sub: "Main public line."
        },
        {
          label: "Volunteer Hotline",
          value: "(831) 648-4867",
          sub: "Last-minute illness or cannot make shift."
        },
        {
          label: "Radio Channel",
          value: "Channel 7",
          sub: "Guest Experience. Do not change."
        },
        {
          label: "Interpretive Programs",
          value: "geinterpretiveprograms@mbayaq.org",
          sub: "7 days/week coverage."
        },
        {
          label: "Aquarium Website",
          value: "montereybayaquarium.org",
          sub: "Hours, exhibits, accessibility information."
        },
        {
          label: "Pacific Grove Visitor Center",
          value: "(831) 324-4668",
          sub: "584 Central Ave. Daily 10am–5pm."
        },
        {
          label: "Monterey Visitor Center",
          value: "(888) 221-1010",
          sub: "Daily 9am–5pm."
        }
      ],
      items: []
    },

    {
      id: "communication-security",
      label: "Communication & Security",
      icon: "📞",
      summary: "How to contact Center/Security and what information not to share.",
      color: "#1a6b8a",
      items: [
        {
          question: "What does “Center” mean?",
          answer: "“Center” means Security. Always use the phone to reach them. Radio channel 7 is backup only.",
          tags: ["center", "security", "phone", "radio"]
        },
        {
          question: "When do I call Center?",
          answer: "Call Center for lost children, medical emergencies, fights or disruptions, any serious issue, and valuable lost items.",
          tags: ["center", "emergency", "lost children", "security"]
        },
        {
          question: "What should I not do with staff information?",
          answer: "Never give out staff schedules or confirm where specific staff members are located.",
          tags: ["staff", "privacy", "security"]
        }
      ]
    },

    {
      id: "lost-found",
      label: "Lost & Found",
      icon: "🔍",
      summary: "What to do with valuable items, less valuable items, and lost children.",
      color: "#7c4d8a",
      items: [
        {
          question: "What do I do with valuable items?",
          answer: "Valuable or expensive items go directly to Center/Security. Do not hold them at the podium.",
          tags: ["lost and found", "valuable items", "center"]
        },
        {
          question: "What about less valuable items?",
          answer: "Less valuable items may be handled locally or passed to Membership.",
          tags: ["lost and found", "membership"]
        },
        {
          question: "What is the process for lost children?",
          answer: "Call Center immediately. Wristbands are available for families, and the phone number goes on the inside. Center/Security handles contacting parents.",
          tags: ["lost child", "wristbands", "center", "security"]
        }
      ]
    },

    {
      id: "guest-support",
      label: "Guest Support",
      icon: "🤝",
      summary: "Where to send upset guests and how to get backup.",
      color: "#2e7d52",
      items: [
        {
          question: "Where do I send angry or upset guests?",
          answer: "Send disappointed or angry guests to Membership. They can help with complaints and may offer remedies, but nothing is guaranteed.",
          tags: ["angry guests", "complaints", "membership"]
        },
        {
          question: "Who are good resources when I need backup?",
          answer: "Staff with radios or earpieces, naturalists, jelly-tube staff, and Membership are good resources. Do not hesitate to ask shift captains or other volunteers too.",
          tags: ["backup", "staff", "naturalists", "membership"]
        },
        {
          question: "What is the etiquette for helping guests?",
          answer: "Smile and greet guests. Point with an open hand, not one finger. Avoid overexplaining. Give helpful highlights. Ask for help when you need it.",
          tags: ["guest support", "etiquette", "open hand", "help"]
        }
      ]
    },

    {
      id: "medical-food-animals",
      label: "Medical, Food & Animals",
      icon: "🩺",
      summary: "Medical emergencies, outside food, pets, and service animals.",
      color: "#b5451b",
      items: [
        {
          question: "What should I do for medical emergencies?",
          answer: "Call Center immediately. Do not administer anything yourself. You can hand a guest a Band-Aid or cold pack, but let them apply or administer it themselves.",
          tags: ["medical", "emergency", "band-aid", "cold pack"]
        },
        {
          question: "Can guests bring outside food?",
          answer: "Outside food is generally discouraged. Small snacks are usually ignored. Large picnics may require involving Center or Membership.",
          tags: ["food", "outside food", "picnic", "membership"]
        },
        {
          question: "What about pets and service animals?",
          answer: "Refer pet and emotional support animal questions to Membership. Service animal issues are handled carefully. Always escalate to Membership.",
          tags: ["pets", "service animals", "emotional support animals", "membership"]
        }
      ]
    },

    {
      id: "directions-exhibits",
      label: "Directions & Exhibits",
      icon: "🗺️",
      summary: "Basic directions and exhibit guidance for common guest questions.",
      color: "#1a5c8a",
      items: [
        {
          question: "Where are the restrooms?",
          answer: "Near the store, same wall.",
          tags: ["restrooms", "bathroom", "store"]
        },
        {
          question: "How do I direct guests to the sea otter exhibit?",
          answer: "Say: “This is the sea otter exhibit — go around it.”",
          tags: ["sea otters", "directions", "exhibit"]
        },
        {
          question: "What is the must-see exhibit guests often miss?",
          answer: "Into the Deep. Go up and over, then downstairs in the other building. Also highlight jellies, the million-gallon tank, and the giant Japanese spider crab.",
          tags: ["Into the Deep", "jellies", "million-gallon tank", "spider crab"]
        }
      ]
    },

    {
      id: "podium-supplies",
      label: "Podium Supplies",
      icon: "🗂️",
      summary: "What is stored at the podium and where extra supplies go.",
      color: "#5a6e2a",
      items: [
        {
          question: "What is kept at the podium?",
          answer: "Maps, program guides, language guides, Seafood Watch cards, birthday/celebration buttons, Sharpies, wristbands, Band-Aids, tissues, hand sanitizer, masks, stamps, flashlight, magnifier, and otter materials.",
          tags: ["podium", "supplies", "maps", "buttons", "wristbands"]
        },
        {
          question: "Where are extra supplies stored?",
          answer: "Extra supplies and some wheelchairs are in the back or “Harry Potter closet” area, the storage room behind the podium area.",
          tags: ["extra supplies", "storage", "Harry Potter closet", "wheelchairs"]
        },
        {
          question: "What happens at end of day?",
          answer: "iPads, radio, and stamps all go to Membership for charging and storage. Do not leave them at the podium overnight.",
          tags: ["end of day", "ipad", "radio", "stamps", "membership"]
        },
        {
          question: "What is in the podium drawer?",
          answer: "The drawer contains pencils, envelopes, maps, Aquarium guides, Shell-a-Brate birthday/celebration buttons sorted by color/type, a magnifier, tissues, Band-Aids, Tampax, hand sanitizer, and an Info Center badge/sign.",
          tags: ["podium drawer", "buttons", "magnifier", "band-aids", "badge"]
        }
      ]
    },

    {
      id: "language-guides",
      label: "Language Guides",
      icon: "🌐",
      summary: "Available language guides and sensory map storage.",
      color: "#8a5a1a",
      items: [
        {
          question: "What language guides are available?",
          answer: "Eight languages are stocked in the guide sorter:\n• English\n• Chinese\n• French\n• German\n• Italian\n• Japanese\n• Spanish\n• Portuguese",
          tags: ["language guides", "translations", "Spanish", "Portuguese", "Japanese"]
        },
        {
          question: "Where are the language guides kept?",
          answer: "They are kept in the wooden multi-slot sorter. Each language has its own labeled shelf slot. The sorter with Spanish and Portuguese is in the back area. English, Chinese, French, German, Italian, and Japanese are in the front podium sorter.",
          tags: ["language guides", "sorter", "podium", "back area"]
        },
        {
          question: "What about sensory guides?",
          answer: "Sensory maps are stored in the back storage room in a labeled cardboard box marked “Sensory Maps.”",
          tags: ["sensory maps", "accessibility", "storage"]
        }
      ]
    },

    {
      id: "wheelchairs-lockers",
      label: "Wheelchairs & Lockers",
      icon: "♿",
      summary: "Wheelchair storage, loaner wheelchair details, and lockers.",
      color: "#4a4a8a",
      items: [
        {
          question: "Where are wheelchairs?",
          answer: "Wheelchairs may be available near storage, in the back or “Harry Potter closet” area. If you are alone or busy, send guests to Membership as backup.",
          tags: ["wheelchairs", "storage", "membership", "accessibility"]
        },
        {
          question: "What do the loaner wheelchairs look like?",
          answer: "They have a black vinyl seat and back, with a distinctive blue disc on the rear wheel. Nova brand. They are stored in the back storage area near the shelving units.",
          tags: ["loaner wheelchairs", "Nova", "blue disc", "accessibility"]
        },
        {
          question: "What about lockers?",
          answer: "Lockers are handled entirely by Membership. Guest lockers cost approximately $10.",
          tags: ["lockers", "membership", "guest lockers"]
        }
      ]
    },

    {
      id: "interpretive-programs",
      label: "Interpretive Programs",
      icon: "🎓",
      summary: "Specialty program materials, binder, and logging issues.",
      color: "#1a7a6a",
      items: [
        {
          question: "Where are specialty program materials stored?",
          answer: "They are in the labeled cabinet in the back storage area. Shelves are labeled “Interpretive Programs - Specialty Programs.” The area contains a black hard case, small plastic drawer units, and a binder with program reference materials.",
          tags: ["interpretive programs", "specialty programs", "binder", "storage"]
        },
        {
          question: "What is in the Interpretive Programs binder?",
          answer: "The binder includes Information Center FAQs and a log sheet for recording issues/questions with date, name, question/comment, and follow-up columns.",
          tags: ["binder", "FAQs", "log sheet", "follow-up"]
        },
        {
          question: "What should I log in the binder?",
          answer: "Log any supply issues, facility problems, or notable guest questions. Examples from past entries include flashlight battery dead, birthday pins running low, and podium door needing a screw. Always note follow-up when resolved.",
          tags: ["log", "supply issues", "facility problems", "guest questions"]
        }
      ]
    }
  ]
};