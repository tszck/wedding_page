/**
 * ============================================================
 *  WEDDING PAGE — MAIN JAVASCRIPT
 *  This file handles:
 *    1. Populating the page with content from config.js
 *    2. Countdown timer
 *    3. RSVP form logic
 *    4. QR code generation
 *    5. Share functionality
 * ============================================================
 *
 *  You should NOT need to edit this file unless you want to
 *  change behaviour / logic. All content lives in config.js.
 * ============================================================
 */

/* ------------------------------------------------------------------ */
/*  WAIT FOR THE DOM TO BE READY                                       */
/* ------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {
  populatePage();
  startCountdown();
  initRsvpForm();
  initQrCode();
  initShare();
  initSmoothScroll();
  initScrollReveal();
});

/* ------------------------------------------------------------------ */
/*  POPULATE PAGE WITH CONFIG DATA                                     */
/* ------------------------------------------------------------------ */
function populatePage() {
  const c = WEDDING_CONFIG;

  // Helper: set text content safely
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }
  function setHtml(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value;
  }
  function setHref(id, value) {
    const el = document.getElementById(id);
    if (el) el.href = value;
  }

  // Hero
  setText("hero-partner1", c.partner1);
  setText("hero-partner2", c.partner2);
  setText("hero-tagline", c.heroTagline);

  // Details
  setText("detail-date", c.weddingDateDisplay);
  setText("detail-ceremony-time", c.ceremonyTime);
  setText("detail-reception-time", c.receptionTime);
  setText("detail-venue-name", c.venueName);
  setText("detail-venue-address", c.venueAddress);
  setHref("detail-venue-map", c.venueMapUrl);
  setText("detail-dress-code", c.dressCode);
  setText("detail-dress-code-note", c.dressCodeNote);

  // Schedule
  const scheduleList = document.getElementById("schedule-list");
  if (scheduleList) {
    scheduleList.innerHTML = c.schedule.map(item => `
      <li class="schedule-item">
        <span class="schedule-time">${item.time}</span>
        <span class="schedule-divider"></span>
        <span class="schedule-event">${item.event}</span>
      </li>
    `).join("");
  }

  // Accommodation
  setText("accommodation-title", c.accommodation.title);
  setText("accommodation-text", c.accommodation.text);
  const accommodationLink = document.getElementById("accommodation-link");
  if (accommodationLink) {
    accommodationLink.href = c.accommodation.link;
    accommodationLink.textContent = c.accommodation.linkText;
  }

  // Travel
  setText("travel-title", c.travel.title);
  setText("travel-text", c.travel.text);
  const travelLink = document.getElementById("travel-link");
  if (travelLink) {
    travelLink.href = c.travel.link;
    travelLink.textContent = c.travel.linkText;
  }

  // FAQ accordion
  const faqContainer = document.getElementById("faq-list");
  if (faqContainer) {
    faqContainer.innerHTML = c.faq.map((item, i) => `
      <div class="accordion-item">
        <button class="accordion-trigger" aria-expanded="false" aria-controls="faq-answer-${i}">
          ${item.question}
          <span class="accordion-icon" aria-hidden="true">+</span>
        </button>
        <div class="accordion-panel" id="faq-answer-${i}" role="region" hidden>
          <p>${item.answer}</p>
        </div>
      </div>
    `).join("");
    // Re-init accordion after injecting FAQ items
    initAccordion();
  }

  // RSVP deadline
  setText("rsvp-deadline", c.rsvpDeadline);

  // Max guests option in select
  const guestSelect = document.getElementById("rsvp-guests");
  if (guestSelect) {
    guestSelect.innerHTML = "";
    for (let i = 1; i <= c.maxGuests; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = i === 1 ? "1 (just me)" : i;
      guestSelect.appendChild(opt);
    }
  }

  // Share section
  setText("share-title", c.shareTitle);
  setText("share-text", c.shareText);

  // Footer
  setText("footer-text", c.footerText);
}

