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
  partner1: "Sophia",
  partner2: "James",

  // Short tagline shown in the hero section
  heroTagline: "Together with their families, joyfully invite you to celebrate their marriage.",

  // ----------------------------------------------------------
  // WEDDING DATE & TIME
  // ----------------------------------------------------------
  // Use a format your guests will recognise, e.g. "Saturday, 14 June 2025"
  weddingDateDisplay: "Saturday, 14 June 2025",

  // Used by the countdown timer — must be a valid JavaScript Date string
  // Format: "YYYY-MM-DDTHH:MM:SS"  (24-hour clock, local time)
  weddingDateISO: "2025-06-14T16:00:00",

  ceremonyTime: "4:00 PM",
  receptionTime: "6:30 PM",

  // ----------------------------------------------------------
  // VENUE
  // ----------------------------------------------------------
  venueName: "The Grand Orchard Estate",
  venueAddress: "123 Blossom Lane, Meadowshire, MH1 2WD",
  // Google Maps link — replace with your own venue URL
  venueMapUrl: "https://maps.google.com/?q=The+Grand+Orchard+Estate",

  // ----------------------------------------------------------
  // DRESS CODE
  // ----------------------------------------------------------
  dressCode: "Formal / Black Tie Optional",
  dressCodeNote: "Please avoid white and ivory to respect the bride.",

  // ----------------------------------------------------------
  // EVENT SCHEDULE
  // ----------------------------------------------------------
  // Add, remove, or reorder items freely.
  schedule: [
    { time: "3:30 PM",  event: "Guest Arrival & Welcome Drinks" },
    { time: "4:00 PM",  event: "Ceremony" },
    { time: "5:00 PM",  event: "Cocktail Hour & Garden Reception" },
    { time: "6:30 PM",  event: "Dinner" },
    { time: "8:00 PM",  event: "First Dance & Speeches" },
    { time: "9:00 PM",  event: "Dancing & Celebrations" },
    { time: "12:00 AM", event: "Carriages (End of Evening)" },
  ],

  // ----------------------------------------------------------
  // ADDITIONAL INFORMATION
  // ----------------------------------------------------------
  accommodation: {
    title: "Accommodation",
    text: "We have reserved a block of rooms at The Meadow Inn (5 minutes from the venue). Quote \u201cSophia & James Wedding\u201d when booking to receive a discounted rate.",
    link: "https://example.com/meadow-inn",
    linkText: "View The Meadow Inn",
  },

  travel: {
    title: "Getting There",
    text: "The venue is easily accessible by road and rail. Free parking is available on-site. The nearest train station is Meadow Central (10-minute taxi ride).",
    link: "https://maps.google.com/?q=The+Grand+Orchard+Estate",
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
      answer: "We kindly ask for an unplugged ceremony — please keep phones and cameras away during the vows. Our photographer will capture every moment!",
    },
    {
      question: "What if I have dietary requirements?",
      answer: "Please let us know in the RSVP form below. We can accommodate most dietary needs with advance notice.",
    },
    {
      question: "When is the RSVP deadline?",
      answer: "Please RSVP by 14 May 2025 so we can finalise catering numbers.",
    },
  ],

  // ----------------------------------------------------------
  // RSVP SECTION
  // ----------------------------------------------------------
  rsvpDeadline: "14 May 2025",
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
  footerText: "Made with ❤️ for Sophia & James · 14 June 2025",

};

// Allow the config to be imported in Node.js / Jest tests
if (typeof module !== "undefined" && module.exports) {
  module.exports = WEDDING_CONFIG;
}
