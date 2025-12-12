import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Ready to Transform Your Idea?</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6">
            Let's Build Something{" "}
            <span className="text-gradient-accent">Extraordinary</span>
          </h2>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Whether you have a clear vision or just the spark of an idea, 
            we're here to help you bring it to life. No technical background required.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="cta" size="xl" asChild>
              <Link to="/idea-lab">
                Start with Your Idea
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Schedule a Consultation
              </Link>
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground">
            No commitment required • Free initial consultation
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
