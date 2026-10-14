# kupadel.dk

KU Padels hjemmeside. Én statisk side, hostet gratis på GitHub Pages.

- Tekst: dansk i `index.html`, engelsk i `en/index.html`. Husk at rette begge. Det kan gøres direkte på GitHub med blyant-ikonet, og ændringer er live efter et minut eller to.
- Udseende: `style.css`.
- Billeder: `assets/`.

## DNS (hos Simply, konto S458942)

| Type  | Navn | Værdi                 |
|-------|------|-----------------------|
| A     | @    | 185.199.108.153       |
| A     | @    | 185.199.109.153       |
| A     | @    | 185.199.110.153       |
| A     | @    | 185.199.111.153       |
| CNAME | www  | keysersauce.github.io |

Domænet (kupadel.dk) er registreret hos Punktum dk og udløber 21.02.2027.

## Tilmeldingsmailen (Google Apps Script)

Når nogen skriver sin KU-mail på siden, sender et Google Apps Script på padelcss@gmail.com velkomstmailen med links til MATCHi og Padel Yard. Koden ligger i `apps-script/Code.gs`, og mailens tekst og links rettes dér.

Opsætning (én gang, logget ind som padelcss@gmail.com):

1. Gå til script.google.com → **Nyt projekt**, og indsæt indholdet af `apps-script/Code.gs`.
2. **Implementer → Ny implementering** → type **Webapp**. Udfør som: **Mig**. Hvem har adgang: **Alle**.
3. Godkend adgangen, og kopiér webapp-URL'en (slutter på `/exec`).
4. Indsæt URL'en i `ENDPOINT` øverst i `join.js`.

Retter du i scriptet senere: **Implementer → Administrer implementeringer → Rediger → Ny version**, så URL'en forbliver den samme. Gmail tillader ca. 100 mails i døgnet.
