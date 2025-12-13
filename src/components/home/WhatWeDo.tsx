import { motion } from "framer-motion";
import { Search, Briefcase, Cpu, ArrowRight, FileText, PresentationIcon, TrendingUp, Rocket, PenTool, Bot, Target, BarChart3, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: Search,
    title: "AI Research & Market Intelligence",
    description: "Deep-dive market research, competitive analysis, and strategic insights powered by AI. We help startups scale with data-driven decisions.",
    features: ["Market Research", "Competitive Intelligence", "Startup Scaling Strategy", "AI Readiness Assessment"],
    color: "accent",
  },
  {
    icon: Briefcase,
    title: "One-Stop Business Consulting",
    description: "Complete end-to-end business support from ideation to execution. Your single destination for all business consulting needs.",
    features: ["Business Planning", "Startup Advisory", "Launch Strategy", "Operations Setup"],
    color: "cta",
  },
  {
    icon: Cpu,
    title: "AI Products & Automation",
    description: "Custom AI solutions, intelligent automation, and digital transformation. Helping startups scale faster with the right technology.",
    features: ["Custom AI Tools", "Process Automation", "Digital Solutions", "Scalable SaaS Development"],
    color: "teal",
  },
];

const azServices = [
  {
    icon: FileText,
    title: "Business Model",
    description: "Strategic framework that defines how your startup creates, delivers, and captures value.",
  },
  {
    icon: Briefcase,
    title: "Business Plan",
    description: "Comprehensive roadmap covering market analysis, operations, and growth strategy.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Projection",
    description: "Data-driven revenue forecasts with multiple scenarios for investor confidence.",
  },
  {
    icon: PresentationIcon,
    title: "Pitch Deck",
    description: "Compelling investor presentations that tell your story and secure funding.",
  },
  {
    icon: BarChart3,
    title: "Financial Projections",
    description: "Detailed 3-5 year financial models including P&L, cash flow, and balance sheets.",
  },
  {
    icon: Globe,
    title: "Landing Page",
    description: "High-converting websites designed to capture leads and drive customer action.",
  },
  {
    icon: Target,
    title: "Action Plans",
    description: "Step-by-step execution roadmaps with milestones, KPIs, and accountability.",
  },
  {
    icon: PenTool,
    title: "Content Creation",
    description: "Engaging brand content, marketing copy, and social media assets that convert.",
  },
  {
    icon: Bot,
    title: "Custom AI System Prompts & Tools",
    description: "Bespoke AI assistants and automation tools tailored to your business needs.",
  },
];

const WhatWeDo = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-secondary/30">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6">
            Three Pillars of <span className="text-gradient-accent">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive approach to turning your vision into a thriving, AI-powered business.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="glass-card p-8 h-full flex flex-col hover:border-accent/30 transition-all duration-300">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  pillar.color === 'accent' ? 'bg-accent/10' :
                  pillar.color === 'cta' ? 'bg-cta/10' : 'bg-teal/10'
                }`}>
                  <pillar.icon className={`w-8 h-8 ${
                    pillar.color === 'accent' ? 'text-accent' :
                    pillar.color === 'cta' ? 'text-cta' : 'text-teal'
                  }`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-heading font-semibold mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {pillar.description}
                </p>
                
                {/* Features list */}
                <ul className="space-y-2 mb-8 flex-grow">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        pillar.color === 'accent' ? 'bg-accent' :
                        pillar.color === 'cta' ? 'bg-cta' : 'bg-teal'
                      }`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <Button variant="ghost" className="w-full justify-between group-hover:bg-secondary" asChild>
                  <Link to="/services">
                    Explore Service
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* A-Z Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cta text-sm font-medium uppercase tracking-wider">A–Z Startup Solutions</span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold mt-4 mb-4">
            Everything Your Startup Needs to <span className="text-gradient-cta">Launch & Scale</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            World-class deliverables crafted by experts. From business strategy to AI-powered tools — we've got you covered.
          </p>
        </motion.div>

        {/* A-Z Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {azServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="glass-card p-6 h-full hover:border-cta/30 hover:bg-cta/5 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center shrink-0 group-hover:bg-cta/20 transition-colors">
                    <service.icon className="w-6 h-6 text-cta" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1 group-hover:text-cta transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button variant="cta" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
