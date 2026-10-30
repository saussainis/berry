(() => {
  "use strict";

  const CONTACT_EMAIL = "info@northstarpartners.eu";

  // English and German strings. Lithuanian is the source text in index.html and is captured at load.
  const EN = {
    skip: "Skip to content",
    "nav.brain": "Company brain", "nav.services": "Services", "nav.process": "Process", "nav.usecases": "Use cases", "nav.contact": "Contact us",
    "hero.eyebrow": "AI solutions for business",
    "hero.title": "Your company's knowledge, answering when you need it.",
    "hero.lead": "We configure a \u201ccompany brain\u201d \u2013 a specialised AI system grounded in your documents, processes and tools \u2013 that helps your team find answers faster, make decisions and automate routine work.",
    "hero.cta1": "Book a consultation", "hero.cta2": "What is a company brain?",
    "facts.1t": "One place for knowledge", "facts.1d": "documents, processes and systems together",
    "facts.2t": "Tailored to you", "facts.2d": "your domain, terminology and rules",
    "facts.3t": "You stay in control", "facts.3d": "access rights, sources and GDPR",
    "brain.eyebrow": "Company brain",
    "brain.title": "What your company knows, your AI knows too",
    "brain.p1": "Company knowledge is usually scattered across email, shared drives, CRM, wikis and people's heads. General-purpose AI tools know nothing about it, so their answers are generic or wrong.",
    "brain.p2": "A company brain connects these sources into one secure knowledge base that AI assistants and agents plug into. They answer from your data, cite their sources and see only what each employee's permissions allow.",
    "brain.l1": "Answers with links to sources",
    "brain.l2": "Permissions inherited from your systems",
    "brain.l3": "Continuously updated knowledge, not a one-off import",
    "services.eyebrow": "Services", "services.title": "What we do",
    "s1.t": "Company brain configuration", "s1.d": "Connecting and structuring knowledge sources, and tailoring the AI assistant to your domain, terminology and rules.",
    "s2.t": "AI agents for processes", "s2.d": "Specialised agents that handle specific tasks: drafting documents, processing requests, cleaning up data.",
    "s3.t": "Integrations", "s3.d": "We connect to the tools you already use: Microsoft 365, Google Workspace, CRM, ERP, ticketing and document systems.",
    "s4.t": "Training & support", "s4.d": "Team training, usage guidelines, quality monitoring and continuous improvement of the solution.",
    "process.eyebrow": "Process", "process.title": "How we work",
    "p1.t": "Audit", "p1.d": "We map processes, knowledge sources and where AI would add the most value.",
    "p2.t": "Architecture", "p2.d": "We choose models, data flows, and the security and access model.",
    "p3.t": "Configuration", "p3.d": "We connect sources and tailor assistants and agents.",
    "p4.t": "Pilot", "p4.d": "We test with one team and measure results.",
    "p5.t": "Rollout", "p5.d": "We roll out company-wide, train people and provide support.",
    "uc.eyebrow": "Use cases", "uc.title": "Where AI pays off today",
    "uc.1": "Customer service", "uc.2": "Sales & proposals", "uc.3": "HR & recruitment", "uc.4": "Finance & accounting",
    "uc.5": "Legal & compliance", "uc.6": "Internal knowledge & onboarding", "uc.7": "Project management", "uc.8": "Logistics & operations",
    "v1.t": "Data security", "v1.d": "Your data stays under your control. We choose GDPR-compliant solutions and take the EU AI Act into account.",
    "v2.t": "Reliable answers", "v2.d": "AI relies on your sources and cites them, leaving important decisions to people.",
    "v3.t": "Measurable value", "v3.d": "We agree up front what to measure: time saved, answer quality, process speed.",
    "team.eyebrow": "Team", "team.title": "Who you will work with",
    "team.role": "Managing Partner",
    "team.bio": "Algirdas leads NorthStar Partners and personally oversees client projects \u2013 from the first conversation about business needs to a working company brain and AI agents in production. The focus is on practical, secure AI solutions that deliver measurable value.",
    "team.li": "LinkedIn profile",
    "cta.eyebrow": "Getting started", "cta.title": "Not sure where to start?",
    "cta.p": "In a short call we will review your processes and name 2\u20133 areas where AI and a company brain would pay off fastest.",
    "cta.btn": "Discuss your case",
    "contact.eyebrow": "Contact", "contact.title": "Tell us about your company",
    "contact.lead": "We reply within one business day.",
    "contact.email": "Email", "contact.web": "Website",
    "form.name": "Full name", "form.company": "Company", "form.email": "Email", "form.topic": "Topic",
    "form.t1": "AI consultation", "form.t2": "Company brain implementation", "form.t3": "AI agents & automation", "form.t4": "Other",
    "form.msg": "Message",
    "form.consent": "I agree that my data will be used to respond to this enquiry.",
    "form.send": "Send enquiry",
    "form.ok": "Thank you! Your email app has opened with the message ready to send.",
    "form.err": "Please fill in the required fields and give your consent.",
    "footer.rights": "All rights reserved.", "footer.top": "Back to top \u2191",
  };

  const DE = {
    skip: "Zum Inhalt springen",
    "nav.brain": "Company Brain", "nav.services": "Leistungen", "nav.process": "Vorgehen", "nav.usecases": "Einsatzbereiche", "nav.contact": "Kontakt",
    "hero.eyebrow": "KI-L\u00f6sungen f\u00fcr Unternehmen",
    "hero.title": "Das Wissen Ihres Unternehmens \u2013 mit Antworten, wenn Sie sie brauchen.",
    "hero.lead": "Wir konfigurieren ein \u201eCompany Brain\u201c \u2013 ein spezialisiertes KI-System auf Basis Ihrer Dokumente, Prozesse und Systeme, das Ihrem Team hilft, schneller Antworten zu finden, Entscheidungen zu treffen und Routinearbeit zu automatisieren.",
    "hero.cta1": "Beratung vereinbaren", "hero.cta2": "Was ist ein Company Brain?",
    "facts.1t": "Ein Ort f\u00fcr Wissen", "facts.1d": "Dokumente, Prozesse und Systeme vereint",
    "facts.2t": "Auf Sie zugeschnitten", "facts.2d": "Ihre Branche, Begriffe und Regeln",
    "facts.3t": "Volle Kontrolle", "facts.3d": "Zugriffsrechte, Quellen und DSGVO",
    "brain.eyebrow": "Company Brain",
    "brain.title": "Was Ihr Unternehmen wei\u00df, wei\u00df auch Ihre KI",
    "brain.p1": "Unternehmenswissen ist meist verstreut: in E-Mails, auf Laufwerken, im CRM, in Wikis und in den K\u00f6pfen der Mitarbeitenden. Allgemeine KI-Tools kennen es nicht \u2013 ihre Antworten bleiben allgemein oder sind falsch.",
    "brain.p2": "Ein Company Brain verbindet diese Quellen zu einer sicheren Wissensbasis, an die KI-Assistenten und Agenten angebunden werden. Sie antworten auf Basis Ihrer Daten, nennen ihre Quellen und sehen nur, was die Berechtigungen der jeweiligen Person erlauben.",
    "brain.l1": "Antworten mit Quellenangaben",
    "brain.l2": "Berechtigungen aus Ihren Systemen \u00fcbernommen",
    "brain.l3": "Laufend aktualisiertes Wissen statt einmaligem Import",
    "services.eyebrow": "Leistungen", "services.title": "Was wir tun",
    "s1.t": "Company-Brain-Konfiguration", "s1.d": "Anbindung und Strukturierung von Wissensquellen sowie Anpassung des KI-Assistenten an Ihre Branche, Begriffe und Regeln.",
    "s2.t": "KI-Agenten f\u00fcr Prozesse", "s2.d": "Spezialisierte Agenten f\u00fcr konkrete Aufgaben: Dokumente erstellen, Anfragen bearbeiten, Daten bereinigen.",
    "s3.t": "Integrationen", "s3.d": "Anbindung an Ihre bestehenden Tools: Microsoft 365, Google Workspace, CRM, ERP, Ticket- und Dokumentensysteme.",
    "s4.t": "Schulung & Betreuung", "s4.d": "Team-Schulungen, Nutzungsrichtlinien, Qualit\u00e4ts\u00fcberwachung und kontinuierliche Verbesserung.",
    "process.eyebrow": "Vorgehen", "process.title": "So arbeiten wir",
    "p1.t": "Analyse", "p1.d": "Wir erfassen Prozesse, Wissensquellen und wo KI den gr\u00f6\u00dften Nutzen bringt.",
    "p2.t": "Architektur", "p2.d": "Wir w\u00e4hlen Modelle, Datenfl\u00fcsse sowie Sicherheits- und Zugriffsmodell.",
    "p3.t": "Konfiguration", "p3.d": "Wir binden Quellen an und passen Assistenten und Agenten an.",
    "p4.t": "Pilot", "p4.d": "Wir testen mit einem Team und messen die Ergebnisse.",
    "p5.t": "Rollout", "p5.d": "Unternehmensweite Einf\u00fchrung, Schulung und Betreuung.",
    "uc.eyebrow": "Einsatzbereiche", "uc.title": "Wo sich KI schon heute lohnt",
    "uc.1": "Kundenservice", "uc.2": "Vertrieb & Angebote", "uc.3": "Personal & Recruiting", "uc.4": "Finanzen & Buchhaltung",
    "uc.5": "Recht & Compliance", "uc.6": "Internes Wissen & Onboarding", "uc.7": "Projektmanagement", "uc.8": "Logistik & Betrieb",
    "v1.t": "Datensicherheit", "v1.d": "Ihre Daten bleiben unter Ihrer Kontrolle. Wir setzen auf DSGVO-konforme L\u00f6sungen und ber\u00fccksichtigen die Anforderungen des EU AI Act.",
    "v2.t": "Verl\u00e4ssliche Antworten", "v2.d": "Die KI st\u00fctzt sich auf Ihre Quellen, nennt sie und \u00fcberl\u00e4sst wichtige Entscheidungen dem Menschen.",
    "v3.t": "Messbarer Nutzen", "v3.d": "Wir legen vorab fest, was gemessen wird: eingesparte Zeit, Antwortqualit\u00e4t, Prozessgeschwindigkeit.",
    "team.eyebrow": "Team", "team.title": "Mit wem Sie arbeiten",
    "team.role": "Managing Partner",
    "team.bio": "Algirdas leitet NorthStar Partners und betreut Kundenprojekte pers\u00f6nlich \u2013 vom ersten Gespr\u00e4ch \u00fcber den Bedarf bis zum produktiven Company Brain und KI-Agenten. Im Mittelpunkt stehen praxisnahe, sicheren KI-L\u00f6sungen mit messbarem Nutzen.",
    "team.li": "LinkedIn-Profil",
    "cta.eyebrow": "Einstieg", "cta.title": "Unsicher, wo Sie anfangen sollen?",
    "cta.p": "In einem kurzen Gespr\u00e4ch betrachten wir Ihre Prozesse und benennen 2\u20133 Bereiche, in denen sich KI und ein Company Brain am schnellsten auszahlen.",
    "cta.btn": "Ihren Fall besprechen",
    "contact.eyebrow": "Kontakt", "contact.title": "Erz\u00e4hlen Sie uns von Ihrem Unternehmen",
    "contact.lead": "Wir antworten innerhalb eines Werktags.",
    "contact.email": "E-Mail", "contact.web": "Website",
    "form.name": "Vor- und Nachname", "form.company": "Unternehmen", "form.email": "E-Mail", "form.topic": "Thema",
    "form.t1": "KI-Beratung", "form.t2": "Company-Brain-Einf\u00fchrung", "form.t3": "KI-Agenten & Automatisierung", "form.t4": "Sonstiges",
    "form.msg": "Nachricht",
    "form.consent": "Ich bin einverstanden, dass meine Daten zur Beantwortung dieser Anfrage verwendet werden.",
    "form.send": "Anfrage senden",
    "form.ok": "Vielen Dank! Ihr E-Mail-Programm wurde mit der vorbereiteten Nachricht ge\u00f6ffnet.",
    "form.err": "Bitte f\u00fcllen Sie die Pflichtfelder aus und erteilen Sie Ihre Einwilligung.",
    "footer.rights": "Alle Rechte vorbehalten.", "footer.top": "Nach oben \u2191",
  };

  const LT_EXTRA = {
    "form.ok": "Ačiū! Atsidarė jūsų el. pašto programa su paruošta žinute.",
    "form.err": "Užpildykite privalomus laukus ir pažymėkite sutikimą.",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const LT = { ...LT_EXTRA };
  nodes.forEach((el) => { LT[el.dataset.i18n] = el.textContent; });
  const DICT = { lt: LT, en: EN, de: DE };

  let lang = "lt";
  const t = (key) => DICT[lang][key] ?? LT[key] ?? key;

  function setLang(next) {
    if (!DICT[next]) return;
    lang = next;
    document.documentElement.lang = next;
    nodes.forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll(".lang button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === next));
    });
    try { localStorage.setItem("nsp-lang", next); } catch (_) { /* storage unavailable */ }
  }

  document.querySelectorAll(".lang button").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  let saved = null;
  try { saved = localStorage.getItem("nsp-lang"); } catch (_) { /* storage unavailable */ }
  const nav2 = (navigator.language || "").slice(0, 2).toLowerCase();
  const browser = DICT[nav2] ? nav2 : "en";
  setLang(saved || browser);

  // Mobile navigation
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("nav");
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    burger.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }));

  // Header shadow on scroll
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const revealables = document.querySelectorAll(".section h2, .card, .steps li, .value, .chips, .prose, .form");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealables.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
  }

  // Contact form: no backend yet, so compose an email in the visitor's mail client.
  const form = document.getElementById("contact-form");
  const status = form.querySelector(".form__status");
  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    let valid = true;
    form.querySelectorAll("[required]").forEach((f) => {
      const ok = f.type === "checkbox" ? f.checked : f.checkValidity() && f.value.trim() !== "";
      f.classList.toggle("is-invalid", !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      status.textContent = t("form.err");
      status.className = "form__status form__full err";
      return;
    }
    const d = new FormData(form);
    const topic = form.querySelector("select[name=topic]");
    const subject = `[${topic.options[topic.selectedIndex].text}] ${d.get("name")}${d.get("company") ? " – " + d.get("company") : ""}`;
    const body = `${d.get("message")}\n\n--\n${d.get("name")}\n${d.get("company") || ""}\n${d.get("email")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = t("form.ok");
    status.className = "form__status form__full ok";
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
