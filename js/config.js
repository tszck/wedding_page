/**
 * ============================================================
 *  WEDDING PAGE — CONFIGURATION FILE
 *  Edit everything in this file to customise your wedding page.
 *  You do NOT need to touch any other file unless you want to
 *  change layout or design.
 * ============================================================
 */

const WEDDING_CONFIG = {

  // ----------------------------------------------------------
  // COUPLE DETAILS
  // ----------------------------------------------------------
  partner1: "Catherine Pang",
  partner2: "Chris Kwok",

  // Short tagline shown in the hero section
  heroTagline: "Together with their lovely cat Mårran, joyfully invite you to celebrate their marriage.",

  // ----------------------------------------------------------
  // WEDDING DATE & TIME
  // ----------------------------------------------------------
  // Use a format your guests will recognise, e.g. "Saturday, 14 June 2025"
  weddingDateDisplay: "Saturday, 9 May 2026",

  // Used by the countdown timer — must be a valid JavaScript Date string
  // Format: "YYYY-MM-DDTHH:MM:SS"  (24-hour clock, local time)
  weddingDateISO: "2026-05-09T15:00:00",

  ceremonyTime: "3:00 PM",
  // receptionTime: "2:45 PM",

  // ----------------------------------------------------------
  // VENUE
  // ----------------------------------------------------------
  venueName: "Stadshuset, Uppsala",
  venueAddress: "Stadshuset, Stadshusgatan 2, Uppsala",
  // Google Maps link — replace with your own venue URL
  venueMapUrl: "https://maps.app.goo.gl/LGaQ7aBn4aeLNu9s7",

  // ----------------------------------------------------------
  // DRESS CODE
  // ----------------------------------------------------------
  dressCode: "Smart Casual",
  // dressCodeNote: "Please avoid white and ivory to respect the bride.",

  // ----------------------------------------------------------
  // EVENT SCHEDULE
  // ----------------------------------------------------------
  // Add, remove, or reorder items freely.
  schedule: [
    { time: "2:45 PM",  event: "Guest Arrival" },
    { time: "3:00 PM",  event: "Ceremony" },
    { time: "3:30 PM",  event: "Mingle and Photos" },
    { time: "4:00 PM",  event: "Proceed to Restaurant" },
    { time: "4:30 PM",  event: "Cocktail and Snacks" },
    { time: "5:30 PM",  event: "Dinner" },
    { time: "8:00 PM",  event: "Carriages (End of Evening)" },
  ],

  // ----------------------------------------------------------
  // ADDITIONAL INFORMATION
  // ----------------------------------------------------------
  // accommodation: {
  //   title: "Accommodation",
  //   text: "We have reserved a block of rooms at The Meadow Inn (5 minutes from the venue). Quote \u201cSophia & James Wedding\u201d when booking to receive a discounted rate.",
  //   link: "https://example.com/meadow-inn",
  //   linkText: "View The Meadow Inn",
  // },

  travel: {
    title: "Getting There",
    text: "The venue is easily accessible by bus and rail.",
    link: "https://maps.app.goo.gl/LGaQ7aBn4aeLNu9s7",
    linkText: "Open in Google Maps",
  },

  // FAQ items — add, remove, or edit freely
  faq: [
    {
      question: "Are children welcome?",
      answer: "We love your little ones! Children are welcome at the ceremony and reception.",
    },
    {
      question: "Can I take photos during the ceremony?",
      answer: "Sure!",
    },
    {
      question: "What if I have dietary requirements?",
      answer: "Please let us know in the RSVP form below. We can accommodate most dietary needs with advance notice.",
    },
    {
      question: "When is the RSVP deadline?",
      answer: "Please RSVP by 26 April 2026 so we can finalise catering numbers.",
    },
  ],

  // ----------------------------------------------------------
  // RSVP SECTION
  // ----------------------------------------------------------
  rsvpDeadline: "26 April 2026",
  // Maximum guests a single person can bring (including themselves)
  maxGuests: 4,
  // Formspree form endpoint — replace with your own form ID from https://formspree.io
  formspreeEndpoint: "https://formspree.io/f/mwvrqawk",

  // ----------------------------------------------------------
  // CONFIRMATION MESSAGE (shown after successful RSVP)
  // ----------------------------------------------------------
  confirmationAccepted: {
    title: "🎉 We can't wait to see you!",
    message: "Thank you for your RSVP. We're so excited to celebrate with you. Details have been noted — see you on the big day!",
  },
  confirmationDeclined: {
    title: "💌 We'll miss you!",
    message: "Thank you for letting us know. We completely understand and are so grateful you took the time to respond. We hope to celebrate with you soon.",
  },

  // ----------------------------------------------------------
  // SHARE SECTION
  // ----------------------------------------------------------
  shareTitle: "Share the Invitation",
  shareText: "Know someone who should be invited? Share this page with them!",
  // Leave blank to auto-detect the current page URL
  shareUrl: "",

  // ----------------------------------------------------------
  // FOOTER
  // ----------------------------------------------------------
  footerText: "Made with ❤️ for Catherine & Chris - with the help of Github Copilot!",

};

// Allow the config to be imported in Node.js / Jest tests
if (typeof module !== "undefined" && module.exports) {
  module.exports = WEDDING_CONFIG;
}
