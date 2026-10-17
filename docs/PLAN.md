# Planas: NorthStar Partners samdos ir HR valdymo sistema (MVP)

Statusas: **JUODRAŠTIS, laukia atsakymų į atvirus klausimus (§7)**
Data: 2026-10-17
Pagrindas: „Blueprint: building a company IT platform from zero“ (Nexus šablonas, Azure + Microsoft 365).

---

## 1. Tikslas

Debesyje veikianti sistema, kuria NorthStar Partners įmonių grupė valdo:

- **samdą** (vakansijos → kandidatai → atranka → pasiūlymas → įdarbinimas), t. y. samdos „CRM“;
- **tarptautinį įdarbinimą**: darbuotojų iš užsienio šalių atvežimą į konkrečius grupės padalinius
  (pvz., vairuotojas iš Indijos → įmonė X, padalinys Šiauliuose), su visais tos šalių poros
  žingsniais, dokumentais ir terminais;
- **pagrindinius HR duomenis** apie įdarbintus žmones tiek, kiek reikia procesui sekti
  (ne darbo užmokesčiui).

MVP tikslas: veikianti, prisijungimą turinti sistema, kurią galima perduoti Product Owneriui (PO),
o tolesnis vystymas vyksta per backlog'ą (feedback forma → PO patvirtinimas → Claude Code → PR → merge).

---

## 2. Ką reikia papildyti blueprint'e (radau prieš pradedant)

Blueprint'as parašytas sklypų inventoriaus sistemai. HR / samdos sistemai kai kurios jo taisyklės
**tiesiogiai prieštarauja** užduočiai arba jų trūksta.

### 2.1 Kritiniai prieštaravimai

| # | Blueprint sako | Problema šiai sistemai | Siūlomas papildymas |
|---|---|---|---|
| A | §4: „No personal ID numbers, bank accounts, salary/HR data on the platform by design (GDPR)“ | Ši sistema **yra** HR sistema: kandidatų vardai, gimimo datos, pasų numeriai, vizos, leidimai gyventi, galbūt sveikatos pažymos ir teistumo išrašai. | Naujas skyrius „Asmens duomenys HR sistemoje“: DPIA (poveikio duomenų apsaugai vertinimas) **prieš** PROD duomenis; teisinis pagrindas kiekvienai duomenų kategorijai; laukų klasifikacija (Public / Internal / Personal / Sensitive); jautrūs laukai matomi tik konkrečioms rolėms; prieigos prie jautrių duomenų žurnalas. |
| B | §1.6: „Keep history, never hard-delete“ + temporal lentelės | GDPR 17 str. (teisė būti pamirštam) ir saugojimo terminai: atmesto kandidato duomenis reikia ištrinti/anonimizuoti po nustatyto termino. Temporal `History` lentelės saugo asmens duomenis amžinai. | Išimtis: admin-only procedūra `usp_ErasePerson` (anonimizuoja pagrindinę eilutę ir išvalo istoriją), saugojimo politika per `HISTORY_RETENTION_PERIOD`, ištrynimo faktas (ne turinys) registruojamas atskirame žurnale. **Techninį istorijos eilučių trynimo būdą reikia patikrinti spike'e** (MS dokumentacija aprašo tik retention valymą, ne konkretaus asmens trynimą). |
| C | §2: „External users get exported packs, not access“ | Ar užsienio įdarbinimo agentūros (pvz., Indijoje) ir patys kandidatai turi prisijungti? Jei taip — reikia Entra External ID / B2B guest ir duomenų perdavimo sutarčių. | MVP: **tik vidiniai vartotojai**. Agentūrų / kandidatų portalas — vėlesnė fazė, atskiras ADR. |
| D | §3: DAB be domeno logikos; failų įkėlimo nėra | HR procesui reikia dokumentų (pasų kopijos, sutartys, leidimai) — DAB failų nepriima. | Dokumentai Azure Blob Storage (private, be public access), įkėlimas/atsisiuntimas tik per `server.mjs` su vartotojo tapatybės patikra ir trumpalaikiu SAS; DB saugo tik metaduomenis. |

### 2.2 Trūkstami dalykai

