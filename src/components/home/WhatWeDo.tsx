import { motion } from "framer-motion";
import { Search, Briefcase, Cpu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: Search,
    title: "AI Research & Strategic Consulting",
    description: "Deep-dive analysis, market research, and strategic roadmaps powered by AI insights. We help you understand your market and position for success.",
    features: ["Market Analysis", "Competitive Intelligence", "Strategic Planning", "AI Readiness Assessment"],
    color: "accent",
  },
  {
    icon: Briefcase,
    title: "Business Solutions (A–Z)",
    description: "Complete end-to-end business support from ideation to execution. We handle everything so you can focus on your vision.",
    features: ["Business Planning", "Product Development", "Launch Strategy", "Operations Setup"],
    color: "cta",
  },
  {
    icon: Cpu,
    title: "AI Products & Automation",
    description: "Custom AI solutions, intelligent automation, and digital transformation. We build the technology that powers your growth.",
    features: ["Custom AI Tools", "Process Automation", "Digital Solutions", "SaaS Development"],
    color: "teal",
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
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
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
      </div>
    </section>
  );
};

export default WhatWeDo;
