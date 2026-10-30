(() => {
  "use strict";

  const CONTACT_EMAIL = "info@northstarpartners.eu";

  // English strings. Lithuanian is the source text in index.html and is captured at load.
  const EN = {
    skip: "Skip to content",
    "nav.about": "About", "nav.services": "Services", "nav.process": "Process", "nav.careers": "Careers", "nav.contact": "Contact us",
    "hero.eyebrow": "Group of companies · Lithuania & Europe",
    "hero.title": "The right people. In the right place. On time.",
    "hero.lead": "NorthStar Partners helps group companies and partners find, select and smoothly onboard employees – from the local market and from abroad.",
    "hero.cta1": "I need staff", "hero.cta2": "I'm looking for a job",
    "facts.1t": "Full cycle", "facts.1d": "from the hiring need to day one",
    "facts.2t": "International", "facts.2d": "hiring from third countries",
    "facts.3t": "Transparent", "facts.3d": "process and clear timelines",
    "about.eyebrow": "About us",
    "about.title": "A reliable partner when your business needs people",
    "about.p1": "NorthStar Partners is a group of companies uniting several legal entities and sites. Our strength is filling positions quickly where they are needed most – and taking care of people throughout the whole hiring journey.",
    "about.p2": "We work with trusted recruitment partners abroad, comply with legal and data protection requirements, and accompany every candidate from the first interview to their first working day.",
    "services.eyebrow": "Services", "services.title": "What we do",
    "s1.t": "Search & selection", "s1.d": "Job postings, candidate sourcing, interviews and skills assessment against your requirements.",
    "s2.t": "International hiring", "s2.d": "Selecting workers from third countries and organising their arrival at a specific group company and site.",
    "s3.t": "Documents & permits", "s3.d": "Visas, residence and work permits, qualification documents – and tracking of their expiry dates.",
    "s4.t": "Arrival & onboarding", "s4.d": "Support on arrival: meeting, accommodation matters, job induction and guidance during the first weeks.",
    "process.eyebrow": "Process", "process.title": "How we work",
    "p1.t": "Need", "p1.d": "Together we define the role, headcount, location and deadline.",
    "p2.t": "Sourcing", "p2.d": "We search the local market and through partners abroad.",
    "p3.t": "Selection", "p3.d": "Interviews, qualification checks, an offer to the candidate.",
    "p4.t": "Paperwork", "p4.d": "Permits, visas and contracts – with a clear step-by-step plan.",
    "p5.t": "Day one", "p5.d": "Arrival, induction and support during the first weeks.",
    "sectors.eyebrow": "Sectors", "sectors.title": "Where we help most",
    "sec.1": "Transport & logistics", "sec.2": "International drivers (CE)", "sec.3": "Warehousing",
    "sec.4": "Manufacturing", "sec.5": "Construction", "sec.6": "Services",
    "v1.t": "Legal compliance", "v1.d": "Our processes follow current migration and labour law requirements.",
    "v2.t": "Data protection", "v2.d": "We process personal data under the GDPR – only as much as needed, only by those who need it.",
    "v3.t": "Fairness to people", "v3.d": "Clear terms for candidates and no hidden recruitment fees.",
    "careers.eyebrow": "Careers", "careers.title": "Looking for a job in Lithuania?",
    "careers.p": "Send us your CV and tell us what kind of work you are looking for. We will contact suitable candidates when a matching position opens.",
    "careers.cta": "Send your CV",
    "contact.eyebrow": "Contact", "contact.title": "Tell us what you need",
    "contact.lead": "We reply within one business day.",
    "contact.email": "Email", "contact.web": "Website",
    "form.name": "Full name", "form.company": "Company", "form.email": "Email", "form.topic": "Topic",
    "form.t1": "I need staff", "form.t2": "I'm looking for a job", "form.t3": "Partnership", "form.t4": "Other",
    "form.msg": "Message",
    "form.consent": "I agree that my data will be used to respond to this enquiry.",
    "form.send": "Send enquiry",
    "form.ok": "Thank you! Your email app has opened with the message ready to send.",
    "form.err": "Please fill in the required fields and give your consent.",
    "footer.rights": "All rights reserved.", "footer.top": "Back to top ↑",
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
