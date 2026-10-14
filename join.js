// Tilmeldingsformularen: sender KU-mailen til Google Apps Script, som mailer instruktionerne.
// Web-app-URL fra Google Apps Script (se apps-script/Code.gs og README.md).
const ENDPOINT = 'https://script.google.com/macros/s/AKfycbzzUAf-Y01kjWySZdeQ-vQqdf8z46_XB2SmPmkK8RY_h0596YzBe6QAhWeGYYds7H7YgQ/exec';
const KU_MAIL = /^[^\s@]+@([a-z0-9-]+\.)*ku\.dk$/i;

const TEXT = {
  da: {
    invalid: 'Brug din KU-mail, fx abc123@alumni.ku.dk.',
    sending: 'Sender …',
    ok: (email) => `Tjek din indbakke på ${email}. Kan du ikke finde mailen, så kig i spam.`,
    error: 'Noget gik galt. Prøv igen, eller skriv til padelcss@gmail.com.',
  },
  en: {
    invalid: 'Please use your KU email, e.g. abc123@alumni.ku.dk.',
    sending: 'Sending …',
    ok: (email) => `Check your inbox at ${email}. If you can't find the email, look in your spam folder.`,
    error: 'Something went wrong. Please try again, or write to padelcss@gmail.com.',
  },
};
const t = TEXT[document.documentElement.lang] || TEXT.da;

const form = document.getElementById('join');
const msg = document.getElementById('join-msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  if (!KU_MAIL.test(email)) {
    msg.className = 'join-msg error';
    msg.textContent = t.invalid;
    return;
  }
  const button = form.querySelector('button');
  button.disabled = true;
  msg.className = 'join-msg';
  msg.textContent = t.sending;
  try {
    const res = await fetch(ENDPOINT, { method: 'POST', body: new URLSearchParams(new FormData(form)) });
    const data = await res.json();
    if (data.status !== 'ok') throw new Error(data.status);
    form.reset();
    msg.className = 'join-msg ok';
    msg.textContent = t.ok(email);
  } catch {
    msg.className = 'join-msg error';
    msg.textContent = t.error;
  } finally {
    button.disabled = false;
  }
});