1. **„Buy vs build“ sprendimas nepadarytas.** Pagal blueprint §1 commodity sritims perkama SaaS.
   Samdos ATS (kandidatų sekimas) yra commodity; unikali dalis — **užsienio įdarbinimo bylos
   valdymas per įmonių grupę** (šalių poros procesai, dokumentai, terminai, apgyvendinimas).
   Reikia žinoti, kokios sistemos jau naudojamos (DU / personalo apskaita, ATS), kad nekurtume
   antro „master“. Rekomendacija: kuriame bylų valdymą + lengvą samdos pipeline; DU lieka esamoje sistemoje
   ir susiejama per `ExternalIdMap`.
2. **Proceso šablonai, o ne kietai užkoduota logika.** „Indijos vairuotojas į Šiaulius“ turi būti
   **duomenys**, ne kodas: `ProcessTemplate` (kilmės šalis × paskirties šalis × pareigybės tipas)
   su žingsniais, privalomais dokumentais, tipine trukme ir atsakingu asmeniu. Naujas atvejis =
   naujas šablonas per UI, be programavimo.
3. **Terminų ir galiojimų kontrolė.** Vizų, leidimų gyventi / dirbti, vairuotojo pažymėjimų,
   95 kodo, tachografo kortelės galiojimo pabaigos — su priminimais (pvz., 90/60/30 d.).
4. **Teisinio konteksto kintamumas.** Lietuvoje taikoma metinė trečiųjų šalių darbuotojų kvota
   (spaudos duomenimis 2026 m. — 24 706, išnaudota ~2026-09, kai kurių prašymų priėmimas sustabdytas;
   svarstomi pakeitimai vairuotojams). Sistema neturi „žinoti“ įstatymų — taisyklės (kvotų statusas,
   atlyginimo slenksčiai, dokumentų sąrašai) laikomos lookup / šablonų lentelėse ir prižiūrimos HR.
   **Konkrečius reikalavimus turi patvirtinti teisininkas / HR, ne AI.**
5. **Duomenų matomumas pagal juridinį asmenį / padalinį.** Grupės įmonės X HR neturi matyti įmonės Y
   kandidatų, nebent suteikta teisė. Siūloma: SQL Row-Level Security pagal `LegalEntityId`,
   DAB `set-session-context: true` perduoda JWT claim'us į SQL (Microsoft dokumentuotas šablonas).
6. **Rolių modelis** (Entra grupės → SQL rolės): `Admin`, `ProductOwner`, `HrManager` (pagal įmonę),
   `Recruiter`, `Viewer`, `FeedbackSubmitter`. Jautrūs laukai (paso nr., gimimo data, dokumentai)
   — tik `HrManager`/`Recruiter` savo įmonėje.
7. **Daugiakalbiškumas ir vardai.** UI: LT + EN nuo pirmos dienos (grupės padaliniai užsienyje).
   Vardai saugomi tiksliai kaip pase (lotyniška transliteracija) + originalus rašmuo, jei pateiktas;
   visur `nvarchar`.
8. **Valiutos.** Agentūrų mokesčiai, kelionės, apgyvendinimo kaštai gali būti ne EUR (pvz., INR) —
   `AmountCcy` + `CurrencyCode`, perskaičiavimas tik deterministiniu kodu.
9. **DEV duomenys.** PROD asmens duomenys niekada nekeliauja į DEV/staging — tik sintetinis seed'as.
10. **CI be debesies DB.** Migracijos ir SQL testai CI'yje — prieš SQL Server konteinerį GitHub Actions
    viduje (pigiau, izoliuota, nereikia DEV DB prieigos iš CI).
11. **Backlog workflow detalės** (žr. §5): kas laikoma „bet kas“ (ar būtina prisijungti),
    statusai po PO patvirtinimo, susiejimas su GitHub Issue/PR, kas tvirtina merge.
12. **GitHub organizacija.** Dabartinė repo `saussainis/berry` — asmeninėje paskyroje. Blueprint §6
    reikalauja organizacijos (NorthStar Partners). Reikia nuspręsti prieš kuriant CI/OIDC, nes
    federated credential subject priklauso nuo org/repo.

---

## 3. Architektūra (MVP)

Lieka blueprint'o šablonas, su §2 papildymais:

```
Naršyklė (React + TS + Vite, Fluent UI, MSAL)
   │  same-origin /api, /files
   ▼
App Service Linux: server.mjs  ── CSP/HSTS, laukų allowlist'ai, failų upload/download (Blob, managed identity)
   │  vartotojo token'as (OBO)
   ▼
Azure Container Apps: nginx sidecar → Data API Builder (REST + GraphQL + MCP)
   │  set-session-context (claims → RLS)
   ▼
Azure SQL (serverless) ── temporal lentelės, RLS, stored procedures (perėjimai, tvirtinimai, erasure)

Entra ID (vartotojai, grupės, app registracijos, OIDC CI) · Log Analytics / App Insights · Key Vault nereikalingas (no secrets)
```

