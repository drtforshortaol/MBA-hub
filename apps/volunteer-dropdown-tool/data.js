const appData = {
  id: "volunteer-dropdown-tool",
  title: "Volunteer Dropdown Tool",
  category: "Volunteer Tools",
  description: "A quick dropdown-based reference tool for volunteers.",
  version: "1.0.0",

  images: [
    {
      src: "images/volunteer-info-desk-01.jpg",
      alt: "Volunteer information desk with printed materials",
      caption: "Needs approved image."
    },
    {
      src: "images/volunteer-map-reference-01.jpg",
      alt: "Volunteer reviewing a visitor map",
      caption: "Needs approved image."
    }
  ],

  sections: [
    {
      label: "Guest Questions",
      items: [
        {
          question: "Where are the restrooms?",
          answer: "Direct guests to the nearest restroom based on their current location. Add site-specific details before publishing."
        },
        {
          question: "Where can guests get tickets or membership help?",
          answer: "Direct guests to the appropriate admissions, membership, or information desk location."
        },
        {
          question: "Where is the lost and found?",
          answer: "Direct guests to the current lost-and-found location or the main information desk."
        }
      ]
    },
    {
      label: "Volunteer Reminders",
      items: [
        {
          question: "What should I do if I do not know an answer?",
          answer: "Let the guest know you will help find the answer. Contact staff or direct the guest to the information desk."
        },
        {
          question: "What should I do in an emergency?",
          answer: "Follow site emergency procedures and notify staff immediately. Add the official emergency protocol before publication."
        },
        {
          question: "How should I handle accessibility questions?",
          answer: "Provide respectful assistance and direct guests to approved accessibility resources or staff support."
        }
      ]
    },
    {
      label: "Daily Operations",
      items: [
        {
          question: "Where do I check in?",
          answer: "Add the current volunteer check-in location and any badge or shift instructions."
        },
        {
          question: "Where can I find the daily schedule?",
          answer: "Add the approved daily schedule source, such as a staff board, shared document, or volunteer station."
        },
        {
          question: "Who should I contact during my shift?",
          answer: "Add role-specific staff contact details or radio/channel instructions."
        }
      ]
    }
  ]
};