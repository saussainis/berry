(() => {
  "use strict";

  const CONTACT_EMAIL = "info@northstarpartners.eu";

  // English strings. Lithuanian is the source text in index.html and is captured at load.
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

  const LT_EXTRA = {
    "form.ok": "Ačiū! Atsidarė jūsų el. pašto programa su paruošta žinute.",
    "form.err": "Užpildykite privalomus laukus ir pažymėkite sutikimą.",
  };

  const nodes = document.querySelectorAll("[data-i18n]");
  const LT = { ...LT_EXTRA };
  nodes.forEach((el) => { LT[el.dataset.i18n] = el.textContent; });
  const DICT = { lt: LT, en: EN };

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
  const browser = (navigator.language || "").toLowerCase().startsWith("lt") ? "lt" : "en";
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