Sprendimas, kurį reikia patvirtinti: **DAB + stored procedures** (blueprint) vs **plonas custom API iš karto**.
Rekomendacija: pradėti su DAB + procedūromis (greičiau MVP, MCP nemokamai), perėjimo kriterijus užrašyti ADR'e
(pvz., kai prireiks sudėtingų workflow taisyklių, kurių negalima aiškiai išreikšti procedūra).

---

## 4. Duomenų modelis (MVP juodraštis)

Lookup'ai (`Code, Name, NameLt, SortOrder, IsActive`): `Country`, `Currency`, `PipelineStage`,
`DocumentType`, `ProcessStepType`, `PositionType` (pvz., `DRIVER_CE`), `RejectionReason`, `FeedbackStatus`.

| Lentelė | Paskirtis |
|---|---|
| `LegalEntity` | Grupės juridinis asmuo (šalis, įmonės kodas) |
| `Site` | Padalinys / vieta (pvz., Šiauliai), priklauso `LegalEntity` |
| `Vacancy` | Darbo poreikis: `SiteId`, `PositionTypeCode`, kiekis, terminas, statusas |
| `Agency` | Įdarbinimo partneris (šalis, kontaktai) |
| `Candidate` | Asmuo: vardai (kaip pase), pilietybė, kontaktai; jautrūs laukai atskirai |
| `CandidateSensitive` | Paso nr., gimimo data ir pan. — atskira lentelė, siauresnės teisės |
| `Application` | Kandidatas × vakansija, `PipelineStageCode`, šaltinis (`AgencyId`) |
| `ProcessTemplate` / `ProcessTemplateStep` | Šalių poros × pareigybės procesas, žingsniai, privalomi dokumentai |
| `ProcessCase` / `ProcessCaseStep` | Konkretaus kandidato byla, sukurta iš šablono; žingsnių statusai, terminai |
| `Document` | Metaduomenys: tipas, galioja iki, Blob nuoroda, kas įkėlė |
| `Note` | Komentarai / komunikacijos žurnalas |
| `Feedback` | Backlog įrašai (žr. §5) |
| `AuditLog` | Jautrių duomenų peržiūros, erasure faktai, PO sprendimai |
| `ExternalIdMap` | Susiejimai su DU/HR sistemomis, GitHub Issue ID |

Apgyvendinimas, kaštų apskaita, `Employee` po įdarbinimo — **ne MVP**, nebent PO nuspręs kitaip.

---

## 5. Darbo modelis: feedback → backlog → kodas → merge

```
Bet kas (prisijungęs*) ──► Feedback forma ──► Feedback.Status = NEW
                                                  │
                       PO (tik rolė ProductOwner, procedūra usp_DecideFeedback)
                          ├─► REJECTED (su priežastimi)
                          └─► APPROVED ──► automatiškai sukuriamas GitHub Issue (ExternalIdMap)
                                               │
                     Kūrėjas su Claude Code: branch → PR („Closes #N“) → CI → AI review
                                               │
                     Staging deploy iš PR ──► PO priėmimas staging'e ──► squash merge ──► PROD
                                               │
                                     GitHub webhook / Action: Feedback.Status = DONE
```

\* Reikia patvirtinti, ar „bet kas“ = bet kuris prisijungęs darbuotojas (rekomenduoju), ar ir anoniminiai
išoriniai vartotojai (tada reikia captcha, rate limit, spam filtro).

Statusai: `NEW → APPROVED | REJECTED → IN_PROGRESS → DONE` (+ `ON_HOLD`). Claude Code imasi tik
`APPROVED` įrašų ir tik kai paprašoma (blueprint §7).

---

## 6. Fazės ir MVP apimtis

### Fazė 0 — Pamatai (prieš bet kokį kodą)
- [ ] Atsakymai į §7 klausimus.
- [ ] Azure subscription + Entra tenant NorthStar Partners, EU regionas (patikrinti `what-if`).
- [ ] GitHub organizacija, repo, rulesets, CODEOWNERS, leidžiamų Actions sąrašas.
- [ ] DPIA juodraštis ir saugojimo terminai su atsakingu asmeniu / DPO.
- [ ] ADR-0001…: architektūra, DAB vs custom API, GDPR išimtis nuo „never hard-delete“, MVP be išorinių vartotojų.
- [ ] `CLAUDE.md`, `HANDOFF.md`, `CONTRIBUTING.md`.

