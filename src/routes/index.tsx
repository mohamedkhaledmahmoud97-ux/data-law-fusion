import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  HiCode, HiDatabase, HiChartBar, HiAcademicCap, HiBriefcase, HiSparkles,
  HiMail, HiPhone, HiLocationMarker, HiArrowRight, HiCheckCircle, HiScale,
  HiUserGroup, HiGlobe, HiLightningBolt, HiCog, HiDocumentText, HiBadgeCheck,
  HiExternalLink, HiChevronDown,
} from "react-icons/hi";
import { FaLinkedin, FaGithub, FaPython, FaMicrosoft, FaAward, FaUniversity } from "react-icons/fa";
import {
  SiPostgresql, SiPandas, SiMicrosoftexcel, SiTableau, SiGooglecloud, SiIbm,
} from "react-icons/si";
import mohamedImg from "@/assets/mohamed.png";
import { Chatbot } from "@/components/Chatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed Khaled Mahmoud — Professional Data Analyst | MCIT" },
      {
        name: "description",
        content:
          "Mohamed Khaled Mahmoud — Professional Data Analyst at MCIT. Hybrid Legal + Data profile. 150+ projects, Power BI, SQL, Python, AI, and regulatory compliance expertise.",
      },
      { property: "og:title", content: "Mohamed Khaled Mahmoud — Data Analyst & AI Specialist" },
      { property: "og:description", content: "The intersection of Data & Law. 150+ projects delivered. UN COP27 Action Leader." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ============================================================
   DATA
   ============================================================ */

const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "portfolio", label: "Portfolio" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const stats = [
  { value: "150+", label: "Data Projects Delivered" },
  { value: "15+", label: "Years Volunteering" },
  { value: "10+", label: "Years Leadership" },
  { value: "UN", label: "COP27 Recognition" },
];

const skillCategories = [
  {
    icon: HiDatabase,
    title: "Data Analysis",
    color: "emerald",
    skills: [
      { name: "SQL / T-SQL", level: 95 },
      { name: "Python (Pandas, NumPy)", level: 90 },
      { name: "Orange (ML)", level: 85 },
      { name: "Statistics & SPSS", level: 88 },
    ],
  },
  {
    icon: HiChartBar,
    title: "Business Intelligence",
    color: "cyan",
    skills: [
      { name: "Power BI / DAX", level: 95 },
      { name: "Tableau", level: 80 },
      { name: "Excel Advanced", level: 95 },
      { name: "Data Storytelling", level: 92 },
    ],
  },
  {
    icon: HiCog,
    title: "Engineering & Automation",
    color: "emerald",
    skills: [
      { name: "VBA Automation", level: 90 },
      { name: "ETL Pipelines", level: 90 },
      { name: "API Integration", level: 85 },
      { name: "Power Query / M", level: 88 },
    ],
  },
  {
    icon: HiScale,
    title: "Domain Expertise",
    color: "cyan",
    skills: [
      { name: "Legal Analytics", level: 95 },
      { name: "Regulatory Compliance", level: 95 },
      { name: "Public Sector KPIs", level: 92 },
      { name: "AML & Credit Risk", level: 88 },
    ],
  },
];

const experiences = [
  {
    period: "2025 — Present",
    role: "Professional Data Analyst",
    org: "Ministry of Communications & IT (MCIT)",
    location: "Cairo, Egypt",
    points: [
      "Leading 150+ data analytics projects across public-sector digital transformation initiatives.",
      "Designing KPI dashboards in Power BI for executive decision-making across ministries.",
      "Building ETL pipelines processing 50K+ records using SQL and Python.",
      "Advising on data governance and regulatory compliance leveraging legal background.",
    ],
  },
  {
    period: "2023 — 2025",
    role: "Legal Operations Analyst",
    org: "Legal Experts Co.",
    location: "Cairo, Egypt",
    points: [
      "Bridged legal teams and data systems to streamline contract analytics workflows.",
      "Automated case-tracking dashboards using VBA and Power BI, reducing reporting time by 60%.",
      "Led compliance audits aligned with international regulatory frameworks.",
    ],
  },
  {
    period: "2022 — 2023",
    role: "Credit Risk Intern",
    org: "National Bank of Egypt",
    location: "Cairo, Egypt",
    points: [
      "Performed AML screening and credit risk modeling on retail loan portfolios.",
      "Built Excel + SQL models to detect anomalies in transaction patterns.",
      "Contributed to risk reports presented to senior credit committee.",
    ],
  },
  {
    period: "2022",
    role: "COP27 Action Leader (UN Recognized)",
    org: "United Nations Climate Change Conference",
    location: "Sharm El-Sheikh, Egypt",
    points: [
      "Led cross-functional volunteer team during UN COP27 climate conference.",
      "Coordinated logistics and stakeholder communication across 190+ delegations.",
      "Recognized by the UN for outstanding leadership and impact.",
    ],
  },
];

const portfolioItems = [
  {
    title: "Sales Analytics Dashboard",
    category: "Power BI",
    description: "End-to-end Power BI dashboard tracking revenue, regional performance, and product trends with drill-through analysis.",
    metric: "↑ 28% revenue insight",
    stack: ["Power BI", "DAX", "SQL", "Power Query"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "Pizza Sales Dashboard",
    category: "Excel Dashboards",
    description: "Interactive Excel dashboard analyzing 50K+ pizza sales records with pivot tables, slicers, and KPI indicators.",
    metric: "50K+ records analyzed",
    stack: ["Excel", "Pivot Tables", "VBA", "Power Query"],
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    title: "Banking AML & Credit Risk",
    category: "Python Projects",
    description: "Anti-money-laundering anomaly detection and credit-risk scoring model using Python and Scikit-Learn.",
    metric: "92% detection accuracy",
    stack: ["Python", "Scikit-Learn", "Pandas", "SQL"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "Public Sector KPI Dashboard",
    category: "Power BI",
    description: "MCIT executive dashboard tracking digital transformation KPIs across ministries with real-time data refresh.",
    metric: "50K+ records, 12 KPIs",
    stack: ["Power BI", "SQL Server", "DAX", "Python"],
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    title: "HR Attrition Analysis",
    category: "Power BI",
    description: "HR analytics dashboard identifying attrition drivers using statistical analysis and what-if scenarios.",
    metric: "↓ 18% predicted attrition",
    stack: ["Power BI", "DAX", "Statistics"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "Customer Segmentation ML",
    category: "Python Projects",
    description: "K-means and hierarchical clustering on customer data using Orange and Python for targeted marketing.",
    metric: "5 actionable segments",
    stack: ["Orange", "Python", "Scikit-Learn", "Pandas"],
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    title: "Financial Reporting Automation",
    category: "Excel Dashboards",
    description: "VBA-powered Excel automation reducing monthly financial close from 5 days to 1 day.",
    metric: "↓ 80% close time",
    stack: ["Excel", "VBA", "Power Query"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "Legal Compliance Tracker",
    category: "Power BI",
    description: "Regulatory compliance dashboard tracking case status, deadlines, and risk levels for legal operations.",
    metric: "100% deadline compliance",
    stack: ["Power BI", "SQL", "DAX"],
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    title: "ETL Pipeline — Public Data",
    category: "Python Projects",
    description: "Production ETL pipeline ingesting multi-source government data into SQL Server with quality checks.",
    metric: "99.5% data quality",
    stack: ["Python", "SQL Server", "Pandas", "Airflow"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
];

const portfolioFilters = ["All", "Power BI", "Excel Dashboards", "Python Projects"];

const education = [
  {
    icon: HiSparkles,
    title: "Specialized Diploma in Applied AI",
    org: "Military Technical College (MTC)",
    period: "2024",
    note: "Applied AI & Machine Learning specialization.",
  },
  {
    icon: HiScale,
    title: "Master of International Law (LL.M)",
    org: "Cairo University — Faculty of Law",
    period: "2022",
    note: "Specialized in international regulatory frameworks.",
  },
  {
    icon: FaUniversity,
    title: "Bachelor of Sharia & Law",
    org: "Al-Azhar University",
    period: "2019",
    note: "Foundation in legal reasoning and compliance.",
  },
];

const volunteering = [
  {
    icon: HiUserGroup,
    title: "Life Makers Foundation — Leader",
    period: "2010 — Present",
    note: "15+ years leading youth development & community initiatives across Egypt.",
  },
  {
    icon: HiGlobe,
    title: "UN COP27 Action Leader",
    period: "2022",
    note: "UN-recognized leadership at the Climate Change Conference, Sharm El-Sheikh.",
  },
];

const certifications = [
  { title: "Power BI Data Analyst Specialist", issuer: "Microsoft", icon: FaMicrosoft, color: "cyan" },
  { title: "Google Data Analytics Certificate", issuer: "Google / Coursera", icon: SiGooglecloud, color: "emerald" },
  { title: "IBM Quality Work Recognition", issuer: "IBM", icon: SiIbm, color: "cyan" },
  { title: "Microsoft SQL Server", issuer: "Microsoft", icon: SiPostgresql, color: "emerald" },
  { title: "CS50: Introduction to Computer Science", issuer: "Harvard University", icon: HiAcademicCap, color: "cyan" },
  { title: "AI Diploma", issuer: "Military Technical College", icon: HiSparkles, color: "emerald" },
];

/* ============================================================
   PAGE
   ============================================================ */

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan/10 blur-[120px]" />
      </div>

      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

/* ============================================================
   NAV
   ============================================================ */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald to-cyan text-background">
              MK
            </span>
            <span className="text-gradient">Mohamed Khaled</span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
          >
            Hire me <HiArrowRight />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-lg p-2 text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            <HiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </nav>
        {open && (
          <div className="glass mt-2 rounded-2xl p-3 md:hidden">
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    onClick={() => setOpen(false)}
                    href={`#${l.id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
              Available for Data & Compliance projects
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Mohamed Khaled <br />
              <span className="text-gradient">Mahmoud</span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground md:text-xl">
              Professional Data Analyst @ <span className="text-foreground font-medium">MCIT</span>
            </p>
            <p className="mt-4 max-w-xl text-muted-foreground">
              The rare intersection of <span className="text-emerald font-medium">Data Analytics</span> and{" "}
              <span className="text-cyan font-medium">International Law</span>. I turn complex regulatory and
              public-sector data into clear, decision-ready intelligence.
            </p>

            {/* floating badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "LL.M International Law", icon: HiScale, c: "cyan" },
                { label: "AI Diploma — MTC", icon: HiSparkles, c: "emerald" },
                { label: "UN COP27 Leader", icon: HiGlobe, c: "cyan" },
                { label: "Power BI Specialist", icon: HiChartBar, c: "emerald" },
              ].map((b, i) => (
                <motion.span
                  key={b.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs"
                >
                  <b.icon className={b.c === "emerald" ? "text-emerald" : "text-cyan"} />
                  {b.label}
                </motion.span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                View Portfolio <HiArrowRight />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg glass px-5 py-2.5 text-sm font-medium hover:bg-white/5"
              >
                <HiMail /> Get in touch
              </a>
            </div>

            {/* stats */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="glass rounded-xl p-3 text-center"
                >
                  <div className="text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto"
          >
            <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-emerald/30 to-cyan/30 blur-3xl" />
            <div className="relative h-72 w-72 overflow-hidden rounded-full border border-glass-border glass-strong glow-emerald sm:h-80 sm:w-80 md:h-96 md:w-96 animate-float">
              <img
                src={mohamedImg}
                alt="Mohamed Khaled Mahmoud"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            {/* floating chips */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-4 top-10 glass rounded-xl px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-1.5"><HiDatabase className="text-emerald" /> SQL · Python</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-2 bottom-12 glass rounded-xl px-3 py-2 text-xs"
            >
              <div className="flex items-center gap-1.5"><HiChartBar className="text-cyan" /> Power BI · DAX</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION TITLE
   ============================================================ */

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center"
    >
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">{eyebrow}</div>
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
      {sub && <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */

function About() {
  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="About"
          title="A Hybrid Profile: Law × Data"
          sub="Where regulatory rigor meets analytical precision."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 md:col-span-2"
          >
            <p className="leading-relaxed text-muted-foreground">
              I'm a <span className="text-foreground font-medium">Professional Data Analyst at the Ministry of
              Communications & Information Technology (MCIT)</span>, with a rare hybrid background combining a
              <span className="text-cyan font-medium"> Master of International Law (LL.M)</span> with deep
              expertise in <span className="text-emerald font-medium">SQL, Python, Power BI, and AI</span>.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Over <span className="text-foreground font-medium">150+ delivered projects</span>, I've helped
              public-sector and private clients translate raw data into decision-ready dashboards, automate
              compliance workflows, and build predictive models grounded in legal and regulatory context.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Beyond analytics, I'm a UN COP27-recognized leader and a 15+ year volunteer with the Life Makers
              Foundation — bringing the same discipline to community impact.
            </p>
          </motion.div>

          <div className="grid gap-3">
            {[
              { icon: HiBriefcase, label: "MCIT — Public Sector", value: "Data Analyst" },
              { icon: HiScale, label: "LL.M International Law", value: "Cairo University" },
              { icon: HiSparkles, label: "AI Diploma", value: "MTC" },
              { icon: HiGlobe, label: "UN Recognized", value: "COP27 Leader" },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass flex items-center gap-3 rounded-xl p-4"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-emerald/20 to-cyan/20">
                  <c.icon className="text-emerald" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                  <div className="text-sm font-medium">{c.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SKILLS
   ============================================================ */

function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Skills"
          title="Core Technical Stack"
          sub="Categorized expertise across analytics, BI, automation, and domain knowledge."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className={`grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br ${
                  cat.color === "emerald" ? "from-emerald/20 to-cyan/20" : "from-cyan/20 to-emerald/20"
                }`}>
                  <cat.icon className={cat.color === "emerald" ? "text-emerald" : "text-cyan"} />
                </div>
                <h3 className="text-lg font-semibold">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((s) => (
                  <div key={s.name}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="text-xs font-medium text-foreground">{s.level}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          cat.color === "emerald"
                            ? "bg-gradient-to-r from-emerald to-cyan"
                            : "bg-gradient-to-r from-cyan to-emerald"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* extra chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {["Pandas", "NumPy", "Scikit-Learn", "SPSS", "Orange", "Power Query", "M Language", "Airflow", "Git", "REST APIs"].map((t) => (
            <span key={t} className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE — Timeline
   ============================================================ */

function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          eyebrow="Experience"
          title="Professional Timeline"
          sub="From legal operations to public-sector analytics leadership."
        />
        <div className="relative">
          {/* center line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald/40 via-cyan/40 to-transparent md:left-1/2" />
          <div className="space-y-8">
            {experiences.map((e, idx) => (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.05 * idx }}
                className={`relative flex flex-col gap-4 md:flex-row md:items-start ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* dot */}
                <div className="absolute left-4 top-2 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-emerald shadow-[0_0_12px] shadow-emerald md:left-1/2" />
                <div className="md:w-1/2 md:px-6">
                  <div className="ml-10 md:ml-0 glass rounded-2xl p-5">
                    <div className="text-xs font-medium text-cyan">{e.period}</div>
                    <h3 className="mt-1 text-lg font-semibold">{e.role}</h3>
                    <div className="text-sm text-emerald">{e.org}</div>
                    <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <HiLocationMarker /> {e.location}
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                          <HiCheckCircle className="mt-0.5 shrink-0 text-emerald" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PORTFOLIO GALLERY
   ============================================================ */

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Portfolio"
          title="Portfolio & Dashboards"
          sub="Selected work across Power BI, Excel, and Python — built for clarity and impact."
        />

        {/* filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {portfolioFilters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-emerald to-cyan text-background shadow-[0_0_20px_-5px] shadow-emerald"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, idx) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ y: -4 }}
              className="group glass overflow-hidden rounded-2xl"
            >
              {/* aspect-video preview */}
              <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="glass-strong rounded-xl px-4 py-2 text-xs font-medium text-foreground/90">
                    {p.category}
                  </div>
                </div>
                {/* fake chart bars decoration */}
                <div className="absolute bottom-3 left-3 right-3 flex h-10 items-end gap-1 opacity-60">
                  {[40, 70, 30, 90, 55, 75, 45, 85, 60].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-sm ${
                        i % 2 ? "bg-cyan/70" : "bg-emerald/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold transition-colors group-hover:text-emerald">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-emerald/10 px-2 py-1 text-xs font-medium text-emerald">
                  <HiLightningBolt /> {p.metric}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-glass-border bg-white/[0.03] px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   EDUCATION & VOLUNTEERING
   ============================================================ */

function Education() {
  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Education & Impact"
          title="Education & Volunteering"
          sub="A foundation in law, AI, and a 15-year track record of community leadership."
        />
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald">
              <HiAcademicCap /> Education
            </h3>
            <div className="space-y-3">
              {education.map((e, i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-emerald/20 to-cyan/20">
                      <e.icon className="text-emerald" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-semibold">{e.title}</h4>
                        <span className="text-xs text-cyan">{e.period}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{e.org}</div>
                      <p className="mt-1 text-xs text-muted-foreground">{e.note}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan">
              <HiUserGroup /> Volunteering
            </h3>
            <div className="space-y-3">
              {volunteering.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-cyan/20 to-emerald/20">
                      <v.icon className="text-cyan" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="font-semibold">{v.title}</h4>
                        <span className="text-xs text-emerald">{v.period}</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{v.note}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CERTIFICATIONS
   ============================================================ */

function Certifications() {
  return (
    <section id="certifications" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Credentials"
          title="Certifications & Recognition"
          sub="Industry-recognized credentials from Microsoft, Google, IBM, Harvard, and more."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -3 }}
              className="glass group relative overflow-hidden rounded-2xl p-5"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-emerald/20 to-cyan/20 blur-2xl transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-start gap-3">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${
                  c.color === "emerald" ? "from-emerald/20 to-cyan/10" : "from-cyan/20 to-emerald/10"
                } border border-glass-border`}>
                  <c.icon className={`h-6 w-6 ${c.color === "emerald" ? "text-emerald" : "text-cyan"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <HiBadgeCheck className="text-emerald" />
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Verified</span>
                  </div>
                  <h3 className="mt-1 font-semibold leading-tight">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */

function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle
          eyebrow="Contact"
          title="Let's build something that matters"
          sub="Open to data analytics, BI consulting, and legal-tech opportunities."
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong relative overflow-hidden rounded-2xl p-8 text-center"
        >
          <div className="absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-emerald/20 blur-3xl" />
          <div className="relative">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald to-cyan text-background">
              <HiMail className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-2xl font-semibold">Get in touch</h3>
            <p className="mt-2 text-muted-foreground">
              Reply within 24 hours · Cairo, Egypt
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:mohamedkhaledmahmoud97@gmail.com"
                className="glass flex items-center gap-3 rounded-xl p-4 text-left transition-colors hover:bg-white/5"
              >
                <HiMail className="text-emerald" />
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="text-sm font-medium">mohamedkhaledmahmoud97@gmail.com</div>
                </div>
              </a>
              <a
                href="tel:+201000525308"
                className="glass flex items-center gap-3 rounded-xl p-4 text-left transition-colors hover:bg-white/5"
              >
                <HiPhone className="text-cyan" />
                <div>
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="text-sm font-medium">+20 100 052 5308</div>
                </div>
              </a>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="glass grid h-11 w-11 place-items-center rounded-xl transition-colors hover:bg-white/5"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-cyan" />
              </a>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="glass grid h-11 w-11 place-items-center rounded-xl transition-colors hover:bg-white/5"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:mohamedkhaledmahmoud97@gmail.com"
                className="glass grid h-11 w-11 place-items-center rounded-xl transition-colors hover:bg-white/5"
                aria-label="Email"
              >
                <HiMail className="text-emerald" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  return (
    <footer className="border-t border-glass-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-emerald to-cyan text-background text-xs font-bold">
            MK
          </span>
          © {new Date().getFullYear()} Mohamed Khaled Mahmoud. All rights reserved.
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-cyan" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-foreground" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="mailto:mohamedkhaledmahmoud97@gmail.com" className="hover:text-emerald" aria-label="Email">
            <HiMail />
          </a>
        </div>
      </div>
    </footer>
  );
}
