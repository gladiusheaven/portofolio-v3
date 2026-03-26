/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Cpu, 
  Brain, 
  Network, 
  Code, 
  Layers, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Zap,
  Bot,
  Terminal,
  MessageSquare,
  X,
  Monitor,
  Database,
  Cloud,
  Server
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <span className="text-bg-dark font-display font-bold text-xl">P</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tighter hidden sm:block">PUTRANTO PRATAMA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          {['About', 'Expertise', 'Projects', 'Interactive', 'Testimonials', 'Contact'].map((item) => (
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

        <button className="px-5 py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white hover:text-bg-dark transition-all">
          RESUME
        </button>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-mono mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Ready, When You Are
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-6xl lg:text-7xl font-display font-bold leading-[0.9] tracking-tighter mb-8 text-cream"
        >
          Transforming Complex Enterprise Workflows <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-300">into High-Performance AI Ecosystems.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          Human-Centric AI Architect. Merging HR Domain Expertise with 
          Enterprise-Grade Automation and Scalable Full-Stack Systems.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <button className="group relative px-8 py-4 bg-accent text-bg-dark font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              VIEW PROJECTS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="px-8 py-4 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-all active:scale-95">
            LET'S TALK
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll to explore</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

const Marquee = () => {
  const skills = ["GEN AI", "LLM", "CLOUD ARCHITECTURE", "SOLUTIONS DESIGN", "MLOPS", "DATA ENGINEERING", "SYSTEMS DESIGN", "AI STRATEGY"];
  
  return (
    <div className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden whitespace-nowrap group">
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
                className="text-4xl md:text-6xl font-display font-black text-white/10 transition-colors cursor-pointer inline-block"
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

  const cards = [
    {
      icon: <Monitor className="w-8 h-8 text-accent" />,
      title: "Full-Stack & Solutions Architecture",
      desc: "My core baseline. Building high-performance, end-to-end web and mobile applications with robust, scalable architectures.",
      isBaseline: true,
      details: "With over 5+ years in full-stack development, I specialize in React, Node.js, and Python. I bridge the gap between business needs and technical reality, designing systems that are resilient, maintainable, and ready for future growth."
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: "AI & Machine Learning",
      desc: "Designing and implementing state-of-the-art LLM applications, RAG systems, and fine-tuned models for enterprise scale.",
      details: "I bridge the gap between raw data and intelligent action. My expertise includes building RAG (Retrieval-Augmented Generation) pipelines, fine-tuning LLMs for specific domains, and deploying agentic workflows that can reason and act autonomously."
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      title: "Enterprise Systems & Automation",
      desc: "Expertise in SAP SuccessFactors, Yellow.AI, and Microsoft Power Platform for enterprise-grade automation.",
      details: "I specialize in transforming complex business processes into streamlined automated workflows. From HR-Tech integrations with SAP SuccessFactors to conversational AI with Yellow.AI and low-code solutions via Power Platform, I deliver enterprise-grade efficiency."
    },
    {
      icon: <Cloud className="w-8 h-8 text-orange-400" />,
      title: "Cloud Infrastructure",
      desc: "Expertise in multi-cloud environments (AWS, GCP, Azure), focusing on high availability, performance, and cost optimization.",
      details: "Cloud is the playground for modern AI. I manage complex infrastructures using Terraform, Kubernetes, and serverless technologies. I ensure that your AI workloads are running on the most efficient and cost-effective cloud resources available."
    }
  ];

  return (
    <section id="expertise" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">01 / Expertise</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight text-cream">
              SOLVING COMPLEX PROBLEMS <br />
              <span className="text-white/40 italic">WITH ELEGANT SOLUTIONS.</span>
            </h3>
          </div>
          <p className="text-white/50 max-w-sm font-light">
            My approach combines deep technical knowledge with a strategic mindset to deliver impactful AI-driven solutions.
          </p>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                  ${card.isBaseline && !isSelected ? 'border-accent/30 bg-accent/5' : ''}
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
                      className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-30 border border-white/10"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.button>
                  )}
                </AnimatePresence>

                {card.isBaseline && !isSelected && (
                  <div className="absolute top-0 right-0 bg-accent text-bg-dark text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-tighter">
                    Baseline
                  </div>
                )}

                <motion.div 
                  layout 
                  className={`mb-8 p-5 rounded-2xl w-fit transition-colors ${card.isBaseline || isSelected ? 'bg-accent text-bg-dark' : 'bg-white/5 group-hover:bg-accent/20'}`}
                >
                  {card.icon}
                </motion.div>

                <motion.h4 
                  layout 
                  className={`font-display font-bold mb-6 transition-all ${isSelected ? 'text-3xl md:text-5xl text-cream' : 'text-xl text-white'}`}
                >
                  {card.title}
                </motion.h4>

                <motion.p 
                  layout 
                  className={`text-white/60 leading-relaxed font-light transition-all ${isSelected ? 'text-lg md:text-xl mb-10' : 'text-sm'}`}
                >
                  {isSelected ? card.details : card.desc}
                </motion.p>
                
                {isSelected && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-3 mt-auto pt-8 border-t border-white/5"
                  >
                    {['Scalable Systems', 'Enterprise Ready', 'Modern Stack', 'AI-First'].map(tag => (
                      <span key={tag} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/40">
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

const Projects = () => {
  const projects = [
    {
      title: "ASTRIDAI",
      category: "AI AGENT & MULTI PLATFORM AUTOMATION",
      image: "https://picsum.photos/seed/astrid-ai/800/600",
      desc: "AI-powered employee self-service chatbot with 90%++ accuracy. She listens all the data 'whispering' to her and create the recommended action to the human.",
      tags: ["AI", "RAG", "PYTHON", "LANGCHAIN", "COPILOT STUDIO"]
    },
    {
      title: "MCU REG. PROCESS",
      category: "MCP AGENTIC",
      image: "https://picsum.photos/seed/mcu-automation/800/600",
      desc: "Reduced MCU administrative turnaround by 99% (3 days to < 5 minutes) by using Workflow automation and applied MCP.",
      tags: ["AUTOMATION", "POWER PLATFORM", "RAG", "UIPATH"]
    },
    {
      title: "ENTERPRISE CRM (EBESHA)",
      category: "FULL-STACK APPDEV",
      image: "https://picsum.photos/seed/ebesha-crm/800/600",
      desc: "Custom CRM product for contact center management with PSTN trunking and mail server integration. Proactively contributed in Bank BPD Riau Implementation (2019).",
      tags: ["FULL-STACK", "LARAVEL", "TYPESCRIPT", "PYTHON"]
    }
  ];

  return (
    <section id="projects" className="py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">02 / Selected Work</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight text-cream">
              ARCHITECTING <br />
              <span className="text-white/40 italic">IMPACTFUL SYSTEMS.</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-card-bg border border-white/5">
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
                  <div className="flex items-center gap-2 text-white font-bold tracking-widest text-sm">
                    VIEW ON GITHUB <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-2xl font-display font-bold mb-3 text-cream">{project.title}</h4>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-6">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-mono text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AITwin = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "Hello! I'm Putranto's AI Twin. Ask me anything about my expertise, projects, or how I can help your business." }
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
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: 'user',
            parts: [{ text: `You are the AI Twin of Putranto Pratama, a Senior Solutions Architect AI. 
            Putranto is an expert in GenAI, LLMs, Cloud Architecture (GCP/AWS), and Full-stack engineering.
            He has built enterprise AI platforms and autonomous agent networks.
            Answer the following question as him, keeping it professional, concise, and slightly futuristic.
            
            Question: ${userMsg}` }]
          }
        ],
        config: {
          systemInstruction: "You are Putranto Pratama's AI Twin. Be professional, technical, and visionary."
        }
      });

      const response = await model;
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm processing that request. Give me a moment." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "My neural links are a bit fuzzy right now. Let's try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="interactive" className="py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-blue-400 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-white/20">
              <Cpu className="w-8 h-8 text-bg-dark" />
            </div>
            <div className="text-left">
              <h4 className="font-display font-bold text-2xl tracking-tighter text-cream">PUTRANTO AI</h4>
              <p className="text-[10px] font-mono text-accent uppercase tracking-widest">Architectural Intelligence v3.0</p>
            </div>
          </div>
          <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">03 / Interactive</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold text-cream">CONVERSE WITH THE ARCHITECT</h3>
        </div>

        <div className="glass rounded-[3rem] overflow-hidden flex flex-col h-[600px] border-white/10 shadow-2xl">
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
                    : 'bg-white/5 text-white/90 rounded-tl-none border border-white/10 backdrop-blur-md'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-5 rounded-3xl rounded-tl-none border border-white/10 flex gap-1.5">
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-white/[0.03] border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about my AI expertise..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 pr-16 text-sm focus:outline-none focus:border-accent/50 transition-all placeholder:text-white/20"
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

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechFlow Systems",
      quote: "Putranto's ability to architect complex AI systems is unparalleled. He transformed our data infrastructure into a high-performance intelligence engine.",
      avatar: "https://picsum.photos/seed/sarah/100/100"
    },
    {
      name: "Marcus Thorne",
      role: "VP of Engineering, Global Logistics",
      quote: "The autonomous agent network Putranto designed for us reduced our operational friction by 40%. A true visionary in solutions architecture.",
      avatar: "https://picsum.photos/seed/marcus/100/100"
    },
    {
      name: "Elena Rodriguez",
      role: "Director of AI Strategy, InnovateCorp",
      quote: "Working with Putranto was a game-changer. His deep understanding of LLMs and cloud scaling helped us launch our flagship AI product 3 months ahead of schedule.",
      avatar: "https://picsum.photos/seed/elena/100/100"
    }
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-32 px-6 bg-white/[0.01] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-4">04 / Testimonials</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight text-cream">
              VOICES FROM <br />
              <span className="text-white/40 italic">THE NETWORK.</span>
            </h3>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => paginate(-1)}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-bg-dark transition-all group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-bg-dark transition-all group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative h-[450px] md:h-[400px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="absolute w-full max-w-4xl"
            >
              <div className="p-10 md:p-16 rounded-[3rem] glass flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group border-white/10 shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                  <MessageSquare className="w-32 h-32 text-accent" />
                </div>
                
                <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name} 
                    className="w-full h-full rounded-3xl object-cover border-2 border-accent/20 shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-lg">
                    <Zap className="w-4 h-4 text-bg-dark" />
                  </div>
                </div>

                <div className="relative z-10 flex-1 text-center md:text-left">
                  <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed italic mb-8">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div>
                    <h4 className="font-display font-bold text-2xl text-cream mb-1">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm font-mono text-accent uppercase tracking-[0.2em]">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex ? 'w-12 bg-accent' : 'w-3 bg-white/10 hover:bg-white/20'
              }`}
            />
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
        <h2 className="text-sm font-mono text-bg-dark uppercase tracking-widest mb-8">05 / Contact</h2>
        
        <motion.div
          whileHover="hover"
          className="relative inline-block"
        >
          <motion.h3 
            variants={{
              hover: { scale: 1.05, rotate: -1 }
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-12 text-bg-dark cursor-default select-none"
          >
            LET'S BUILD <br />
            <motion.span 
              variants={{
                hover: { x: 20, color: "var(--color-cream)" }
              }}
              className="text-bg-dark/20 italic inline-block transition-colors"
            >
              SOMETHING GREAT.
            </motion.span>
          </motion.h3>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-20">
          <a href="mailto:putranto.pratama.ptr@gmail.com" className="group flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full border border-bg-dark/10 flex items-center justify-center group-hover:bg-bg-dark group-hover:border-bg-dark transition-all duration-500">
              <Mail className="w-8 h-8 text-bg-dark group-hover:text-accent transition-colors" />
            </div>
            <span className="text-sm font-mono uppercase tracking-widest text-bg-dark/40 group-hover:text-bg-dark transition-colors">Email Me</span>
          </a>
          
          <a href="#" className="group flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full border border-bg-dark/10 flex items-center justify-center group-hover:bg-bg-dark group-hover:border-bg-dark transition-all duration-500">
              <Linkedin className="w-8 h-8 text-bg-dark group-hover:text-accent transition-colors" />
            </div>
            <span className="text-sm font-mono uppercase tracking-widest text-bg-dark/40 group-hover:text-bg-dark transition-colors">LinkedIn</span>
          </a>

          <a href="#" className="group flex flex-col items-center gap-4">
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
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">P</span>
          </div>
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest">© 2026 PUTRANTO PRATAMA</span>
        </div>
        
        <div className="flex gap-8 text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <span className="text-accent/40">Built with Gemini AI</span>
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
      <Projects />
      <AITwin />
      <Testimonials />
      <Contact />
      <Footer />
      
      {/* Global Background Noise/Grain */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
