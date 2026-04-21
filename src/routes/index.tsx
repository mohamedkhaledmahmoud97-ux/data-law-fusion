import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
import {
  HiCode, HiDatabase, HiChartBar, HiAcademicCap, HiBriefcase, HiSparkles,
  HiMail, HiPhone, HiLocationMarker, HiArrowRight, HiCheckCircle, HiScale,
} from "react-icons/hi";
import { FaLinkedin, FaGithub, FaPython, FaAws } from "react-icons/fa";
import { SiPostgresql, SiTensorflow, SiPandas } from "react-icons/si";
import mohamedImg from "@/assets/mohamed.png";
import { Chatbot } from "@/components/Chatbot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed Khaled Mahmoud — Data Analyst @ MCIT | LL.M | AI Specialist" },
      {
        name: "description",
        content:
          "Mohamed Khaled Mahmoud — Professional Data Analyst at the Ministry of Communications & IT (MCIT). LL.M International Law, AI & Data Science specialist. 150+ projects, UN-recognized leader.",
      },
      { property: "og:title", content: "Mohamed Khaled Mahmoud — Data Analyst & AI Specialist" },
      { property: "og:description", content: "The intersection of Data & Law. 150+ projects delivered. UN-recognized leader." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const skillsData = [
  { skill: "SQL", value: 95 },
  { skill: "Python", value: 90 },
  { skill: "Power BI / DAX", value: 95 },
  { skill: "ETL Pipelines", value: 90 },
  { skill: "Legal Compliance", value: 95 },
  { skill: "Machine Learning", value: 85 },
];

const skillChips = [
  "Pandas", "NumPy", "Statistics", "SPSS", "Orange",
  "VBA Automation", "API Integration", "DAX", "ETL", "Scikit-Learn",
];

const experiences = [
  {
    period: "2025 — Present",
    role: "Professional Data Analyst",
    org: "Ministry of Communications & IT (MCIT)",
    icon: HiBriefcase,
    color: "emerald",
    points: [
      "Leading 150+ data analytics projects for public-sector KPIs and digital transformation",
      "Architecting SQL/Python pipelines processing 50K+ records",
      "Delivering Power BI dashboards for executive decision-making",
    ],
  },
  {
    period: "2022",
    role: "Team Lead — COP27",
    org: "UN Climate Change Conference, Sharm El-Sheikh",
    icon: HiSparkles,
    color: "cyan",
    points: [
      "UN-recognized leadership during the global climate summit",
      "Coordinated cross-functional international teams",
      "Awarded official UN recognition for delivery excellence",
    ],
  },
  {
    period: "Ongoing",
    role: "IBM Leadership Program",
    org: "IBM",
    icon: HiAcademicCap,
    color: "emerald",
    points: [
      "Led cross-functional teams for end-to-end project delivery",
      "Trained in agile methodology and stakeholder alignment",
    ],
  },
];

const projects = [
  {
    title: "Banking Analytics Platform",
    tag: "AML & Risk",
    desc: "Automated Anti-Money-Laundering monitoring and credit risk scoring using Python ML models. Reduced manual review time by 60%.",
    tech: ["Python", "Scikit-Learn", "SQL", "Power BI"],
    metric: "60% time saved",
    icon: HiChartBar,
  },
  {
    title: "Public Sector KPI Dashboard",
    tag: "MCIT Production",
    desc: "Real-time KPI dashboard managing 50,000+ records across ministries. Built end-to-end with SQL, Python ETL, and DAX measures.",
    tech: ["SQL", "Python", "Power BI", "DAX"],
    metric: "50K+ records",
    icon: HiDatabase,
  },
  {
    title: "Predictive ML Segmentation",
    tag: "Customer Intelligence",
    desc: "Customer segmentation and churn prediction model built in Orange. Identified 4 high-value segments driving 70% of revenue.",
    tech: ["Orange", "Python", "Statistics", "Pandas"],
    metric: "4 key segments",
    icon: HiSparkles,
  },
];

const certifications = [
  { title: "AI Diploma", issuer: "Military Technical College (MTC)", icon: HiAcademicCap },
  { title: "LL.M International Law", issuer: "Cairo University", icon: HiScale },
  { title: "UN Recognition — COP27", issuer: "United Nations", icon: HiSparkles },
  { title: "IBM Leadership Training", issuer: "IBM", icon: HiBriefcase },
];

function Portfolio() {
  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
}

function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-40 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto glass-strong rounded-full px-6 py-3 flex items-center justify-between">
        <a href="#hero" className="font-mono text-sm font-bold text-gradient">MKM.</a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="text-xs font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:scale-105 transition"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">Available for select consulting</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5"
          >
            Mohamed Khaled Mahmoud:{" "}
            <span className="text-gradient">The Intersection of Data &amp; Law</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-lg text-muted-foreground mb-8 max-w-xl"
          >
            Professional Data Analyst @ MCIT &nbsp;·&nbsp; LL.M International Law &nbsp;·&nbsp;
            AI &amp; Data Science Specialist
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <a href="#projects" className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition glow-emerald">
              View Projects <HiArrowRight />
            </a>
            <a href="#contact" className="glass px-6 py-3 rounded-full font-semibold hover:bg-white/5 transition">
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { v: "150+", l: "Projects Delivered" },
              { v: "10+", l: "Years Leadership" },
              { v: "UN", l: "Recognized Leader" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-xl p-4">
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="relative animate-float"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl rounded-full" />
          <div className="relative glass-strong rounded-3xl overflow-hidden glow-cyan">
            <img
              src={mohamedImg}
              alt="Mohamed Khaled Mahmoud — Data Analyst at MCIT"
              className="w-full h-auto"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
          </div>
          <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl px-4 py-3 flex items-center gap-2 glow-emerald">
            <HiCheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold">MCIT Verified</span>
          </div>
          <div className="absolute -top-4 -right-4 glass-strong rounded-2xl px-4 py-3 flex items-center gap-2">
            <HiSparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold">UN COP27</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ tag, title, subtitle }: { tag: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      className="mb-12 max-w-2xl"
    >
      <div className="font-mono text-xs text-primary tracking-widest uppercase mb-3">{tag}</div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          tag="01 / About"
          title={<>A rare blend of <span className="text-gradient">Law &amp; Data Science</span></>}
        />
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <HiScale className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-3">Legal Expertise</h3>
            <p className="text-muted-foreground leading-relaxed">
              LL.M from Cairo University. Expert in regulatory frameworks, public-sector
              compliance, and the legal layer that shapes how data is collected, governed, and used.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-8"
          >
            <HiCode className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
            <p className="text-muted-foreground leading-relaxed">
              SQL, Python, Power BI/DAX, and AI-driven insights. I navigate complex regulatory
              environments by building data pipelines and ML models that turn raw policy data
              into measurable impact.
            </p>
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-8 text-lg text-muted-foreground max-w-3xl"
        >
          This hybrid profile is rare — and uniquely powerful for ministries, banks, and
          enterprises operating where compliance and computation meet.
        </motion.p>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          tag="02 / Skills"
          title={<>Core <span className="text-gradient">Technical Skills</span></>}
          subtitle="An interactive view of the proficiency that drives every project."
        />

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="glass-strong rounded-3xl p-6 h-[420px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="oklch(1 0 0 / 0.12)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "oklch(0.85 0.02 240)", fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "oklch(0.55 0.03 250)", fontSize: 10 }} stroke="oklch(1 0 0 / 0.1)" />
                <Radar name="Mohamed" dataKey="value" stroke="oklch(0.72 0.17 162)" fill="oklch(0.72 0.17 162)" fillOpacity={0.35} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <div>
            <div className="space-y-3 mb-6">
              {skillsData.map((s, i) => (
                <motion.div
                  key={s.skill}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="glass rounded-lg p-3 flex items-center gap-3"
                >
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5 text-sm">
                      <span className="font-medium">{s.skill}</span>
                      <span className="font-mono text-primary">{s.value}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }} whileInView={{ width: `${s.value}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05 + 0.2, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {skillChips.map((c) => (
                <span key={c} className="glass text-xs font-medium px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:border-primary/40 transition">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          tag="03 / Experience"
          title={<>Professional <span className="text-gradient">Journey</span></>}
        />
        <div className="space-y-5">
          {experiences.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition group"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${e.color === "emerald" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold">{e.role}</h3>
                      <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                    </div>
                    <div className="text-primary font-medium mb-4">{e.org}</div>
                    <ul className="space-y-2">
                      {e.points.map((p) => (
                        <li key={p} className="flex gap-2 text-muted-foreground text-sm">
                          <HiCheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          tag="04 / Projects"
          title={<>Selected <span className="text-gradient">Work</span></>}
          subtitle="Production systems delivering measurable results across banking, public sector, and ML."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 group hover:border-primary/40 transition relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm border-t border-glass-border pt-3">
                    <span className="text-primary font-semibold">{p.metric}</span>
                    <HiArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          tag="05 / Credentials"
          title={<>Certifications &amp; <span className="text-gradient">Recognition</span></>}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 text-center hover:border-accent/40 transition"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-bold mb-1">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.issuer}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    { icon: HiMail, label: "Email", value: "mohamedkhaledmahmoud97@gmail.com", href: "mailto:mohamedkhaledmahmoud97@gmail.com" },
    { icon: HiPhone, label: "Phone", value: "+20 100 052 5308", href: "tel:+201000525308" },
    { icon: HiLocationMarker, label: "Location", value: "Cairo, Egypt", href: "#" },
  ];
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="glass-strong rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative">
            <div className="font-mono text-xs text-primary tracking-widest uppercase mb-3">06 / Contact</div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              Let's build something <span className="text-gradient">intelligent</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Open to consulting, advisory, and high-impact data engagements across MENA and beyond.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {items.map((it) => {
                const Icon = it.icon;
                return (
                  <a key={it.label} href={it.href} className="glass rounded-xl p-4 hover:border-primary/40 transition text-left group">
                    <Icon className="w-5 h-5 text-primary mb-2" />
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{it.label}</div>
                    <div className="text-sm font-medium break-all">{it.value}</div>
                  </a>
                );
              })}
            </div>
            <a
              href="mailto:mohamedkhaledmahmoud97@gmail.com"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:scale-105 transition glow-emerald"
            >
              Start a Conversation <HiArrowRight />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-glass-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mohamed Khaled Mahmoud. Built with intent.
        </div>
        <div className="flex gap-3">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-primary hover:border-primary/40 transition">
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-primary hover:border-primary/40 transition">
            <FaGithub className="w-4 h-4" />
          </a>
          <a href="mailto:mohamedkhaledmahmoud97@gmail.com" aria-label="Email"
            className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-primary hover:border-primary/40 transition">
            <HiMail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
