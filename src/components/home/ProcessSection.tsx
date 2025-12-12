import { motion } from "framer-motion";
import { Lightbulb, Target, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Ideate",
    description: "Share your idea with us. We help you refine, validate, and shape it into a clear concept.",
  },
  {
    icon: Target,
    step: "02",
    title: "Strategize",
    description: "We create a comprehensive roadmap with market analysis, technical specs, and execution plan.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Build",
    description: "Our team develops your solution with cutting-edge AI and proven business practices.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch",
    description: "We help you go to market, iterate based on feedback, and scale for sustainable growth.",
  },
];

const ProcessSection = () => {
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
          <span className="text-accent text-sm font-medium uppercase tracking-wider">Our Process</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6">
            Idea to Reality in <span className="text-gradient-cta">4 Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A proven framework that transforms concepts into market-ready, scalable solutions.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  {/* Step number */}
                  <div className="relative z-10 w-20 h-20 mx-auto rounded-2xl bg-card border border-border flex items-center justify-center mb-6 group hover:border-accent/50 transition-colors duration-300">
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                    <item.icon className="w-8 h-8 text-accent" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
