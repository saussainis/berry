# northstarpartners.eu – reprezentacinis puslapis

Statinis vieno puslapio front-end (HTML + CSS + JS, be build žingsnio). LT / EN / DE kalbos perjungimas (numatytoji kalba parenkama pagal naršyklę, kitu atveju EN).
Tematika: AI sprendimai verslui, „company brain“ konfigūravimas, AI agentai, integracijos ir mokymai.

Peržiūra lokaliai:

```bash
cd site && python3 -m http.server 8080   # http://localhost:8080
```

Prieš publikuojant patikrinti / pakeisti:

- kontaktinį el. paštą (`info@northstarpartners.eu`) – `index.html`, `script.js` (`CONTACT_EMAIL`);
- vadovo trumpą aprašymą (LT/EN/DE);
- paslaugų, panaudojimo atvejų ir vertybių tekstus (tai juodraštis, ne patvirtintas rinkodaros turinys);
- įmonės rekvizitus (pavadinimas, kodas, adresas) poraštėje, jei jų reikia;
- privatumo politikos nuorodą prie kontaktų formos.

Kontaktų forma kol kas neturi backend'o – ji atidaro lankytojo el. pašto programą su paruošta žinute.
