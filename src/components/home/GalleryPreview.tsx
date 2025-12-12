import { motion } from "framer-motion";
import { Bot, MessageSquare, BarChart3, Cog, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description: "Custom conversational AI for customer support, sales, and engagement.",
    status: "Available",
  },
  {
    icon: Cog,
    title: "Process Automation",
    description: "Intelligent workflows that eliminate repetitive tasks and boost efficiency.",
    status: "Available",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboards",
    description: "Real-time insights and data visualization powered by AI.",
    status: "Available",
  },
  {
    icon: MessageSquare,
    title: "Custom SaaS",
    description: "Bespoke software solutions built for your specific business needs.",
    status: "Coming Soon",
  },
];

const GalleryPreview = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-medium uppercase tracking-wider">Innovation Showroom</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6">
            AI Solutions <span className="text-gradient-accent">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our collection of AI tools, automations, and products. 
            See what's possible and find the solution that fits your needs.
          </p>
        </motion.div>

        {/* Solutions grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card p-6 h-full hover:border-accent/30 transition-all duration-300">
                {/* Status badge */}
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-4 ${
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
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link to="/gallery">
              View Full Gallery
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
