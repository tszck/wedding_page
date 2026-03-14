/**
 * Tests for RSVP form submission to Formspree.
 *
 * Verifies that submitting the RSVP form sends the correct payload to the
 * Formspree endpoint, displays a confirmation message on success, and
 * shows an appropriate error message when the submission fails.
 */

const FORM_HTML = `
  <form id="rsvp-form" novalidate>
    <input type="text"  id="rsvp-name"  name="name" />
    <input type="email" id="rsvp-email" name="email" />
    <div class="radio-group">
      <input type="radio" id="rsvp-attend-yes" name="rsvp-attend" value="yes" />
      <input type="radio" id="rsvp-attend-no"  name="rsvp-attend" value="no"  />
    </div>
    <div id="rsvp-guests-row" hidden>
      <select id="rsvp-guests" name="guests">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
    <textarea id="rsvp-dietary"  name="dietary"></textarea>
    <textarea id="rsvp-message"  name="message"></textarea>
    <button type="submit">Send RSVP</button>
  </form>
  <div id="rsvp-confirmation" hidden>
    <h2 id="confirmation-title"></h2>
    <p  id="confirmation-message"></p>
  </div>
`;

// ── Module-level setup ────────────────────────────────────────────────────────

// Mock browser APIs unavailable in jsdom before loading main.js
global.IntersectionObserver = class {
  observe()    {}
  unobserve()  {}
  disconnect() {}
};
global.QRCode = undefined;

// Load WEDDING_CONFIG and expose it as a global (main.js reads it from window)
global.WEDDING_CONFIG = require("../js/config.js");

// The Formspree endpoint is now configured in WEDDING_CONFIG (avoids duplication)
const FORMSPREE_URL = global.WEDDING_CONFIG.formspreeEndpoint;

// Load main.js and get the exported initRsvpForm function
const { initRsvpForm } = require("../js/main.js");

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Fill the form fields and fire a submit event. */
async function submitForm({ name, email, attending, guests, dietary, message } = {}) {
  if (name      !== undefined) document.getElementById("rsvp-name").value    = name;
  if (email     !== undefined) document.getElementById("rsvp-email").value   = email;
  if (attending !== undefined) {
    const radio = document.getElementById(
      attending === "yes" ? "rsvp-attend-yes" : "rsvp-attend-no"
    );
    radio.checked = true;
    radio.dispatchEvent(new Event("change", { bubbles: true }));
  }
  if (guests    !== undefined) document.getElementById("rsvp-guests").value  = String(guests);
  if (dietary   !== undefined) document.getElementById("rsvp-dietary").value = dietary;
  if (message   !== undefined) document.getElementById("rsvp-message").value = message;

  document
    .getElementById("rsvp-form")
    .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

  // Flush all microtasks / promise callbacks
  await new Promise((resolve) => setTimeout(resolve, 0));
}

// ── Setup / Teardown ──────────────────────────────────────────────────────────

beforeEach(() => {
  // Render a fresh form for every test so event listeners start clean
  document.body.innerHTML = FORM_HTML;

  // Mock fetch
  global.fetch = jest.fn();

  // Suppress scrollIntoView warnings from jsdom
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  // Attach the RSVP submit handler to the freshly rendered form
  initRsvpForm();
});

afterEach(() => {
  jest.resetAllMocks();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("RSVP form → Formspree submission", () => {
  test("sends a POST request to the correct Formspree endpoint", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    await submitForm({
      name:      "Jane Smith",
      email:     "jane@example.com",
      attending: "yes",
      guests:    2,
      dietary:   "Vegetarian",
      message:   "Can't wait!",
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url] = global.fetch.mock.calls[0];
    expect(url).toBe(FORMSPREE_URL);
  });

  test("uses POST method with JSON content-type headers", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    await submitForm({ name: "Jane Smith", attending: "yes" });

    const [, options] = global.fetch.mock.calls[0];
    expect(options.method).toBe("POST");
    expect(options.headers).toMatchObject({
      Accept:         "application/json",
      "Content-Type": "application/json",
    });
  });

  test("sends all expected fields when guest is attending", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    await submitForm({
      name:      "Jane Smith",
      email:     "jane@example.com",
      attending: "yes",
      guests:    2,
      dietary:   "Nut allergy",
      message:   "Looking forward to it!",
    });

    const [, options] = global.fetch.mock.calls[0];
    const body = JSON.parse(options.body);

    expect(body.name).toBe("Jane Smith");
    expect(body.email).toBe("jane@example.com");
    expect(body.attending).toBe("yes");
    expect(body.guests).toBe(2);
    expect(body.dietary).toBe("Nut allergy");
    expect(body.message).toBe("Looking forward to it!");
    expect(body.submittedAt).toBeDefined();
  });

  test("sends guests=0 and attending=no when guest is not attending", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    await submitForm({ name: "Bob Jones", attending: "no" });

    const [, options] = global.fetch.mock.calls[0];
    const body = JSON.parse(options.body);

    expect(body.attending).toBe("no");
    expect(body.guests).toBe(0);
  });

  test("shows confirmation message and hides form after a successful submission", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({}) });

    await submitForm({ name: "Jane Smith", attending: "yes" });

    const confirmation = document.getElementById("rsvp-confirmation");
    const form         = document.getElementById("rsvp-form");

    expect(confirmation.hasAttribute("hidden")).toBe(false);
    expect(form.hasAttribute("hidden")).toBe(true);
    expect(document.getElementById("confirmation-title").textContent).not.toBe("");
    expect(document.getElementById("confirmation-message").textContent).not.toBe("");
  });

  test("does NOT call fetch when the name field is empty", async () => {
    await submitForm({ attending: "yes" }); // no name

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("does NOT call fetch when no attendance option is selected", async () => {
    await submitForm({ name: "Jane Smith" }); // no attending radio

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("displays an error message when Formspree returns a non-2xx status", async () => {
    global.fetch.mockResolvedValueOnce({
      ok:   false,
      json: () => Promise.resolve({}),
    });

    await submitForm({ name: "Jane Smith", attending: "yes" });

    const errorEl = document.getElementById("rsvp-error");
    expect(errorEl).not.toBeNull();
    expect(errorEl.hasAttribute("hidden")).toBe(false);
    expect(errorEl.textContent.length).toBeGreaterThan(0);
  });

  test("displays the Formspree error detail when the response body contains error messages", async () => {
    global.fetch.mockResolvedValueOnce({
      ok:   false,
      json: () =>
        Promise.resolve({
          errors: [{ message: "Email address is invalid." }],
        }),
    });

    await submitForm({ name: "Jane Smith", attending: "yes" });

    const errorEl = document.getElementById("rsvp-error");
    expect(errorEl.textContent).toContain("Email address is invalid.");
  });
});

