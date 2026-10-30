# northstarpartners.eu – reprezentacinis puslapis

Statinis vieno puslapio front-end (HTML + CSS + JS, be build žingsnio). LT / EN kalbos perjungimas.

Peržiūra lokaliai:

```bash
cd site && python3 -m http.server 8080   # http://localhost:8080
```

Prieš publikuojant patikrinti / pakeisti:

- kontaktinius el. paštus (`info@`, `careers@northstarpartners.eu`) – `index.html`, `script.js` (`CONTACT_EMAIL`);
- tekstus apie grupę, sritis ir paslaugas (parašyti pagal `docs/PLAN.md`, ne pagal patvirtintą rinkodaros turinį);
- įmonės rekvizitus (pavadinimas, kodas, adresas) poraštėje, jei jų reikia;
- privatumo politikos nuorodą prie kontaktų formos.

Kontaktų forma kol kas neturi backend'o – ji atidaro lankytojo el. pašto programą su paruošta žinute.
