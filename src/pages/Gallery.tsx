import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Bot, MessageSquare, BarChart3, Cog, Database, Zap, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

type FilterType = "all" | "chatbots" | "automation" | "saas" | "dashboards" | "coming-soon";

const solutions = [
  {
    id: 1,
    title: "Customer Support AI",
    description: "24/7 intelligent customer support that learns from every interaction. Reduce response times and improve satisfaction.",
    category: "chatbots",
    icon: Bot,
    status: "Available",
    useCases: ["E-commerce", "SaaS", "Service businesses"],
  },
  {
    id: 2,
    title: "Lead Qualification Bot",
    description: "Automatically qualify leads through conversational AI. Connect with your CRM and never miss an opportunity.",
    category: "chatbots",
    icon: MessageSquare,
    status: "Available",
    useCases: ["Sales teams", "Real estate", "B2B services"],
  },
  {
    id: 3,
    title: "Invoice Processing",
    description: "Automated extraction and processing of invoice data. Eliminate manual data entry and reduce errors.",
    category: "automation",
    icon: Cog,
    status: "Available",
    useCases: ["Finance", "Accounting", "Operations"],
  },
  {
    id: 4,
    title: "Email Workflow Automation",
    description: "Smart email routing, response generation, and follow-up automation powered by AI.",
    category: "automation",
    icon: Zap,
    status: "Available",
    useCases: ["Sales", "Support", "Marketing"],
  },
  {
    id: 5,
    title: "Business Intelligence Dashboard",
    description: "Real-time insights and KPI tracking with AI-powered anomaly detection and forecasting.",
    category: "dashboards",
    icon: BarChart3,
    status: "Available",
    useCases: ["Executives", "Operations", "Analytics teams"],
  },
  {
    id: 6,
    title: "Inventory Analytics",
    description: "Predictive inventory management with demand forecasting and automated reorder suggestions.",
    category: "dashboards",
    icon: Database,
    status: "Available",
    useCases: ["Retail", "Manufacturing", "E-commerce"],
  },
  {
    id: 7,
    title: "AI Content Studio",
    description: "Generate, optimize, and manage content at scale. Blog posts, social media, and marketing copy.",
    category: "saas",
    icon: Zap,
    status: "Coming Soon",
    useCases: ["Marketing teams", "Agencies", "Content creators"],
  },
  {
    id: 8,
    title: "Smart Recruitment Platform",
    description: "AI-powered candidate screening, matching, and interview scheduling. Find the best talent faster.",
    category: "saas",
    icon: Bot,
    status: "Coming Soon",
    useCases: ["HR teams", "Recruiters", "Startups"],
  },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "All Solutions", value: "all" },
  { label: "AI Chatbots", value: "chatbots" },
  { label: "Automation", value: "automation" },
  { label: "Dashboards", value: "dashboards" },
  { label: "SaaS Products", value: "saas" },
  { label: "Coming Soon", value: "coming-soon" },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredSolutions = solutions.filter((solution) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "coming-soon") return solution.status === "Coming Soon";
    return solution.category === activeFilter;
  });

  return (
    <>
      <Helmet>
        <title>AI Solutions Gallery | Realtouch Research & Consulting</title>
        <meta
          name="description"
          content="Explore our collection of AI tools, automations, and products. From chatbots to dashboards, find the solution that fits your needs."
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
              <span className="text-accent text-sm font-medium uppercase tracking-wider">Innovation Showroom</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
                AI Solutions <span className="text-gradient-accent">Gallery</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover our portfolio of AI-powered solutions. Each product is designed 
                to solve real business challenges and deliver measurable results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter & Grid */}
        <section className="section-padding pt-0">
          <div className="container-custom">
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mb-12"
            >
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFilter === filter.value
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>

            {/* Solutions grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSolutions.map((solution, index) => (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="glass-card p-6 h-full flex flex-col hover:border-accent/30 transition-all duration-300">
                    {/* Status badge */}
                    <span className={`self-start inline-block px-2 py-1 rounded text-xs font-medium mb-4 ${
                      solution.status === 'Available' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-cta/10 text-cta'
                    }`}>
                      {solution.status}
                    </span>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                      <solution.icon className="w-6 h-6 text-accent" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-heading font-semibold mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
                      {solution.description}
                    </p>

                    {/* Use cases */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {solution.useCases.map((useCase) => (
                        <span key={useCase} className="px-2 py-0.5 rounded text-xs bg-secondary text-muted-foreground">
                          {useCase}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between group-hover:bg-secondary"
                    >
                      {solution.status === "Available" ? (
                        <>
                          Request Demo
                          <Eye className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Join Waitlist
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
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
                Need Something Custom?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Can't find exactly what you need? We build bespoke AI solutions 
                tailored to your specific business requirements.
              </p>
              <Button variant="cta" size="lg" asChild>
                <a href="/contact">
                  Discuss Your Project
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Gallery;
