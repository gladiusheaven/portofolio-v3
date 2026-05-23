/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from 'motion/react';
import {
  Cpu,
  Brain,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Quote,
  BadgeCheck,
  Trophy,
  X,
  Monitor,
  Cloud,
  Menu,
  MapPin,
  Users,
  Workflow,
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Public assets are served under Vite's `base`, so prefix with BASE_URL.
const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;
const CV_URL = asset("CV_Putranto_Pratama_2026.pdf");

const NAV_LINKS = ['About', 'Expertise', 'Experience', 'Projects', 'Conversate', 'Testimonials', 'Contact'];

const scrollToId = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

// --- Shared primitives ---

const CountUp = ({ to, suffix = '', duration = 1.6 }: { to: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => `${Math.round(v).toLocaleString('en-US')}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [inView, to, duration]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || open ? 'glass py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#about" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-accent/10 border border-accent/20">
            <img
              src={asset('logo.png')}
              alt="Putranto Pratama logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-cream hidden sm:block">
            Putranto Pratama
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium uppercase tracking-widest">
          {NAV_LINKS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-accent transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" download className="hidden sm:block">
            <button className="px-5 py-2 border border-accent/30 rounded-full text-sm font-medium hover:bg-accent hover:text-bg-dark hover:border-accent transition-all">
              Download CV
            </button>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-cream/15 text-cream"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-cream/10 mt-4"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium uppercase tracking-widest text-cream/80 hover:text-accent transition-colors"
                >
                  {item}
                </a>
              ))}
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" download onClick={() => setOpen(false)}>
                <button className="mt-2 w-full px-5 py-3 bg-accent text-bg-dark rounded-full text-sm font-bold">
                  Download CV
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yPhoto = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);
  const [imgError, setImgError] = useState(false);

  const stats = [
    { to: 8, suffix: '+', label: 'Years experience' },
    { to: 3000, suffix: '+', label: 'Employees served' },
    { to: 10, suffix: '+', label: 'Apps shipped' },
    { to: 60, suffix: '%', label: 'Fewer HR tickets' },
  ];

  // Honors shown as pills below the tagline. `issuer` is optional and rendered muted.
  const achievements = [
    { label: '#1 Agent-a-thon · Build with Copilot Studio', issuer: 'Microsoft Indonesia' },
    { label: 'SATU Innovation Hub - Top 10 Impact Architect',  issuer: 'Indosat Ooredoo Hutchison' },
    { label: 'ACE Champions - Early adopter for AI (Emerging Tech)', issuer: 'Indosat Ooredoo Hutchison' }
  ];

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16">
      {/* Warm ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-clay/10 rounded-full blur-[130px] animate-pulse delay-700"></div>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* LEFT — identity + value */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Open to roles — Jakarta, ID · Malaysia · New Zealand · Australia · Remote
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-sm font-mono text-muted uppercase tracking-[0.25em] mb-5"
          >
            Putranto Pratama · Senior AI Solutions Engineer
          </motion.p>

          <div className="flex flex-wrap gap-2.5 mb-8">
            {achievements.map((a, i) => (
              <motion.span
                key={a.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className="group inline-flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full border border-accent/20 bg-accent/5 hover:border-accent/40 hover:bg-accent/10 transition-colors"
              >
                <Trophy className="w-3.5 h-3.5 text-accent flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-[11px] md:text-xs font-medium tracking-tight text-cream/85">
                  {a.label}
                </span>
                {a.issuer && (
                  <span className="text-[10px] md:text-[11px] font-mono text-muted whitespace-nowrap">
                    · {a.issuer}
                  </span>
                )}
              </motion.span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.02] tracking-tight mb-7 text-cream"
          >
            I turn complex enterprise HR workflows into AI that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-soft">
              actually ships.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-base md:text-lg text-cream/60 max-w-xl mb-10 font-light leading-relaxed"
          >
            7+ years merging HR domain expertise with enterprise-grade automation and application development,
            LangChain & LangGraph, RAG, SAP SuccessFactors, Power Platform, and scalable full-stack systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-5"
          >
            <button
              onClick={() => scrollToId('projects')}
              className="group relative px-8 py-4 bg-accent text-bg-dark font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                VIEW WORK <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <a href="https://wa.me/6281513357006" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-4 border border-cream/20 rounded-full font-bold hover:bg-cream/5 transition-all active:scale-95">
                LET'S TALK
              </button>
            </a>
          </motion.div>
        </div>

        {/* RIGHT — photo */}
        <motion.div
          style={{ y: yPhoto }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-5 batik-motif opacity-50 rounded-[3rem]"></div>
            <div className="absolute -inset-3 bg-gradient-to-tr from-accent/30 via-clay/20 to-transparent rounded-[3rem] blur-2xl"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-accent/30 ring-1 ring-cream/10 shadow-2xl aspect-[4/5] bg-card-bg">
              {!imgError ? (
                <img
                  src={asset('profile.jpg')}
                  alt="Putranto Pratama"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-card-bg to-bg-dark text-center px-6">
                  <span className="font-display font-bold text-7xl text-accent">PP</span>
                  <span className="mt-4 text-[10px] font-mono text-muted uppercase tracking-widest leading-relaxed">
                    Add your headshot at<br />/public/profile.jpg
                  </span>
                </div>
              )}
            </div>
            {/* Floating credential badge */}
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-5 py-3 border border-accent/20 shadow-xl">
              <p className="text-[9px] font-mono text-bold uppercase tracking-widest">CHRP Certified</p>
              <p className="text-sm font-display font-bold text-cream">AI, Custom Dev Apps and HR Systems</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-14 lg:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden glass border border-accent/10">
          {stats.map((s) => (
            <div key={s.label} className="p-6 md:p-8 text-center bg-cream/[0.015]">
              <div className="text-3xl md:text-5xl font-display font-bold text-cream">
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-[10px] md:text-xs font-mono text-muted uppercase tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  const skills = ["GEN. AI", "COPILOT STUDIO", "AZURE AI FOUNDRY",  "LANGGRAPH", "HYBRID CLOUD", "SOLUTIONS DESIGN", "PYTHON", "RAG", "DATA ENGINEERING", "SYSTEMS DESIGN", "AI STRATEGY", "LANGCHAIN", "LARAVEL", "ETL"];

  return (
    <div className="py-10 border-y border-cream/5 bg-cream/[0.02] overflow-hidden whitespace-nowrap group">
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {skills.map((skill, idx) => (
              <motion.span
                key={`${skill}-${i}-${idx}`}
                whileHover={{
                  scale: 1.1,
                  color: "var(--color-accent)",
                  textShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                }}
                className="text-4xl md:text-6xl font-display font-black text-cream/10 transition-colors cursor-pointer inline-block"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Expertise = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Three primary domains — detail content merged from the prior expertise areas.
  const cards = [
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "HR Systems",
      desc: "People-systems at enterprise scale — SAP SuccessFactors, 9+ custom HR apps, and HR-Tech integrations serving 3,000+ employees.",
      details: "CHRP-certified with deep HR domain expertise. I've implemented SAP SuccessFactors across 6 modules and built 9 end-to-end HR systems (MyTalent, HROne, NEO, TalentReview…) for 3,000+ employees — bridging people-process needs with resilient, maintainable engineering for regulated enterprise functions."
    },
    {
      icon: <Workflow className="w-8 h-8 text-purple-400" />,
      title: "Apps & Automation",
      desc: "Full-stack apps and hyperautomation — React, Node, Laravel & Python, Microsoft Power Platform, RPA, and the cloud they run on.",
      details: "My engineering baseline: 7+ years building high-performance, end-to-end web and mobile apps with scalable architectures (React, Node.js, Laravel, Python). I turn complex business processes into automated workflows via Power Platform and RPA, running on multi-cloud infrastructure (Azure, GCP, AWS) tuned for availability and cost."
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: "AI & LLM",
      desc: "Agentic AI and GenAI for the enterprise — RAG pipelines, LangChain / LangGraph agents, and fine-tuned LLMs that reason and act.",
      details: "I bridge raw data and intelligent action: production RAG (Retrieval-Augmented Generation) pipelines, domain-tuned LLMs, and agentic workflows built with LangChain and LangGraph that reason and act autonomously — deployed on Azure AI Foundry and Copilot Studio for enterprise scale."
    }
  ];

  return (
    <section id="expertise" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 -right-24 w-[34rem] h-[34rem] bg-accent/5 rounded-full blur-[150px]"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">01 / Expertise</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight text-cream">
              SOLVING COMPLEX PROBLEMS <br />
              <span className="italic text-white/40">WITH MARVELOUS SOLUTIONS.</span>
            </h3>
          </div>
          <p className="text-muted max-w-sm font-light">
            My approach combines deep technical knowledge with a strategic mindset to deliver impactful AI-driven solutions.
          </p>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, idx) => {
            const isSelected = selectedIdx === idx;
            const isAnySelected = selectedIdx !== null;

            return (
              <motion.div
                key={idx}
                layout
                initial={false}
                onClick={() => setSelectedIdx(isSelected ? null : idx)}
                className={`
                  p-8 md:p-10 rounded-[2.5rem] glass group transition-all cursor-pointer relative overflow-hidden flex flex-col
                  ${isSelected ? 'lg:col-span-2 lg:row-span-2 bg-accent/5 border-accent/30 ring-1 ring-accent/20 z-20' : 'z-10'}
                  ${isAnySelected && !isSelected ? 'scale-95 opacity-20 blur-[2px] pointer-events-none' : ''}
                `}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedIdx(null);
                      }}
                      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream/5 flex items-center justify-center hover:bg-cream/10 transition-colors z-30 border border-cream/10"
                    >
                      <X className="w-5 h-5 text-cream" />
                    </motion.button>
                  )}
                </AnimatePresence>

                <motion.div
                  layout
                  className={`mb-8 p-5 rounded-2xl w-fit transition-colors ${isSelected ? 'bg-accent text-bg-dark' : 'bg-cream/5 group-hover:bg-accent/20'}`}
                >
                  {card.icon}
                </motion.div>

                <motion.h4
                  layout
                  className={`font-display font-bold mb-6 transition-all ${isSelected ? 'text-3xl md:text-5xl text-cream' : 'text-xl text-cream'}`}
                >
                  {card.title}
                </motion.h4>

                <motion.p
                  layout
                  className={`text-cream/60 leading-relaxed font-light transition-all ${isSelected ? 'text-lg md:text-xl mb-10' : 'text-sm'}`}
                >
                  {isSelected ? card.details : card.desc}
                </motion.p>

                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-3 mt-auto pt-8 border-t border-cream/5"
                  >
                    {['Scalable Systems', 'Enterprise Ready', 'Modern Stack', 'AI-First'].map(tag => (
                      <span key={tag} className="px-5 py-2.5 rounded-full bg-cream/5 border border-cream/10 text-[10px] font-mono uppercase tracking-widest text-muted">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {!isAnySelected && (
                  <div className="mt-8 flex items-center gap-2 text-xs font-mono text-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    EXPLORE CAPABILITIES <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  const roles = [
    {
  period: "2019 — Present",
  org: "Indosat Ooredoo Hutchison",
  role: "Sr. Officer, Application Management · Officer, HRIS & Solution",
  points: [
    "Architected ASTRID-AI — enterprise agentic HR platform (LangChain, LangGraph, RAG, A2A) integrated with Microsoft Teams & SAP SuccessFactors; reduced helpdesk volume by 60% and SLA from 30 min → 3 min across 3,000+ employees",
    "Delivered measurable ROI: overtime cost cut 54% (CICO-validated in one quarter); medical check-up processing compressed from 3 days → 5 min",
    "Ranked #23 of ~3,000 employees in Indosat's 2025 AI Adoption Challenge (Ace Champions); awarded Top 10 High-Impact Architect in internal innovation competition",
    "Shipped 9 end-to-end HR products (MyTalent, HROne, NEO, TalentReview…) on Power Platform + Azure AI Foundry; currently scaling ASTRID-AI into Voice and Legal/Regulatory/Data Privacy domains",
    "Implemented SAP SuccessFactors across 6 modules; spearheaded Power Platform adoption as internal AI capability foundation",
  ],
},
{
  period: "2019",
  org: "Lintas Media Danawa (eBesha)",
  role: "Full-stack Developer",
  points: [
    "Delivered production Contact Center system for Bank BPD Riau — APIs, dashboards, and CRM modules from scratch to live",
    "Maintained 99.9% uptime across all deployed systems",
    "Built full-stack web applications across fintech and enterprise clients",
  ],
},
{
  period: "2018 — 2019",
  org: "Internux (BOLT!)",
  role: "Enterprise System Developer",
  points: [
    "Built Finance Refund System & public-facing Online Refund Portal used by BOLT! subscribers nationwide",
    "Integrated payment gateway APIs; compressed refund processing cycle from days to minutes",
    "Delivered financial-grade systems under telco-scale compliance requirements",
  ],
},
{
  period: "2017 — 2018",
  org: "Indosat Ooredoo",
  role: "Oracle Database Support",
  points: [
    "Managed and queried datasets up to 4 million rows on Oracle DB in a live telco environment",
    "Reduced reporting turnaround 50% by building automated dashboards for business stakeholders",
  ],
},
{
  period: "2017",
  org: "Mitra Akses Globalindo (MAGnet)",
  role: "System Administrator (Intern)",
  points: [
    "Engineered OAuth-based hotspot login portal (Facebook / Twitter SSO) from zero",
    "Administered MikroTik / Linux / Windows infrastructure; implemented Mobile Device Management (MDM)",
  ],
},
{
  period: "Where it started",
  org: "Freelance · Jobfitasia.com & Gapku.id",
  role: "Fullstack Developer · UI/UX Designer",
  points: [
    "Independently built a full job portal and Applicant Tracking System (ATS) for Jobfitasia.com — end-to-end, solo",
    "Designed end-to-end UI/UX for Gapku.id; first exposure to HR-tech that would define the next 8 years of career focus",
  ],
},
  ];

  return (
    <section id="experience" className="py-32 px-6 bg-cream/[0.01]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">02 / Experience</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight text-cream">
            A DECADE OF <br />
            <span className="italic text-white/40">SHIPPING IN PRODUCTION.</span>
          </h3>
        </div>

        <div className="relative border-l border-cream/10 pl-8 md:pl-12 ml-2 space-y-12">
          {roles.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-[2.1rem] md:-left-[3.1rem] top-1.5 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-bg-dark"></span>
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">{e.period}</p>
              <h4 className="text-xl md:text-2xl font-display font-bold text-cream">{e.org}</h4>
              <p className="text-sm text-muted mb-4">{e.role}</p>
              <ul className="space-y-2">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-cream/70 font-light leading-relaxed">
                    <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('All');

  const DOMAINS = ['All', 'HR Systems', 'Apps & Automation', 'AI & LLM'];

  // Gallery scrolls horizontally — add as many projects as you like here.
  // `domain` controls which filter tab a project shows under.
  const projects = [
    {
      title: "ASTRIDAI",
      url: "https://www.dropbox.com/scl/fi/dnwi9gdddh7p0bzdvnjcd/ASTRID-Vid-VO.mp4?rlkey=lu9lr6yifvawpga8ykiwlqow7&st=fdn6civz&dl=0",
      category: "AI AGENT & MULTI PLATFORM AUTOMATION",
      domain: "AI & LLM",
      image: asset("astrid.png"),
      desc: "AI-powered employee self-service chatbot with 90%++ accuracy. She listens all the data 'whispering' to her and create the recommended action to the human.",
      tags: ["AI", "RAG", "PYTHON", "LANGCHAIN", "COPILOT STUDIO"]
    },
    {
      title: "MCU REG. PROCESS",
      url: "https://drive.google.com/file/d/1crYO5E8xkxFjomuScYaCbrydsgDYbnv5/view?usp=sharing",
      category: "MCP AGENTIC",
      domain: "Apps & Automation",
      image: asset("mcu.png"),
      desc: "Reduced MCU administrative turnaround by 99% (3 days to < 5 minutes) by using Workflow automation and applied MCP. GenAI is taking the lead in orchestrating the entire process.",
      tags: ["AUTOMATION", "POWER PLATFORM", "RAG", "UIPATH"]
    },
    {
      title: "ENTERPRISE CRM (EBESHA)",
      url: "https://ebesha.net",
      category: "FULL-STACK APPDEV",
      domain: "Apps & Automation",
      image: asset("ebesha.avif"),
      desc: "Custom CRM product for contact center management with PSTN trunking and mail server integration. Proactively contributed in Bank BPD Riau Implementation (2019).",
      tags: ["FULL-STACK", "LARAVEL", "TYPESCRIPT", "PYTHON"]
    }
    // Add more: { title, url, category, domain, image: asset("yourfile.png"), desc, tags: [...] }
  ];

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.domain === filter);

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [filter]);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 32 /* gap-8 */ : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="py-32 px-6 bg-cream/[0.01] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 -left-24 w-[34rem] h-[34rem] bg-accent/5 rounded-full blur-[150px]"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">03 / Selected Work</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight text-cream">
              ARCHITECTING <br />
              <span className="italic text-white/40">IMPACTFUL SYSTEMS.</span>
            </h3>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => scrollByCards(-1)}
              aria-label="Previous projects"
              className="w-14 h-14 rounded-full border border-cream/10 flex items-center justify-center hover:bg-accent hover:text-bg-dark transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              aria-label="Next projects"
              className="w-14 h-14 rounded-full border border-cream/10 flex items-center justify-center hover:bg-accent hover:text-bg-dark transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Domain filter tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {DOMAINS.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all ${
                filter === d
                  ? 'bg-accent text-bg-dark font-bold'
                  : 'border border-cream/15 text-cream/60 hover:text-cream hover:border-cream/30'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div
          ref={trackRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-2 px-2"
        >
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              data-card
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="snap-start shrink-0 w-[82%] sm:w-[55%] lg:w-[31.5%]"
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-card-bg border border-cream/5">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-accent text-bg-dark text-[10px] font-bold rounded-full uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-cream font-bold tracking-widest text-sm">
                      VIEW PROJECT <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div>
                  <span className="inline-block mb-3 px-3 py-1 rounded-full border border-accent/30 text-accent text-[10px] font-mono uppercase tracking-widest">
                    {project.domain}
                  </span>
                  <h4 className="text-2xl font-display font-bold mb-3 text-cream group-hover:text-accent transition-colors">{project.title}</h4>
                  <p className="text-muted text-sm font-light leading-relaxed mb-6">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-cream/5 border border-cream/10 rounded-lg text-[10px] font-mono text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted font-mono text-sm uppercase tracking-widest">
            More {filter} work coming soon.
          </div>
        )}

        {filtered.length > 1 && (
          <p className="mt-6 text-[11px] font-mono text-muted uppercase tracking-widest">
            Drag / swipe → or use the arrows
          </p>
        )}
      </div>
    </section>
  );
};

// System persona for the AI twin (used by the direct/dev call; the production proxy holds its own copy).
const AI_SYSTEM_INSTRUCTION = `You are an assistant for Putranto Pratama, a Senior Solutions Architect with deep expertise in full-stack development, platform integration, and intelligent automation.
He have extensive professional experience across multiple roles:

1. PT Indosat Ooredoo Hutchison (October 2019 - Present)
  - Sr. Officer - Application Management
    - Led architecture and management of enterprise HR applications for 3,000+ employees
    - Reduced workflow turnaround time by 99% (3 days → under 5 minutes)
    - Implemented SAP SuccessFactors across 6 modules
    - Built AI chatbot (GPT-based) with ~89% accuracy
    - Established WhatsApp Business integration with high adoption

  - Officer - HRIS & Solution (September 2021 - Present)
    - Built 9 end-to-end HR systems (MyTalent, HROne, NEO, TalentReview, etc.)
    - Integrated LinkedIn Learning → increased learning activity by 30%
    - Automated HR processes (1 day → <10 minutes)
    - Developed QR verification system for compliance
    - Led HelpdeskHR chatbot reducing response time by 60%

2. PT Internux (BOLT!) (August 2018 - January 2019)
  - Enterprise System Developer
    - Built Finance Refund System and Online Refund Portal
    - Integrated payment gateway APIs
    - Reduced refund processing from days to minutes

3. PT Indosat Ooredoo (October 2017 - May 2018)
  - Oracle Database Support
    - Handled datasets up to 4 million rows
    - Built dashboards and automated reporting (50% faster)

4. PT Lintas Media Danawa (eBesha) (January 2019 - October 2019)
  - Full-stack Developer
    - Built APIs, dashboards, and CRM systems
    - Delivered Contact Center system for Bank BPD Riau
    - Maintained 99.9% uptime systems

5. PT Mitra Akses Globalindo (MAGnet) (August 2017 - October 2017)
  - System Administrator (Intern)
    - Built OAuth-based hotspot login (Facebook/Twitter)
    - Managed infrastructure (MikroTik, Linux, Windows Server)
    - Implemented MDM solution

6. Early Career
  - Freelance Fullstack Developer (Jobfitasia.com)
    - Built job portal and ATS system
  - UI/UX Designer (Gapku.id)

Core Skills:
- PHP, Python, JavaScript, Node.js
- Power Platform (Power Apps, Power Automate)
- SAP SuccessFactors, SAP Workzone
- REST/SOAP APIs
- SQL & NoSQL
- RPA, AI (RAG, Agentic)
- CI/CD, Cloud Computing

Key Strengths:
- Hyperautomation
- System Integration
- Software Architecture
- Custom App Development

Behavior:
- Always think in scalable, enterprise-grade solutions
- Focus on automation and efficiency
- Translate business problems into technical systems
- Provide practical, real-world implementation steps`;

const AITwin = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hi, I'm AldyraAI — Putranto's AI twin. Ask me anything about his expertise, projects, or how he can help your business." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const proxyUrl = import.meta.env.VITE_AI_PROXY_URL;
      let replyText = "I'm processing that request. Give me a moment.";

      if (proxyUrl) {
        // Production path: serverless proxy holds the API key server-side.
        const res = await fetch(proxyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg }),
        });
        if (!res.ok) throw new Error(`Proxy responded ${res.status}`);
        const data = await res.json();
        replyText = data.text || replyText;
      } else {
        // Dev/fallback path: direct call (key is exposed in the client bundle — see worker/README).
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const ai = new GoogleGenAI({ apiKey: apiKey || process.env.GEMINI_API_KEY || '' });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [
            {
              role: 'user',
              parts: [{ text: `Answer the following question as Putranto's assistant — professional, concise, friendly, slightly futuristic. LIMIT THE ANSWER TO MAX 3 SENTENCES.\n\nQuestion: ${userMsg}` }]
            }
          ],
          config: {
            systemInstruction: [{ text: AI_SYSTEM_INSTRUCTION }]
          }
        });
        replyText = response.text || replyText;
      }

      setMessages(prev => [...prev, { role: 'ai', text: replyText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm a bit fuzzy right now. Let's try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="conversate" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-cream/20">
              <Cpu className="w-8 h-8 text-bg-dark" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-2xl tracking-tighter text-cream">AldyraAI</h4>
              <p className="text-[10px] font-mono text-accent uppercase tracking-widest">My AI Twin</p>
            </div>
          </div>
          <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">04 / Conversate</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-cream">Know ME Further</h3>
        </div>

        <div className="glass rounded-[3rem] overflow-hidden flex flex-col h-[600px] border border-cream/10 shadow-2xl">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent text-bg-dark font-medium rounded-tr-none shadow-lg'
                    : 'bg-cream/5 text-cream/90 rounded-tl-none border border-cream/10 backdrop-blur-md'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-cream/5 p-5 rounded-3xl rounded-tl-none border border-cream/10 flex gap-1.5">
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-cream/[0.03] border-t border-cream/10">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my AI expertise..."
                className="w-full bg-cream/5 border border-cream/10 rounded-full py-5 px-8 pr-16 text-sm focus:outline-none focus:border-accent/50 transition-all placeholder:text-muted/60"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-12 h-12 bg-accent text-bg-dark rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-lg"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// One LinkedIn-style recommendation card. Falls back to an initials monogram
// when no avatar is available (e.g. a recommender with no public photo).
const TestimonialCard = ({
  t,
  index,
}: {
  t: {
    name: string;
    role: string;
    relationship: string;
    date: string;
    quote: string;
    avatar?: string;
    initials: string;
  };
  index: number;
}) => {
  const [imgError, setImgError] = useState(false);
  const showImage = t.avatar && !imgError;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] glass border border-cream/10 shadow-2xl overflow-hidden transition-colors hover:border-accent/30 hover:bg-accent/[0.03]"
    >
      {/* Hover glow */}
      <div className="absolute -top-24 -right-24 w-56 h-56 bg-accent/10 rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Decorative quote glyph */}
      <Quote className="w-12 h-12 text-accent/20 mb-6 transition-all duration-500 group-hover:text-accent/50 group-hover:scale-110 origin-top-left" />

      <blockquote className="relative z-10 flex-1 text-lg md:text-xl text-cream/90 font-light leading-relaxed mb-10">
        {t.quote}
      </blockquote>

      <figcaption className="relative z-10 flex items-center gap-4 pt-7 border-t border-cream/10">
        <div className="relative w-14 h-14 flex-shrink-0">
          {showImage ? (
            <img
              src={t.avatar}
              alt={t.name}
              onError={() => setImgError(true)}
              className="w-full h-full rounded-2xl object-cover border border-accent/20 shadow-lg"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full rounded-2xl flex items-center justify-center bg-gradient-to-br from-accent/25 to-clay/15 border border-accent/20 shadow-lg">
              <span className="font-display font-bold text-lg text-accent">{t.initials}</span>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-display font-bold text-base md:text-lg text-cream truncate">{t.name}</h4>
            <BadgeCheck className="w-4 h-4 text-accent flex-shrink-0" aria-label="Verified on LinkedIn" />
          </div>
          <p className="text-xs text-muted font-light leading-snug">{t.role}</p>
          <p className="mt-1 text-[10px] font-mono text-accent/70 uppercase tracking-wider">
            {t.date} · {t.relationship}
          </p>
        </div>
      </figcaption>
    </motion.figure>
  );
};

const Testimonials = () => {
  // Recommendations mirrored from LinkedIn. Add more here — the grid scales.
  const testimonials = [
    {
      name: "Dzikri Faza Hauna Kusnadi",
      role: "Data Scientist | Fullstack Developer",
      relationship: "Worked with Putranto on the same team",
      date: "Dec 2025",
      quote:
        "I highly recommend him as a leader who is capable of guiding his team well. While working under his management, I felt consistent support, structured guidance, and trust that encouraged me to continue to develop and take on greater responsibilities.",
      avatar: asset("testimonial-dzikri.jpg"),
      initials: "DF",
    },
    {
      name: "Kris Ambar Maryono",
      role: "IT Executive Staff at Takasago International Indonesia",
      relationship: "Worked with Putranto on the same team",
      date: "Jul 2018",
      quote: "FullStack Developer.",
      // No public LinkedIn photo — renders an initials monogram instead.
      avatar: undefined,
      initials: "KA",
    },
  ];

  return (
    <section id="testimonials" className="py-32 px-6 bg-cream/[0.01] overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[24rem] bg-accent/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">05 / Testimonials</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight text-cream">
              VOICES FROM <br />
              <span className="italic text-white/40">THEM.</span>
            </h3>
          </div>
          <a
            href="https://www.linkedin.com/in/putrantopratama/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-mono text-muted uppercase tracking-widest hover:text-accent transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            Recommendations on LinkedIn
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={t.name} t={t} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const stack = [
    { name: "Microsoft Fabric", logo: asset("logos/Fabric.png") },
    { name: "Azure AI Foundry", logo: asset("logos/AzureAI.png") },
    { name: "Google ADK", logo: asset("logos/ADKGoogle.png") },
    { name: "SAP SuccessFactors", logo: asset("logos/sap.svg") },
    { name: "Power Automate", logo: asset("logos/powerautomate.svg") },
    { name: "Power Apps", logo: asset("logos/PowerApps.png") },
    { name: "Laravel", logo: asset("logos/laravel.svg") },
    { name: "Python", logo: asset("logos/Python.png") },
    { name: "N8N", logo: asset("logos/N8N.png") },
    { name: "Azure", logo: asset("logos/azure.svg") },
    { name: "Google Cloud Platform", logo: asset("logos/GCP.svg") },
    { name: "Github", logo: asset("logos/github.png") },
    { name: "Gitlab", logo: asset("logos/gitlab.webp") },
    { name: "EntraID", logo: asset("logos/EntraID.png") },
    { name: "Docker", logo: asset("logos/docker.png") },
    { name: "Cloudflare", logo: asset("logos/Cloudflare.png") }
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* faint blue glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[20rem] bg-accent/5 rounded-full blur-[130px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <p className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-12"> Digital Stack I built with</p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10">
          {stack.map((t) => (
            <div
              key={t.name}
              className="group flex flex-col items-center gap-3 opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={t.logo}
                alt={t.name}
                className="h-9 md:h-11 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] md:text-[11px] font-mono text-muted uppercase tracking-widest group-hover:text-cream transition-colors">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-accent">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-bg-dark/10"></div>

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-sm font-mono text-bg-dark uppercase tracking-widest mb-8">06 / Contact</h2>

        <motion.div
          whileHover="hover"
          className="relative inline-block"
        >
          <motion.h3
            variants={{
              hover: { scale: 1.05, rotate: -1 }
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-8 text-bg-dark cursor-default select-none"
          >
            LET'S BUILD <br />
            <motion.span
              variants={{
                hover: { x: 20, color: "var(--color-cream)" }
              }}
              className="italic text-bg-dark/20 inline-block transition-colors"
            >
              SOMETHING GREAT.
            </motion.span>
          </motion.h3>
        </motion.div>

        <div className="flex items-center justify-center gap-2 text-bg-dark/60 text-sm font-mono mb-12">
          <MapPin className="w-4 h-4" /> Depok, Indonesia · open to Jakarta, Malaysia, New Zealand, Australia &amp; Remote
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          <a href="mailto:putranto.pratama.ptr@gmail.com" className="group flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full border border-bg-dark/10 flex items-center justify-center group-hover:bg-bg-dark group-hover:border-bg-dark transition-all duration-500">
              <Mail className="w-8 h-8 text-bg-dark group-hover:text-accent transition-colors" />
            </div>
            <span className="text-sm font-mono uppercase tracking-widest text-bg-dark/40 group-hover:text-bg-dark transition-colors">Email Me</span>
          </a>

          <a href="https://www.linkedin.com/in/putrantopratama/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full border border-bg-dark/10 flex items-center justify-center group-hover:bg-bg-dark group-hover:border-bg-dark transition-all duration-500">
              <Linkedin className="w-8 h-8 text-bg-dark group-hover:text-accent transition-colors" />
            </div>
            <span className="text-sm font-mono uppercase tracking-widest text-bg-dark/40 group-hover:text-bg-dark transition-colors">LinkedIn</span>
          </a>

          <a href="https://github.com/gladiusheaven" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full border border-bg-dark/10 flex items-center justify-center group-hover:bg-bg-dark group-hover:border-bg-dark transition-all duration-500">
              <Github className="w-8 h-8 text-bg-dark group-hover:text-accent transition-colors" />
            </div>
            <span className="text-sm font-mono uppercase tracking-widest text-bg-dark/40 group-hover:text-bg-dark transition-colors">GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-cream/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={asset('logo.png')}
              alt="Putranto Pratama logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs font-mono text-muted uppercase tracking-widest">© 2026 Putranto Pratama</span>
        </div>

        <div className="flex gap-8 text-[10px] font-mono text-muted uppercase tracking-[0.2em]">
          <span className="text-accent/60">Built with Heart</span>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <Expertise />
      <TechStack />
      <Experience />
      <Projects />
      <AITwin />
      <Testimonials />
      <Contact />
      <Footer />

      {/* Global subtle grain/texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.045] bg-grain"></div>
    </div>
  );
}
