import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  HiCode, HiDatabase, HiChartBar, HiAcademicCap, HiBriefcase, HiSparkles,
  HiMail, HiPhone, HiLocationMarker, HiArrowRight, HiCheckCircle, HiScale,
  HiUserGroup, HiGlobe, HiLightningBolt, HiCog, HiDocumentText, HiBadgeCheck,
  HiExternalLink, HiChevronDown, HiSearch, HiChevronLeft, HiChevronRight,
  HiSun, HiMoon, HiCalendar, HiTrendingUp, HiCursorClick, HiDocumentDownload,
} from "react-icons/hi";
import { FaLinkedin, FaGithub, FaMicrosoft, FaUniversity, FaGoogle } from "react-icons/fa";
import { SiPostgresql } from "react-icons/si";
import mohamedImg from "@/assets/mohamed.png";
import { Chatbot } from "@/components/Chatbot";
import { supabase } from "@/integrations/supabase/client";

const trackCvDownload = () => {
  // Fire-and-forget: never block the download
  supabase
    .from("cv_downloads")
    .insert({
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
    })
    .then(({ error }) => {
      if (error) console.warn("CV download tracking failed:", error.message);
    });
};

// Dashboard screenshots (uploaded by Mohamed — Power BI, Excel, Orange)
import dashPbiSales from "@/assets/dashboard-powerbi-sales.png";
import dashPbiDark from "@/assets/dashboard-powerbi-dark.png";
import dashExcelSales from "@/assets/dashboard-excel-sales-analyze.png";
import dashExcelStrategic from "@/assets/dashboard-excel-strategic.png";
import dashExcelPizza from "@/assets/dashboard-excel-pizza.png";
import dashOrangeWf from "@/assets/dashboard-orange-workflow.png";
import dashExcelHrMax from "@/assets/dashboard-excel-hr-max.png";
import dashExcelHrOrange from "@/assets/dashboard-excel-hr-orange.png";

// AI / data-science project visuals
import imgChurn from "@/assets/project-churn-streamlit.jpg";
import imgUkAccidents from "@/assets/project-uk-accidents.jpg";
import imgStudentStats from "@/assets/project-student-stats.jpg";
import imgPasswordTool from "@/assets/project-password-tool.jpg";
import imgBert from "@/assets/project-bert-sentiment.jpg";
import imgYolo from "@/assets/project-yolo-detection.jpg";
import imgSegmentation from "@/assets/project-segmentation.jpg";
import imgSalesForecast from "@/assets/project-sales-forecast.jpg";
import imgIntrusion from "@/assets/project-intrusion-detection.jpg";
import imgResume from "@/assets/project-resume-nlp.jpg";

