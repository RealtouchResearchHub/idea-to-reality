import { motion } from "framer-motion";
import { Target, Eye, Users, Heart, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
              Execution Over <span className="text-gradient-accent">Everything</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              We're builders, strategists, and AI experts who believe great ideas deserve great execution.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="glass-card p-8">
              <Target className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-3">Our Mission</h3>
              <p className="text-muted-foreground">To democratize access to AI and business expertise, empowering founders and businesses to build the future.</p>
            </div>
            <div className="glass-card p-8">
              <Eye className="w-10 h-10 text-cta mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-3">Our Vision</h3>
              <p className="text-muted-foreground">A world where every innovative idea has a clear path to becoming a successful, AI-powered business.</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Heart, title: "Founder-First", desc: "Your success is our success" },
              { icon: Target, title: "Execution-Led", desc: "We build, not just advise" },
              { icon: Users, title: "Partnership", desc: "We're in this together" },
              { icon: Eye, title: "Innovation", desc: "AI-powered everything" },
            ].map((v) => (
              <div key={v.title} className="glass-card p-6 text-center">
                <v.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="cta" size="lg" asChild>
              <Link to="/contact">Work With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
