import { motion } from "framer-motion";
import { Target, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPreview = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm font-medium uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-4 mb-6">
              Execution Over <span className="text-gradient-accent">Everything</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We're not just consultants — we're builders. Realtouch Research & Consulting 
              was founded on a simple belief: great ideas deserve great execution. We combine 
              strategic thinking with hands-on development to turn your vision into reality.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex-shrink-0 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Our Mission</h4>
                  <p className="text-muted-foreground text-sm">
                    To democratize access to AI and business expertise, empowering founders 
                    and businesses to build the future.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-cta/10 flex-shrink-0 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-cta" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-1">Our Vision</h4>
                  <p className="text-muted-foreground text-sm">
                    A world where every innovative idea has a clear path to becoming 
                    a successful, AI-powered business.
                  </p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/about">
                Learn More About Us
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
            <div className="glass-card p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-heading font-bold text-accent mb-2">50+</div>
                  <p className="text-sm text-muted-foreground">Projects Delivered</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-heading font-bold text-cta mb-2">95%</div>
                  <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-heading font-bold text-teal mb-2">30+</div>
                  <p className="text-sm text-muted-foreground">AI Solutions Built</p>
                </div>
                <div className="glass-card p-6 text-center">
                  <div className="text-4xl font-heading font-bold text-success mb-2">24/7</div>
                  <p className="text-sm text-muted-foreground">Support Available</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