### Fazė 1 — Skeletas (walking skeleton)
- [ ] Bicep infra (SQL, Container Apps + DAB, App Service + staging slot/app, Blob, Log Analytics).
- [ ] Entra app registracijos (setup skriptas), grupės, OIDC deploy tapatybės.
- [ ] Migracijų karkasas su checksum lentele, CI su SQL Server konteineriu.
- [ ] React app su MSAL prisijungimu, `server.mjs` proxy, vienas lookup ekranas end-to-end.

### Fazė 2 — MVP funkcionalumas
- [ ] Juridiniai asmenys, padaliniai, vakansijos.
- [ ] Kandidatai, aplikacijos, pipeline (kanban).
- [ ] Proceso šablonai + bylos su žingsniais; dokumentai su galiojimo datomis; terminų sąrašas.
- [ ] Feedback forma + PO backlog ekranas + GitHub Issue sukūrimas.
- [ ] RLS pagal juridinį asmenį; jautrių laukų prieigos žurnalas.
- [ ] Erasure procedūra (bent veikianti ir ištestuota, net jei automatinis retention — vėliau).

### Fazė 3 — Perdavimas PO
- [ ] PO priėmimo testas staging'e pagal scenarijų „Indijos vairuotojas → Šiauliai“ su sintetiniais duomenimis.
- [ ] Naudotojo instrukcija, `HANDOFF.md` atnaujinimas.
- [ ] Pilotinių vartotojų pakvietimas per Entra grupę tik po PO priėmimo.

### Ne MVP (vėliau)
Agentūrų / kandidatų portalas, el. pašto integracija, AI CV analizė, apgyvendinimas, kaštai,
DU sistemos integracija, ataskaitos BI.

---

## 7. Atviri klausimai (blokuoja Fazę 0)

1. **Debesis ir paskyra:** „NorthStar Partners paskyra“ — ar tai Azure subscription + Microsoft 365 / Entra tenant?
   Ar jau egzistuoja, kas jos administratorius, koks biudžetas per mėnesį?
2. **GitHub:** ar kursime NorthStar Partners GitHub organizaciją, ar lieka `saussainis/berry`?
3. **Esamos sistemos:** kokia DU / personalo apskaitos sistema naudojama? Ar yra ATS / Excel'iai, iš kurių reikės importo?
4. **Įmonių grupė:** kiek juridinių asmenų ir kuriose šalyse? Ar užsienio padalinių HR'ai irgi bus vartotojai (kalbos)?
5. **Kilmės šalys ir pareigybės pirmam etapui:** ar tik Indija → Lietuva vairuotojai, ar daugiau porų nuo pradžių?
6. **Išoriniai vartotojai:** ar agentūros ar kandidatai turi kada nors prisijungti? (Lemia tapatybės architektūrą.)
7. **Jautrūs duomenys:** ar sistemoje bus sveikatos pažymos, teistumo išrašai, atlyginimai? (Lemia DPIA ir saugumo lygį.)
8. **Feedback forma:** „bet kas“ = prisijungę darbuotojai ar ir viešai prieinama?
9. **Merge teisė:** kas spaudžia merge — PO, CIO ar kūrėjas? Ar PO priėmimas staging'e privalomas prieš merge?
10. **DPO / teisininkas:** kas patvirtins DPIA, saugojimo terminus ir proceso šablonų teisinį turinį?
11. **Sistemos pavadinimas** (repo vadinasi `berry`).

---

## 8. Šaltiniai, naudoti tikrinant teiginius

- DAB + SQL RLS per session context: https://learn.microsoft.com/en-us/azure/data-api-builder/quickstart/authorization-sql-row-level-security
- DAB MCP DML įrankiai ir `delete-record` išjungimas: https://learn.microsoft.com/en-us/azure/data-api-builder/mcp/data-manipulation-language-tools
- Azure SQL temporal retention: https://learn.microsoft.com/en-us/azure/sql-database/sql-database-temporal-tables-retention-policy
- LT kvota 2026 (spauda, tikrinti su teisininku): https://workinlithuania.com/app/uploads/2026/07/2026.07.10-WIL-Quota.pdf ,
  https://www.lrt.lt/en/news-in-english/19/2975336/lithuanian-president-proposes-changes-to-foreign-fixed-term-work-permits