const LINKEDIN_URL = "https://www.linkedin.com/in/Mohamed-Khaled-El-Shayp-b50385234";
const GITHUB_URL = "https://github.com/MohamedKhaledElShayp";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwagnpa"; // replace with your Formspree form id
const CALENDLY_URL = "https://calendly.com/mohamedkhaledmahmoud97/15min";

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
    period: "June 2025 — Present",
    role: "Professional Data Analyst",
    org: "Ministry of Communications & IT (MCIT)",
    location: "Cairo, Egypt",
    points: [
      "Leading 150+ data analytics projects across public-sector digital transformation initiatives.",
      "Designing executive KPI dashboards in Power BI for ministerial decision-making.",
      "Building ETL pipelines processing 50K+ records using SQL Server and Python.",
      "Advising on data governance and regulatory compliance leveraging legal background.",
    ],
  },
  {
    period: "Aug 2024 — Present",
    role: "Legal Operations Analyst",
    org: "Legal Experts Co.",
    location: "Cairo, Egypt",
    points: [
      "Bridging legal teams and data systems to streamline contract analytics workflows.",
      "Automated case-tracking dashboards using VBA and Power BI, cutting reporting time by 60%.",
      "Leading compliance audits aligned with international regulatory frameworks.",
    ],
  },
  {
    period: "Internship",
    role: "Credit Risk Intern",
    org: "National Bank of Egypt",
    location: "Cairo, Egypt",
    points: [
      "Performed AML screening and credit risk modeling on retail loan portfolios.",
      "Built Excel + SQL models to detect anomalies in transaction patterns.",
      "Contributed to risk reports presented to the senior credit committee.",
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
    title: "Sales Analytics",
    category: "Power BI",
    description: "End-to-end Power BI dashboard tracking revenue, regional performance, and product trends with drill-through analysis.",
    metric: "↑ 28% revenue insight",
    stack: ["Power BI", "DAX", "SQL", "Power Query"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    title: "Customer 360",
    category: "Power BI",
    description: "Unified customer view combining CRM, transactions, and support tickets for retention and upsell analysis.",
    metric: "360° customer profile",
    stack: ["Power BI", "SQL Server", "DAX", "Python"],
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    title: "Inventory Optimization",
    category: "Python Projects",
    description: "Forecasting + reorder-point model that reduces stock-outs while keeping holding costs under control.",
    metric: "↓ 22% holding cost",
    stack: ["Python", "Pandas", "Scikit-Learn", "SQL"],
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
    title: "Financial Reporting Automation",
    category: "Excel Dashboards",
    description: "VBA-powered Excel automation reducing monthly financial close from 5 days to 1 day.",
    metric: "↓ 80% close time",
    stack: ["Excel", "VBA", "Power Query"],
    gradient: "from-cyan-500/20 to-emerald-500/20",
  },
  {
    title: "Legal Compliance Tracker",
    category: "Power BI",
    description: "Regulatory compliance dashboard tracking case status, deadlines, and risk levels for legal operations.",
    metric: "100% deadline compliance",
    stack: ["Power BI", "SQL", "DAX"],
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
];

const portfolioFilters = ["All", "Power BI", "Excel Dashboards", "Python Projects"];

/* ---------- Featured Projects (AI / Data Science showcase) ---------- */

const featuredProject = {
  title: "Telco Customer Churn Prediction",
  description:
    "End-to-end ML pipeline to predict telecom customers at risk of churning using XGBoost and Random Forest, deployed as an interactive Streamlit application.",
  highlight:
    "Deployable churn prediction model enabling proactive retention strategies to protect telecom revenue.",
  tags: ["Python", "Machine Learning", "XGBoost", "Streamlit"],
  codeUrl: `${GITHUB_URL}?tab=repositories`,
  demoUrl: "#",
  metric: "↑ 87% AUC · production-ready",
  image: imgChurn,
};

const aiProjects = [
  // ---------- Real dashboards (Power BI / Excel / Orange) ----------
  {
    title: "Annual Sales Report — Power BI",
    description:
      "Power BI executive dashboard tracking 8.8K orders & 84M total revenue across products, sectors and accounts with year-over-year analysis.",
    tags: ["Power BI", "SQL", "Data Analysis", "EDA"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: dashPbiSales,
  },
  {
    title: "Sales Performance — Power BI (Dark)",
    description:
      "Dark-themed Power BI dashboard with KPI gauges, territory breakdowns, deal-size analysis and quantity-by-state visuals for $1.9M total sales.",
    tags: ["Power BI", "SQL", "Data Analysis"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: dashPbiDark,
  },
  {
    title: "Sales Analyze — Excel Dashboard",
    description:
      "Interactive Excel dashboard analyzing $2.29M in sales across categories, quarters and U.S. regions with slicers, donut charts and Top-10 product ranking.",
    tags: ["Python", "SQL", "Data Analysis", "EDA"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: dashExcelSales,
  },
  {
    title: "Strategic Growth Map — Excel BI",
    description:
      "Regional performance & shipping-mode analysis with discount impact, time-based trends and category-level breakdown across European markets.",
    tags: ["Python", "SQL", "Data Analysis"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: dashExcelStrategic,
  },
  {
    title: "Pizza Sales Performance Dashboard",
    description:
      "Excel BI dashboard tracking 479K pizza sales across sizes, products and time — including monthly trend, category mix and product-level KPIs.",
    tags: ["Python", "SQL", "Data Analysis", "EDA"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: dashExcelPizza,
  },
  {
    title: "Orange ML — Visual Workflow",
    description:
      "End-to-end Orange data-mining workflow combining file ingestion, feature statistics, scatter plot, sieve diagram and Python-script nodes for EDA.",
    tags: ["Machine Learning", "Data Analysis", "EDA", "Algorithms", "AI"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: dashOrangeWf,
  },
  {
    title: "HR Workforce Analytics — Excel",
    description:
      "Workforce dashboard for 300 employees: salary breakdown, gender split, country map (Saudi/Egypt/Iraq), department mix and hiring-date timeline.",
    tags: ["Python", "SQL", "Data Analysis"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: dashExcelHrMax,
  },
  {
    title: "HR Salary & Workforce Analytics",
    description:
      "Orange-themed Excel dashboard for HR analytics — total salary, average experience, payment-method mix and net-salary trend by hire year.",
    tags: ["Python", "SQL", "Data Analysis", "EDA"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: dashExcelHrOrange,
  },

  // ---------- AI / Data Science projects ----------
  {
    title: "UK Road Accident Severity Analysis",
    description:
      "Predictive ML model classifying accident severity using geospatial data, weather conditions and vehicle features, visualized on interactive Folium maps.",
    tags: ["Python", "Machine Learning", "Classification", "Data Analysis", "EDA"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: imgUkAccidents,
  },
  {
    title: "Student Performance Statistical Analysis",
    description:
      "Statistical investigation of factors driving student outcomes — combining SPSS hypothesis testing with Python EDA & visualization.",
    tags: ["Python", "Data Analysis", "EDA", "SQL"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: imgStudentStats,
  },
  {
    title: "Random Password Maker & Strength Checker",
    description:
      "ML-based password security tool that generates strong passwords and predicts strength using a trained classifier.",
    tags: ["Python", "Machine Learning", "Cybersecurity", "Algorithms"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: imgPasswordTool,
  },
  {
    title: "Sentiment Analysis with BERT",
    description:
      "Fine-tuned BERT transformer for product review sentiment classification, deployed via FastAPI with batch + streaming inference.",
    tags: ["Python", "Deep Learning", "NLP", "BERT", "TensorFlow"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: imgBert,
  },
  {
    title: "Real-Time Object Detection",
    description:
      "Computer Vision pipeline using OpenCV + YOLO for real-time object detection in retail surveillance footage.",
    tags: ["Python", "Computer Vision", "Deep Learning", "OpenCV", "AI"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: imgYolo,
  },
  {
    title: "Customer Segmentation (K-Means)",
    description:
      "Unsupervised clustering of e-commerce customers into actionable personas, with Streamlit dashboard for marketing teams.",
    tags: ["Python", "Machine Learning", "Algorithms", "Streamlit", "Data Analysis"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: imgSegmentation,
  },
  {
    title: "Sales Forecasting with XGBoost",
    description:
      "Gradient-boosted regression model for monthly sales forecasting with feature engineering on seasonality & promotions.",
    tags: ["Python", "Machine Learning", "XGBoost", "SQL"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: imgSalesForecast,
  },
  {
    title: "Network Intrusion Detection",
    description:
      "Cybersecurity classifier detecting anomalous network traffic patterns using ensemble methods on the NSL-KDD dataset.",
    tags: ["Python", "Machine Learning", "Cybersecurity", "Classification"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: imgIntrusion,
  },
  {
    title: "Resume Screening NLP",
    description:
      "NLP pipeline parsing and ranking resumes against job descriptions with TF-IDF + transformer embeddings.",
    tags: ["Python", "NLP", "Machine Learning", "AI"],
    codeUrl: `${GITHUB_URL}`,
    demoUrl: "#",
    image: imgResume,
  },
];

const allProjectTags = [
  "AI", "Algorithms", "BERT", "Classification", "Computer Vision", "Cybersecurity",
  "Data Analysis", "Deep Learning", "EDA", "Excel Dashboards", "Machine Learning",
  "NLP", "OpenCV", "Power BI", "Python", "SQL", "Streamlit", "TensorFlow", "XGBoost",
];
const PROJECTS_PER_PAGE = 6;

const education = [
  {
    icon: HiSparkles,
    title: "Specialized Diploma in Applied AI",
    org: "Military Technical College (MTC)",
    period: "2026",
    note: "Applied AI & Machine Learning specialization.",
  },
  {
    icon: HiScale,
    title: "Master of International Law (LL.M)",
    org: "Cairo University — Faculty of Law",
    period: "2025",
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
  { title: "Specialized Diploma in Applied AI", issuer: "Military Technical College — 2026", icon: HiSparkles, color: "emerald" },
  { title: "Master of International Law (LL.M)", issuer: "Cairo University — 2025", icon: HiScale, color: "cyan" },
  { title: "Power BI Data Analyst Specialist", issuer: "Microsoft", icon: FaMicrosoft, color: "cyan" },
  { title: "Google Data Analytics Certificate", issuer: "Google / Coursera", icon: FaGoogle, color: "emerald" },
  { title: "IBM Quality Work Recognition", issuer: "IBM", icon: HiBadgeCheck, color: "cyan" },
  { title: "Microsoft SQL Server", issuer: "Microsoft", icon: SiPostgresql, color: "emerald" },
  { title: "CS50: Introduction to Computer Science", issuer: "Harvard University", icon: HiAcademicCap, color: "cyan" },
  { title: "Bachelor of Sharia & Law", issuer: "Al-Azhar University — 2019", icon: FaUniversity, color: "emerald" },
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
        <Offer />
        <About />
        <Skills />
        <Experience />
        <PortfolioSection />
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
   THEME TOGGLE
   ============================================================ */

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as "dark" | "light" | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("light", initial === "light");
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("light", next === "light");
    document.documentElement.classList.toggle("dark", next === "dark");
  };
  return { theme, toggle };
}

/* ============================================================
   NAV
   ============================================================ */

function Nav() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
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
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-lg glass text-foreground transition hover:bg-white/5"
            >
              {theme === "dark" ? <HiSun /> : <HiMoon />}
            </button>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald to-cyan px-4 py-2 text-sm font-semibold text-background shadow-[0_0_25px_-5px] shadow-emerald transition-opacity hover:opacity-90 md:inline-flex"
            >
              Book Free Call <HiArrowRight />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="rounded-lg p-2 text-foreground md:hidden"
              aria-label="Toggle menu"
            >
              <HiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          </div>
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
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
              </span>
              <span className="text-foreground">Available For Opportunities</span>
            </div>
            <p className="mb-2 text-base font-medium text-muted-foreground md:text-lg">Hi! I'm</p>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Mohamed Khaled <span className="text-gradient">El-Shayp</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              I'm a <span className="text-foreground font-semibold">Data Scientist & Applied AI Specialist</span>. I design predictive models and intelligent data pipelines that
              <span className="text-emerald font-medium"> cut costs</span>,
              <span className="text-cyan font-medium"> drive revenue</span>, and
              <span className="text-foreground font-medium"> scale businesses</span>.
            </p>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              I help in analyzing data, proposing solutions to improve sales productivity, and organizing workflows within the company.
            </p>

            {/* social row */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <a href="mailto:mohamedkhaledmahmoud97@gmail.com" aria-label="Email" className="glass grid h-10 w-10 place-items-center rounded-xl text-emerald hover:bg-white/5">
                <HiMail />
              </a>
              <a href="tel:+201000525308" aria-label="Phone" className="glass grid h-10 w-10 place-items-center rounded-xl text-cyan hover:bg-white/5">
                <HiPhone />
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid h-10 w-10 place-items-center rounded-xl text-cyan hover:bg-white/5">
                <FaLinkedin />
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass grid h-10 w-10 place-items-center rounded-xl hover:bg-white/5">
                <FaGithub />
              </a>
            </div>

            {/* floating badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: "50+ AI Models", icon: HiSparkles, c: "emerald" },
                { label: "30+ Projects", icon: HiBriefcase, c: "cyan" },
                { label: "LL.M International Law", icon: HiScale, c: "cyan" },
                { label: "UN COP27 Leader", icon: HiGlobe, c: "emerald" },
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
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex animate-pulse-glow items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-cyan px-7 py-3.5 text-sm font-semibold text-background shadow-[0_0_40px_-5px] shadow-emerald transition-transform hover:scale-[1.04]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 transition-transform duration-700 group-hover:translate-x-full" />
                <HiSparkles /> Hire Me <HiArrowRight />
              </a>
              <a
                href="https://drive.google.com/file/d/102oU9OtEmzdAWFfDvgo3jUAS7pNVdIAI/view?usp=drive_web"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackCvDownload}
                aria-label="Download Mohamed Khaled Mahmoud CV (PDF)"
                title="Download Mohamed Khaled Mahmoud CV (PDF)"
                className="inline-flex items-center gap-2 rounded-xl glass-strong border border-glass-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/5"
              >
                <HiDocumentDownload /> Download CV
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-xl glass border border-glass-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/5"
              >
                <HiCursorClick /> Explore Work
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
            {/* glowing tech aura */}
            <div className="absolute -inset-10 rounded-full bg-gradient-to-br from-emerald/30 via-cyan/30 to-violet/30 blur-3xl animate-pulse" />
            {/* orbiting nodes */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald shadow-[0_0_15px] shadow-emerald" />
              <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_15px] shadow-cyan" />
              <span className="absolute left-1/2 bottom-0 h-2 w-2 -translate-x-1/2 rounded-full bg-violet shadow-[0_0_15px] shadow-violet" />
              <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald shadow-[0_0_15px] shadow-emerald" />
            </motion.div>

            <div className="relative h-72 w-72 overflow-hidden rounded-full border-2 border-emerald/40 glass-strong glow-emerald sm:h-80 sm:w-80 md:h-96 md:w-96 animate-float">
              <img
                src={mohamedImg}
                alt="Mohamed Khaled Mahmoud — Data Scientist"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>

            {/* floating stat cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -left-2 top-6 glass-strong rounded-xl px-3 py-2 text-xs shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald/20">
                  <HiSparkles className="text-emerald" />
                </div>
                <div>
                  <div className="font-bold text-foreground">50+ Models</div>
                  <div className="text-[10px] text-muted-foreground">AI / ML deployed</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-4 top-1/3 glass-strong rounded-xl px-3 py-2 text-xs shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-lg bg-cyan/20">
                  <HiBriefcase className="text-cyan" />
                </div>
                <div>
                  <div className="font-bold text-foreground">30+ Projects</div>
                  <div className="text-[10px] text-muted-foreground">Production-ready</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity }}
              className="absolute -right-2 bottom-10 glass-strong rounded-xl px-3 py-2 text-xs shadow-xl"
            >
              <div className="flex items-center gap-1.5"><HiTrendingUp className="text-violet" /> ROI-driven</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity }}
              className="absolute -left-4 bottom-16 glass-strong rounded-xl px-3 py-2 text-xs shadow-xl"
            >
              <div className="flex items-center gap-1.5"><HiChartBar className="text-cyan" /> Power BI · Python</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   OFFER & LEAD MAGNET
   ============================================================ */

function Offer() {
  const offers = [
    {
      icon: HiSparkles,
      title: "Predictive ML Models",
      desc: "Forecast churn, demand, and revenue with production-grade machine learning models tailored to your data.",
      color: "emerald",
    },
    {
      icon: HiCog,
      title: "Automate Decisions",
      desc: "Replace manual reporting and decision-making with AI agents and automated pipelines that work 24/7.",
      color: "cyan",
    },
    {
      icon: HiTrendingUp,
      title: "Hidden Opportunities",
      desc: "Uncover patterns, customer segments, and revenue streams hiding in your existing data.",
      color: "violet",
    },
  ];
  return (
    <section id="offer" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="What I Do"
          title="🚀 What I Can Do For You"
          sub="AI systems built around your business goals — measurable, scalable, and tailored to your industry."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {offers.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-opacity bg-${o.color}/20`} />
              <div className="relative">
                <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br border border-glass-border ${
                  o.color === "emerald" ? "from-emerald/20 to-cyan/10" :
                  o.color === "cyan" ? "from-cyan/20 to-violet/10" : "from-violet/20 to-cyan/10"
                }`}>
                  <o.icon className={
                    o.color === "emerald" ? "text-emerald h-6 w-6" :
                    o.color === "cyan" ? "text-cyan h-6 w-6" : "text-violet h-6 w-6"
                  } />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lead magnet — Free Strategy Call */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 relative overflow-hidden rounded-2xl glass-strong border border-emerald/30 p-8 md:p-10"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald/10 px-3 py-1 text-xs font-semibold text-emerald">
                <HiSparkles /> START HERE
              </div>
              <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                💼 Free 15-Min <span className="text-gradient">Strategy Call</span>
              </h3>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Not sure what to do with your data? I'll analyze your case and give you a clear,
                actionable plan — no obligation, no fluff.
              </p>
            </div>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-cyan px-6 py-3.5 text-sm font-bold text-background shadow-[0_0_30px_-5px] shadow-emerald transition-transform hover:scale-105"
            >
              <HiCalendar /> Book Free Call <HiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
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

function PortfolioSection() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const totalProjects = aiProjects.length + 1; // include featured

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return aiProjects.filter((p) => {
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesSearch;
    });
  }, [activeTag, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PROJECTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PROJECTS_PER_PAGE, safePage * PROJECTS_PER_PAGE);

  // reset page when filter/search changes
  useEffect(() => { setPage(1); }, [activeTag, search]);

  return (
    <section id="portfolio" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col items-center text-center"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald">
            Portfolio
          </div>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A showcase of production-ready dashboards, AI applications, predictive
            models and data-driven solutions — built with Power BI, Excel, Orange and Python.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-semibold">
              <HiSparkles className="text-emerald" /> {totalProjects} Projects
            </span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-semibold hover:bg-white/5"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-5">
          <HiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, description, or tags..."
            className="w-full rounded-xl glass border border-glass-border py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-emerald/60"
          />
        </div>

        {/* Tag chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              !activeTag
                ? "bg-gradient-to-r from-emerald to-cyan text-background shadow-[0_0_15px_-5px] shadow-emerald"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {allProjectTags.map((t) => {
            const active = activeTag === t;
            return (
              <button
                key={t}
                onClick={() => setActiveTag(active ? null : t)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-emerald to-cyan text-background shadow-[0_0_15px_-5px] shadow-emerald"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Featured large card */}
        {(!activeTag || featuredProject.tags.includes(activeTag)) &&
         (!search.trim() || [featuredProject.title, featuredProject.description, ...featuredProject.tags].join(" ").toLowerCase().includes(search.trim().toLowerCase())) && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative mb-8 overflow-hidden rounded-2xl glass-strong border border-emerald/30 p-0"
          >
            <div className="grid md:grid-cols-2">
              {/* visual */}
              <div className="relative min-h-[260px] overflow-hidden bg-gradient-to-br from-emerald/10 via-cyan/5 to-violet/10">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  loading="lazy"
                  width={1280}
                  height={768}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald/90 px-3 py-1 text-xs font-bold text-background backdrop-blur">
                  <HiSparkles /> FEATURED PROJECT
                </div>
              </div>
              {/* content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold md:text-2xl">{featuredProject.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{featuredProject.description}</p>
                <div className="mt-4 rounded-xl border border-emerald/30 bg-emerald/5 p-3 text-sm">
                  <div className="flex gap-2">
                    <HiLightningBolt className="mt-0.5 shrink-0 text-emerald" />
                    <span className="text-foreground/90">{featuredProject.highlight}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {featuredProject.tags.map((t) => (
                    <span key={t} className="rounded-md border border-emerald/30 bg-emerald/10 px-2 py-0.5 text-[11px] font-medium text-emerald">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={featuredProject.codeUrl} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg glass border border-glass-border px-4 py-2 text-sm font-semibold hover:bg-white/5">
                    <FaGithub /> View Code
                  </a>
                  <a href={featuredProject.demoUrl} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald to-cyan px-4 py-2 text-sm font-semibold text-background hover:opacity-90">
                    <HiExternalLink /> View Dashboard
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTag ?? "all"}-${search}-${safePage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {paginated.map((p, idx) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileHover={{ y: -4 }}
                className="group glass overflow-hidden rounded-2xl flex flex-col"
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-emerald/15 via-cyan/10 to-violet/15">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={768}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold transition-colors group-hover:text-emerald">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-md border border-glass-border bg-white/[0.03] px-2 py-0.5 text-[11px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 flex gap-2">
                    <a href={p.codeUrl} target="_blank" rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg glass border border-glass-border px-3 py-2 text-xs font-semibold hover:bg-white/5">
                      <FaGithub /> View Code
                    </a>
                    <a href={p.demoUrl} target="_blank" rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald to-cyan px-3 py-2 text-xs font-semibold text-background hover:opacity-90">
                      <HiExternalLink /> Dashboard
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl glass p-10 text-center">
            <HiSearch className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-sm text-muted-foreground">
              No projects match your search. Try clearing filters or a different keyword.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              Showing {paginated.length} of {filtered.length} projects — Page {safePage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="inline-flex items-center gap-1 rounded-lg glass border border-glass-border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/5"
              >
                <HiChevronLeft /> Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === safePage;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-semibold transition ${
                      active
                        ? "bg-gradient-to-r from-emerald to-cyan text-background shadow-[0_0_15px_-5px] shadow-emerald"
                        : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="inline-flex items-center gap-1 rounded-lg glass border border-glass-border px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white/5"
              >
                Next <HiChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* End-of-section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 relative overflow-hidden rounded-2xl glass-strong border border-violet/30 p-8 text-center"
        >
          <div className="absolute -top-20 left-1/2 h-40 w-80 -translate-x-1/2 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <h3 className="text-2xl font-bold md:text-3xl">
              Want similar results <span className="text-gradient">for your business?</span>
            </h3>
            <p className="mt-2 text-muted-foreground">
              Let's build a custom AI solution tailored to your needs.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald via-cyan to-violet px-6 py-3 text-sm font-bold text-background shadow-[0_0_30px_-5px] shadow-violet transition-transform hover:scale-105"
            >
              <HiSparkles /> Start Your Project <HiArrowRight />
            </a>
          </div>
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
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim() || form.name.length > 100) e.name = "Please enter your name (max 100 chars)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || form.email.length > 255) e.email = "Please enter a valid email";
    if (!form.message.trim() || form.message.length > 1000) e.message = "Message is required (max 1000 chars)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "lead_submit", { event_category: "contact" });
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          eyebrow="Contact"
          title="Let's build your AI advantage"
          sub="Tell me about your project — I reply within 24 hours."
        />
        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong relative overflow-hidden rounded-2xl p-6"
          >
            <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-emerald/20 blur-3xl" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald to-cyan text-background">
                <HiMail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Get in touch</h3>
              <p className="mt-1 text-sm text-muted-foreground">Reply within 24 hours · Cairo, Egypt · Serving KSA & MENA</p>
              <div className="mt-5 space-y-2.5">
                <a href="mailto:mohamedkhaledmahmoud97@gmail.com" className="glass flex items-center gap-3 rounded-xl p-3 hover:bg-white/5">
                  <HiMail className="text-emerald" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Email</div>
                    <div className="text-sm font-medium break-all">mohamedkhaledmahmoud97@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+201000525308" className="glass flex items-center gap-3 rounded-xl p-3 hover:bg-white/5">
                  <HiPhone className="text-cyan" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Phone</div>
                    <div className="text-sm font-medium">+20 100 052 5308</div>
                  </div>
                </a>
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald/15 to-cyan/15 border border-emerald/30 p-3 hover:from-emerald/25 hover:to-cyan/25">
                  <HiCalendar className="text-emerald" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-emerald">Free Strategy Call</div>
                    <div className="text-sm font-semibold">Book a 15-min slot →</div>
                  </div>
                </a>
              </div>
              <div className="mt-5 flex gap-2">
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="glass grid h-10 w-10 place-items-center rounded-xl hover:bg-white/5" aria-label="LinkedIn"><FaLinkedin className="text-cyan" /></a>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="glass grid h-10 w-10 place-items-center rounded-xl hover:bg-white/5" aria-label="GitHub"><FaGithub /></a>
                <a href="mailto:mohamedkhaledmahmoud97@gmail.com" className="glass grid h-10 w-10 place-items-center rounded-xl hover:bg-white/5" aria-label="Email"><HiMail className="text-emerald" /></a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            className="glass-strong rounded-2xl p-6"
            noValidate
          >
            <div className="grid gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</label>
                <input
                  type="text" value={form.name} maxLength={100}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1.5 w-full rounded-xl glass border border-glass-border px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/60"
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  type="email" value={form.email} maxLength={255}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1.5 w-full rounded-xl glass border border-glass-border px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/60"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  value={form.message} maxLength={1000} rows={5}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1.5 w-full rounded-xl glass border border-glass-border px-4 py-3 text-sm text-foreground outline-none focus:border-emerald/60 resize-none"
                  placeholder="Tell me about your project, data, or AI goals..."
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                <p className="mt-1 text-[10px] text-muted-foreground text-right">{form.message.length}/1000</p>
              </div>

              <button
                type="submit" disabled={status === "sending"}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-cyan px-6 py-3.5 text-sm font-bold text-background shadow-[0_0_30px_-5px] shadow-emerald hover:scale-[1.02] disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : (<><HiMail /> Send Message <HiArrowRight className="transition-transform group-hover:translate-x-1" /></>)}
              </button>

              {status === "success" && (
                <div className="rounded-xl border border-emerald/40 bg-emerald/10 p-3 text-sm text-emerald">
                  ✅ Thanks! Your message has been sent. I'll reply within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  Something went wrong. Please email me directly at mohamedkhaledmahmoud97@gmail.com.
                </div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer() {
  const year = 2026;
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];
  const services = [
    "Data Analytics & BI",
    "Power BI Dashboards",
    "Legal & Regulatory Insights",
    "Public Sector Digital Transformation",
    "SQL & Data Modeling",
    "AI-Powered Reporting",
  ];
  const socials = [
    { Icon: FaLinkedin, href: LINKEDIN_URL, label: "LinkedIn", color: "hover:text-cyan hover:border-cyan/60" },
    { Icon: FaGithub, href: GITHUB_URL, label: "GitHub", color: "hover:text-foreground hover:border-foreground/60" },
    { Icon: HiMail, href: "mailto:mohamedkhaledmahmoud97@gmail.com", label: "Email", color: "hover:text-emerald hover:border-emerald/60" },
    { Icon: HiPhone, href: "tel:+201000525308", label: "Phone", color: "hover:text-violet hover:border-violet/60" },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-glass-border bg-slate-950/60 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-glass-border bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-8 backdrop-blur-md md:flex-row md:items-center">
          <div>
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              Let's build something <span className="bg-gradient-to-r from-cyan via-emerald to-violet bg-clip-text text-transparent">data-driven</span>.
            </h3>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Available for consulting, dashboards & legal-data projects.
            </p>
          </div>
          <a
            href="mailto:mohamedkhaledmahmoud97@gmail.com"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-6 py-3 font-semibold text-background shadow-lg shadow-cyan/20 transition hover:shadow-violet/30"
          >
            Start a Project
            <HiArrowRight className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald to-cyan text-background text-sm font-bold shadow-lg shadow-emerald/20">
                MK
              </span>
              <div>
                <p className="font-bold leading-tight">Mohamed Khaled</p>
                <p className="text-xs text-muted-foreground">Data Analyst · Legal Insights</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Hybrid <span className="text-emerald">Legal + Data</span> profile delivering 150+ high-impact projects across public sector digital transformation.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs text-emerald">● Available for hire</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Navigate</h4>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="group inline-flex items-center gap-2 text-muted-foreground transition hover:text-cyan">
                    <span className="h-px w-3 bg-muted-foreground transition-all group-hover:w-5 group-hover:bg-cyan" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Services</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {services.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <HiCheckCircle className="mt-0.5 shrink-0 text-emerald" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Get in touch</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:mohamedkhaledmahmoud97@gmail.com" className="group flex items-start gap-3 text-muted-foreground hover:text-emerald">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-glass-border bg-slate-900/60 transition group-hover:border-emerald/40">
                    <HiMail />
                  </span>
                  <span className="break-all">mohamedkhaledmahmoud97@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+201000525308" className="group flex items-start gap-3 text-muted-foreground hover:text-violet">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-glass-border bg-slate-900/60 transition group-hover:border-violet/40">
                    <HiPhone />
                  </span>
                  <span>+20 100 052 5308</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-glass-border bg-slate-900/60">
                    <HiLocationMarker />
                  </span>
                  <span>Cairo, Egypt</span>
                </div>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  className={`grid h-10 w-10 place-items-center rounded-lg border border-glass-border bg-slate-900/60 text-muted-foreground transition ${s.color}`}
                >
                  <s.Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {year} Mohamed Khaled Mahmoud. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Crafted with <span className="text-emerald">data</span> · <span className="text-violet">design</span> · <span className="text-cyan">precision</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
