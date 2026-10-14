// KU Padel: sender vejledningen til den KU-mail, der skrives ind på kupadel.dk.
// Køres som web-app på padelcss@gmail.com (se README.md).

const KU_MAIL = /^[^\s@]+@([a-z0-9-]+\.)*ku\.dk$/i;

const LINKS = {
  matchi: 'https://www.matchi.se/login/register',
  reffen: 'https://www.matchi.se/forms/oahYllpIK7xUlHsBNxEG',
  jernbanebyen: 'https://www.matchi.se/forms/BJmogu9p979C00i8wB0I',
  instagram: 'https://www.instagram.com/kupadel/',
};

function doPost(e) {
  const p = e.parameter || {};
  if (p.website) return reply('ok'); // honeypot: kun robotter udfylder det skjulte felt

  const email = String(p.email || '').trim().toLowerCase();
  if (!KU_MAIL.test(email)) return reply('invalid');

  // Samme adresse får højst én mail i timen.
  const cache = CacheService.getScriptCache();
  if (cache.get(email)) return reply('ok');
  cache.put(email, '1', 3600);

  MailApp.sendEmail({
    to: email,
    name: 'KU Padel',
    replyTo: 'padelcss@gmail.com',
    subject: 'Welcome to KU Padel',
    htmlBody: htmlMail(email),
    body: textMail(email),
  });
  return reply('ok');
}

function reply(status) {
  return ContentService.createTextOutput(JSON.stringify({ status }))
    .setMimeType(ContentService.MimeType.JSON);
}

function htmlMail(email) {
  const link = (href) => `<a href="${href}" style="color:#901a1e">${href}</a>`;
  return `
<div style="font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.55;color:#1d1b1a;max-width:560px">
  <p>Welcome to KU Padel!</p>
  <p>Happy to have you onboard. To complete the sign up process and enjoy the juicy discounts, please follow this process:</p>
  <p>1) Create a MATCHi account (with your KU-email, <strong>${email}</strong>):<br>${link(LINKS.matchi)}</p>
  <p>2) Join both customer directories:<br>
  - Padel Yard Reffen: ${link(LINKS.reffen)}<br>
  - Padel Yard Jernbanebyen: ${link(LINKS.jernbanebyen)}</p>
  <p>Lastly, you can follow us on Instagram for upcoming tournaments and events:<br>${link(LINKS.instagram)}</p>
  <p>Hope to see you soon!<br>Best,<br>The KU Padel team</p>
  <p style="font-size:13px;color:#777">You received this email because your address was entered on kupadel.dk. If that wasn't you, you can ignore it.</p>
</div>`;
}

function textMail(email) {
  return `Welcome to KU Padel!

Happy to have you onboard. To complete the sign up process and enjoy the juicy discounts, please follow this process:

1) Create a MATCHi account (with your KU-email, ${email}):
${LINKS.matchi}

2) Join both customer directories:
- Padel Yard Reffen: ${LINKS.reffen}
- Padel Yard Jernbanebyen: ${LINKS.jernbanebyen}

Lastly, you can follow us on Instagram for upcoming tournaments and events:
${LINKS.instagram}

Hope to see you soon!
Best,
The KU Padel team

You received this email because your address was entered on kupadel.dk. If that wasn't you, you can ignore it.`;
}
