/* =========================================================
   script.js for Salveene
   Loaded with <script defer>, so the HTML is ready when this runs.
   ========================================================= */

/* ---------- FEATURE A: mobile menu toggle ---------- */
const menuBtn = document.getElementById("menu-btn");
const mainNav = document.getElementById("main-nav");

menuBtn.addEventListener("click", function () {
  const isOpen = mainNav.classList.toggle("open");       // CSS decides what "open" looks like
  menuBtn.setAttribute("aria-expanded", String(isOpen)); // tells screen readers the state
});

// Bonus: close the menu after a link is tapped
mainNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});


/* ---------- FEATURE B: dark mode ---------- */
const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark");
  themeBtn.textContent = isDark ? "Light mode" : "Dark mode";
});


/* ---------- TASK 3: contact form validation ---------- */
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const counter = document.getElementById("counter");
const statusMsg = document.getElementById("form-status");
const MAX_MESSAGE = 200;

// Shows (or clears) the error next to ONE field. textContent only, never innerHTML.
// Returns true when the field is fine.
function setError(input, errorId, text) {
  const el = document.getElementById(errorId);
  el.textContent = text;
  el.classList.toggle("error", text !== "");
  input.classList.toggle("invalid", text !== "");
  input.setAttribute("aria-invalid", String(text !== ""));
  return text === "";
}

// Live character counter (input event fires on every keystroke and paste)
messageInput.addEventListener("input", function () {
  const length = messageInput.value.length;
  counter.textContent = length + " / " + MAX_MESSAGE;
  counter.classList.toggle("limit", length >= MAX_MESSAGE);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();                       // stop the page reloading

  const name = nameInput.value.trim();      // trim: "   " counts as empty
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Name: 3+ characters after trim
  const nameOk = setError(nameInput, "name-error",
    name.length >= 3 ? "" : "Please enter your full name.");

  // Email: must contain "@" and "."; extra checks catch "a@@b.com", "@x.com", "a b@x.com", "a@x."
  const at = email.indexOf("@");
  const emailValid =
    email.includes("@") &&
    email.includes(".") &&
    !email.includes(" ") &&
    email.split("@").length === 2 &&        // exactly one @
    at > 0 &&                               // something before the @
    email.lastIndexOf(".") > at + 1 &&      // a dot after the @, not right next to it
    !email.endsWith(".");
  const emailOk = setError(emailInput, "email-error",
    emailValid ? "" : "Please enter a valid email.");

  // Message: 10+ characters after trim
  const messageOk = setError(messageInput, "message-error",
    message.length >= 10 ? "" : "Tell us a little more (10+ characters).");

  if (nameOk && emailOk && messageOk) {
    // Visitor's name goes in through textContent, so <b>hi</b> shows as plain text
    statusMsg.textContent = "Thank you, " + name + "! Your message is ready to send.";
    statusMsg.className = "msg success";
    form.reset();
    counter.textContent = "0 / " + MAX_MESSAGE;
  } else {
    statusMsg.textContent = "";
    statusMsg.className = "msg";
  }
});