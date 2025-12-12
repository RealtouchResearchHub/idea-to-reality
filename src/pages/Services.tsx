import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Search, Briefcase, Cpu, BarChart3, Target, Lightbulb, Rocket, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const services = [
  {
    id: "consulting",
    icon: Search,
    title: "AI Research & Strategic Consulting",
    subtitle: "Navigate complexity with clarity",
    description: "Deep-dive analysis and strategic roadmaps powered by AI insights. We help you understand your market, validate your assumptions, and position for success.",
    whoFor: ["Founders validating ideas", "Startups pivoting strategy", "Businesses entering new markets"],
    problems: ["Unclear market opportunity", "Lack of competitive intelligence", "No clear go-to-market strategy"],
    deliverables: ["Market research report", "Competitive analysis", "Strategic roadmap", "AI readiness assessment"],
    process: ["Discovery session", "Research & analysis", "Strategy development", "Roadmap presentation"],
    color: "accent",
  },
  {
    id: "business",
    icon: Briefcase,
    title: "Business Solutions (A–Z)",
    subtitle: "End-to-end execution support",
    description: "Complete business support from the first spark of an idea to market launch. We handle the complexity so you can focus on your vision.",
    whoFor: ["First-time founders", "Non-technical entrepreneurs", "SMEs scaling operations"],
    problems: ["Don't know where to start", "Need a technical co-founder", "Overwhelmed by execution"],
    deliverables: ["Business plan", "MVP development", "Launch strategy", "Operational framework"],
    process: ["Idea refinement", "Planning & design", "Development & testing", "Launch & support"],
    color: "cta",
  },
  {
    id: "ai-products",
    icon: Cpu,
    title: "AI Products & Automation",
    subtitle: "Build your competitive edge",
    description: "Custom AI solutions that transform how you work. From intelligent automation to full SaaS products, we build the technology that powers your growth.",
    whoFor: ["Businesses ready for AI", "Companies with manual processes", "Organizations seeking efficiency"],
    problems: ["Repetitive manual tasks", "No AI expertise in-house", "Outdated systems"],
    deliverables: ["Custom AI solution", "Integration & training", "Ongoing support", "Performance metrics"],
    process: ["Audit & discovery", "Solution design", "Build & integrate", "Deploy & optimize"],
    color: "teal",
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Realtouch Research & Consulting</title>
        <meta
          name="description"
          content="Explore our comprehensive services: AI Research & Consulting, End-to-End Business Solutions, and Custom AI Products & Automation."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Our Services</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
                Everything You Need to <span className="text-gradient-accent">Succeed</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                From strategic consulting to hands-on execution, we provide the expertise 
                and support to turn your vision into a thriving business.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="section-padding">
          <div className="container-custom space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id={service.id}
                className="scroll-mt-24"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left column */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      service.color === 'accent' ? 'bg-accent/10' :
                      service.color === 'cta' ? 'bg-cta/10' : 'bg-teal/10'
                    }`}>
                      <service.icon className={`w-8 h-8 ${
                        service.color === 'accent' ? 'text-accent' :
                        service.color === 'cta' ? 'text-cta' : 'text-teal'
                      }`} />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
                      {service.title}
                    </h2>
                    <p className={`text-lg mb-6 ${
                      service.color === 'accent' ? 'text-accent' :
                      service.color === 'cta' ? 'text-cta' : 'text-teal'
                    }`}>
                      {service.subtitle}
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>
                    
                    <Button variant="cta" size="lg" asChild>
                      <Link to="/contact">
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Right column - cards */}
                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    {/* Who it's for */}
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Target className="w-5 h-5 text-accent" />
                        <h4 className="font-heading font-semibold">Who It's For</h4>
                      </div>
                      <ul className="space-y-2">
                        {service.whoFor.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-success" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Problems we solve */}
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="w-5 h-5 text-cta" />
                        <h4 className="font-heading font-semibold">Problems We Solve</h4>
                      </div>
                      <ul className="space-y-2">
                        {service.problems.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-cta" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Deliverables */}
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <BarChart3 className="w-5 h-5 text-teal" />
                        <h4 className="font-heading font-semibold">What You Get</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {service.deliverables.map((item) => (
                          <div key={item} className="px-3 py-2 rounded-lg bg-secondary text-sm text-muted-foreground">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Process */}
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Rocket className="w-5 h-5 text-accent" />
                        <h4 className="font-heading font-semibold">Our Process</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {service.process.map((step, i) => (
                          <div key={step} className="flex items-center">
                            <div className="px-3 py-1.5 rounded-full bg-secondary text-xs font-medium">
                              {step}
                            </div>
                            {i < service.process.length - 1 && (
                              <ArrowRight className="w-4 h-4 text-muted-foreground mx-1" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's have a conversation. We'll help you figure out the best path forward 
                based on your unique situation and goals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="cta" size="lg" asChild>
                  <Link to="/idea-lab">
                    Try the Idea Lab
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    Book a Consultation
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
