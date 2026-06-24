const appData = {
  id: "volunteer-dropdown-tool",
  title: "Information Center",
  subtitle: "Volunteer Quick Reference",
  category: "Volunteer Tools",
  description: "A dropdown-based quick reference tool for volunteers.",
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

  emergency: {
    title: "Emergency Quick Reference",
    items: [
      {
        label: "Medical or safety emergency",
        text: "Contact staff immediately and follow official site emergency procedures. Add approved emergency instructions before publication."
      },
      {
        label: "Lost child or separated party",
        text: "Stay calm, notify staff immediately, and follow approved lost-child procedures. Do not leave the child or guest alone."
      },
      {
        label: "Animal or exhibit concern",
        text: "Notify staff immediately. Do not attempt to handle animal, exhibit, or life-support concerns yourself."
      }
    ]
  },

  sections: [
    {
      label: "Communication & Security",
      items: [
        {
          question: "What should I do if I do not know an answer?",
          answer: "Let the guest know you will help find the answer. Contact staff, another trained volunteer, or direct the guest to the appropriate information point."
        },
        {
          question: "How should I report a safety concern?",
          answer: "Notify staff immediately and follow approved safety-reporting procedures. Add official radio, phone, or location instructions before publication."
        },
        {
          question: "What if a guest is upset?",
          answer: "Stay calm, listen respectfully, and avoid arguing. If the situation escalates or requires authority, contact staff for assistance."
        }
      ]
    },
    {
      label: "Lost & Found",
      items: [
        {
          question: "Where should guests go for lost and found?",
          answer: "Direct guests to the current lost-and-found location or main information desk. Add the confirmed location before publication."
        },
        {
          question: "What should I do if a guest gives me a found item?",
          answer: "Do not keep the item with you. Follow approved lost-and-found procedures and give the item to the correct staff location."
        },
        {
          question: "What if someone reports a lost child?",
          answer: "Notify staff immediately and follow the approved lost-child procedure. This should be treated as urgent."
        }
      ]
    },
    {
      label: "Guest Support",
      items: [
        {
          question: "Where are the restrooms?",
          answer: "Direct guests to the nearest restroom based on their current location. Add location-specific restroom details before publication."
        },
        {
          question: "Where can guests get accessibility assistance?",
          answer: "Direct guests to approved accessibility resources, guest services, or staff support. Add current accessibility details before publication."
        },
        {
          question: "Where can guests get tickets or membership help?",
          answer: "Direct guests to admissions, membership, or the appropriate guest services location."
        }
      ]
    },
    {
      label: "Daily Volunteer Operations",
      items: [
        {
          question: "Where do I check in?",
          answer: "Add the current volunteer check-in location, badge process, and any shift-start instructions."
        },
        {
          question: "Where can I find the daily schedule?",
          answer: "Add the approved daily schedule source, such as a volunteer station, staff board, or shared schedule."
        },
        {
          question: "Who should I contact during my shift?",
          answer: "Add role-specific staff contact details, radio instructions, or escalation steps."
        }
      ]
    },
    {
      label: "Wayfinding",
      items: [
        {
          question: "How should I help guests find an exhibit?",
          answer: "Use clear, simple directions and nearby landmarks. When possible, point out the route on a map."
        },
        {
          question: "What should I do if a guest needs an elevator?",
          answer: "Direct the guest to the nearest accessible route or elevator. Add current elevator locations before publication."
        },
        {
          question: "How should I handle café, gift shop, or exit questions?",
          answer: "Provide the simplest route from the guest's current location. Add site-specific wayfinding details before publication."
        }
      ]
    }
  ]
};