/* ------------------------------------------------------------------ */
/*  COUNTDOWN TIMER                                                    */
/* ------------------------------------------------------------------ */
function startCountdown() {
  const targetDate = new Date(WEDDING_CONFIG.weddingDateISO);
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.innerHTML = "<span class='countdown-over'>Today is the day! 🎉</span>";
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
      <div class="countdown-unit"><span class="countdown-number">${days}</span><span class="countdown-label">Days</span></div>
      <div class="countdown-unit"><span class="countdown-number">${hours}</span><span class="countdown-label">Hours</span></div>
      <div class="countdown-unit"><span class="countdown-number">${minutes}</span><span class="countdown-label">Mins</span></div>
      <div class="countdown-unit"><span class="countdown-number">${seconds}</span><span class="countdown-label">Secs</span></div>
    `;
  }

  update();
  setInterval(update, 1000);
}

/* ------------------------------------------------------------------ */
/*  RSVP FORM                                                          */
/* ------------------------------------------------------------------ */
function initRsvpForm() {
  const form        = document.getElementById("rsvp-form");
  const guestsRow   = document.getElementById("rsvp-guests-row");
  const attendYes   = document.getElementById("rsvp-attend-yes");
  const attendNo    = document.getElementById("rsvp-attend-no");
  const confirmation = document.getElementById("rsvp-confirmation");
  const confirmTitle = document.getElementById("confirmation-title");
  const confirmMsg   = document.getElementById("confirmation-message");

  if (!form) return;

  // Show / hide guest count row based on attendance
  function toggleGuestRow() {
    if (attendYes && attendYes.checked) {
      guestsRow.removeAttribute("hidden");
    } else {
      guestsRow.setAttribute("hidden", "");
    }
  }

  if (attendYes) attendYes.addEventListener("change", toggleGuestRow);
  if (attendNo)  attendNo.addEventListener("change", toggleGuestRow);

  // Form submission (Formspree)
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name      = document.getElementById("rsvp-name").value.trim();
    const email     = document.getElementById("rsvp-email").value.trim();
    const attending = document.querySelector('input[name="rsvp-attend"]:checked');
    const guests    = document.getElementById("rsvp-guests").value;
    const dietary   = document.getElementById("rsvp-dietary").value.trim();
    const message   = document.getElementById("rsvp-message").value.trim();

    // Basic validation
    if (!name) { showFormError("Please enter your name."); return; }
    if (!attending) { showFormError("Please let us know if you'll be attending."); return; }

    const isAttending = attending.value === "yes";

    const rsvpData = {
      name,
      email,
      attending: isAttending ? "yes" : "no",
      guests: isAttending ? parseInt(guests, 10) : 0,
      dietary: dietary || "None",
      message,
      submittedAt: new Date().toISOString(),
    };

    // Optional: disable submit button to prevent double submits
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Clear any previous error
    const existingErr = document.getElementById("rsvp-error");
    if (existingErr) existingErr.setAttribute("hidden", "");

    try {
      const resp = await fetch("https://formspree.io/f/mwvrqawk", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rsvpData),
      });

      if (!resp.ok) {
        // Try to read Formspree's JSON error (if any)
        let errMsg = "Something went wrong sending your RSVP. Please try again.";
        try {
          const data = await resp.json();
          if (data && data.errors && data.errors.length) {
            errMsg = data.errors.map(e => e.message).join(" ");
          }
        } catch (_) {}
        throw new Error(errMsg);
      }

      // Show confirmation (same behavior you already had)
      const config = isAttending
        ? WEDDING_CONFIG.confirmationAccepted
        : WEDDING_CONFIG.confirmationDeclined;

      confirmTitle.textContent = config.title;
      confirmMsg.textContent   = config.message;

      form.setAttribute("hidden", "");
      confirmation.removeAttribute("hidden");
      confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      showFormError(err.message || "Unable to submit RSVP. Please try again.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

/* Show an inline form error message */
function showFormError(msg) {
  let errEl = document.getElementById("rsvp-error");
  if (!errEl) {
    errEl = document.createElement("p");
    errEl.id = "rsvp-error";
    errEl.className = "form-error";
    const form = document.getElementById("rsvp-form");
    form.prepend(errEl);
  }
  errEl.textContent = msg;
  errEl.removeAttribute("hidden");
  errEl.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ------------------------------------------------------------------ */
/*  QR CODE GENERATION                                                 */
/* ------------------------------------------------------------------ */
function initQrCode() {
  const qrContainer = document.getElementById("qr-code");
  if (!qrContainer) return;

  const url = WEDDING_CONFIG.shareUrl || window.location.href;

  // Use the qrcode.js library loaded via CDN in index.html
  if (typeof QRCode !== "undefined") {
    new QRCode(qrContainer, {
      text: url,
      width: 180,
      height: 180,
      colorDark: "#4a3728",
      colorLight: "#faf8f4",
      correctLevel: QRCode.CorrectLevel.M,
    });
  } else {
    // Fallback: display the URL as text
    qrContainer.textContent = url;
  }
}

/* ------------------------------------------------------------------ */
/*  SHARE FUNCTIONALITY                                                */
/* ------------------------------------------------------------------ */
function initShare() {
  const shareBtn = document.getElementById("share-btn");
  const shareLinkInput = document.getElementById("share-link");
  const copyBtn = document.getElementById("copy-link-btn");

  const url = WEDDING_CONFIG.shareUrl || window.location.href;

  if (shareLinkInput) {
    shareLinkInput.value = url;
    shareLinkInput.addEventListener("focus", function () {
      this.select();
    });
  }

  // Native share (mobile)
  if (shareBtn) {
    if (navigator.share) {
      shareBtn.removeAttribute("hidden");
      shareBtn.addEventListener("click", function () {
        navigator.share({
          title: `${WEDDING_CONFIG.partner1} & ${WEDDING_CONFIG.partner2} — Wedding Invitation`,
          text: WEDDING_CONFIG.heroTagline,
          url: url,
        }).catch(() => {}); // user cancelled — silently ignore
      });
    } else {
      shareBtn.setAttribute("hidden", "");
    }
  }

  // Copy-link button
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => showCopyConfirmation());
      } else {
        // Fallback for older browsers
        shareLinkInput.select();
        document.execCommand("copy");
        showCopyConfirmation();
      }
    });
  }
}

function showCopyConfirmation() {
  const btn = document.getElementById("copy-link-btn");
  if (!btn) return;
  const original = btn.textContent;
  btn.textContent = "Copied! ✓";
  btn.classList.add("btn--success");
  setTimeout(function () {
    btn.textContent = original;
    btn.classList.remove("btn--success");
  }, 2000);
}

/* ------------------------------------------------------------------ */
/*  FAQ ACCORDION                                                      */
/* ------------------------------------------------------------------ */
function initAccordion() {
  document.querySelectorAll(".accordion-trigger").forEach(function (trigger) {
    // Avoid double-binding
    trigger.removeEventListener("click", accordionClickHandler);
    trigger.addEventListener("click", accordionClickHandler);
  });
}

function accordionClickHandler() {
  const trigger  = this;
  const panelId  = trigger.getAttribute("aria-controls");
  const panel    = document.getElementById(panelId);
  const icon     = trigger.querySelector(".accordion-icon");
  const isOpen   = trigger.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    trigger.setAttribute("aria-expanded", "false");
    panel.setAttribute("hidden", "");
    if (icon) icon.textContent = "+";
  } else {
    trigger.setAttribute("aria-expanded", "true");
    panel.removeAttribute("hidden");
    if (icon) icon.textContent = "−";
  }
}

/* ------------------------------------------------------------------ */
/*  SMOOTH SCROLL FOR NAVIGATION LINKS                                 */
/* ------------------------------------------------------------------ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/*  SCROLL REVEAL (fade-in on scroll)                                  */
/* ------------------------------------------------------------------ */
function initScrollReveal() {
  // Add .reveal class to all section children that should animate in
  document.querySelectorAll(
    ".detail-card, .schedule-item, .info-card, .accordion-item, .qr-wrapper, .share-link-row"
  ).forEach(function (el) {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });
}
