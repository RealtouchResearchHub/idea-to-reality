import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const IdeaLabPreview = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cta/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="glass-card p-8 sm:p-12 lg:p-16 border-cta/20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cta/10 text-cta text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Tool
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6">
                The <span className="text-gradient-cta">Idea Lab</span>
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Not sure where to start? Our AI-powered Idea Lab helps you generate, 
                refine, and validate business concepts. Get instant insights on market 
                potential, AI opportunities, and a clear path forward.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Generate business ideas based on your interests",
                  "Validate concepts with AI market analysis",
                  "Identify automation and AI opportunities",
                  "Get a structured roadmap for execution"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <span className="w-2 h-2 rounded-full bg-cta" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button variant="cta" size="lg" asChild>
                <Link to="/idea-lab">
                  Try the Idea Lab
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                {/* Animated circles */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-cta/20 animate-pulse-glow" />
                </div>
                <div className="absolute inset-8 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-cta/30 animate-pulse-glow animation-delay-200" />
                </div>
                <div className="absolute inset-16 flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-cta/40 animate-pulse-glow animation-delay-400" />
                </div>
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-2xl bg-cta/20 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-cta" />
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-8 right-8 px-3 py-1.5 rounded-lg bg-card border border-border text-sm animate-float">
                  💡 Idea Generated
                </div>
                <div className="absolute bottom-16 left-4 px-3 py-1.5 rounded-lg bg-card border border-border text-sm animate-float animation-delay-400">
                  🎯 Market Validated
                </div>
                <div className="absolute bottom-8 right-16 px-3 py-1.5 rounded-lg bg-card border border-border text-sm animate-float animation-delay-600">
                  🚀 Ready to Build
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaLabPreview;
