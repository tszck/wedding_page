# Wedding Invitation Page

A beautiful, mobile-first wedding invitation website that guests can visit to view wedding details and RSVP online.

---

## ✨ Features

- **Hero section** — couple names, welcome message
- **Wedding details** — date, time, venue, dress code with a live countdown timer
- **Event schedule** — customisable timeline of the day
- **Additional information** — accommodation, travel directions, FAQ accordion
- **RSVP form** — accept/decline, guest count, dietary requirements, personal message
- **Confirmation message** — personalised response after submission
- **Share section** — auto-generated QR code + copy-link button + native device share
- **Mobile-first** — designed for guests opening from WhatsApp, email, etc.
- **Easy to customise** — all content lives in one file (`js/config.js`)

---

## 📁 Project Structure

```
wedding_page/
├── index.html          ← Page layout (rarely needs editing)
├── css/
│   └── style.css       ← All styles (colours, fonts, spacing at the top)
├── js/
│   ├── config.js       ← ⭐ ALL EDITABLE CONTENT IS HERE
│   └── main.js         ← Logic (countdown, RSVP, QR code, share)
└── assets/             ← Place any images here
```

---

## 🛠️ How to Customise

### Step 1 — Edit `js/config.js`

Open `js/config.js` and update the values:

| Field | Description |
|-------|-------------|
| `partner1` / `partner2` | Names of the couple |
| `weddingDateDisplay` | Human-readable date shown on the page |
| `weddingDateISO` | Machine-readable date for the countdown timer |
| `venueName` / `venueAddress` | Venue details |
| `venueMapUrl` | Google Maps link to the venue |
| `schedule` | Array of time + event entries |
| `faq` | Array of question + answer entries |
| `rsvpDeadline` | RSVP deadline shown to guests |
| `maxGuests` | Maximum number of guests per RSVP |
| `shareUrl` | Leave blank to auto-detect the page URL |

### Step 2 — Change colours & fonts (optional)

Open `css/style.css` and edit the **CSS Custom Properties** at the very top of the file (Section 1). You can change the colour palette and fonts without touching any other code.

### Step 3 — Connect RSVP to a backend (optional)

By default, RSVP data is logged to the browser console. To actually receive RSVPs:

1. Sign up for a free form service such as [Formspree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/products/forms/).
2. In `js/main.js`, find the comment `// In a real deployment, send rsvpData to a backend / form service here.`
3. Replace the `console.log` with a `fetch()` POST to your form endpoint.

---

## 🚀 How to Deploy

### Option A — Static hosting (recommended, free)

1. Create a free account on [Netlify](https://netlify.com) or [GitHub Pages](https://pages.github.com).
2. Upload the entire `wedding_page/` folder.
3. Share the URL or QR code with guests.

### Option B — Local preview

Simply open `index.html` in any modern web browser. No build step or server needed.

---

## 📱 Sharing the Invitation

- Copy the live URL and paste it into WhatsApp, email, or any messaging app.
- The **Share section** at the bottom of the page shows a QR code guests can scan.
- On mobile, the **Share via…** button uses the device's native share sheet.

---

## 🌐 Browser Support

Works in all modern browsers (Chrome, Safari, Firefox, Edge). The QR code and Web Share API gracefully degrade on older browsers.
