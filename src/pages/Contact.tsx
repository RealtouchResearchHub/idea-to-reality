import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        source: "contact_form"
      });
      
      if (error) throw error;
      
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Get in Touch</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mt-4 mb-6">
              Let's <span className="text-gradient-accent">Connect</span>
            </h1>
            <p className="text-muted-foreground text-lg">Ready to bring your idea to life? We'd love to hear from you.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="glass-card p-8">
                <h2 className="text-2xl font-heading font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-secondary" required />
                  <Input type="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-secondary" required />
                  <Textarea placeholder="Your message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-secondary min-h-[120px]" required />
                  <Button variant="cta" className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
              <div className="glass-card p-6 flex items-start gap-4">
                <Mail className="w-6 h-6 text-accent" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <a href="mailto:hello@realtouch.co" className="text-muted-foreground hover:text-accent">hello@realtouch.co</a>
                </div>
              </div>
              <div className="glass-card p-6 flex items-start gap-4">
                <Phone className="w-6 h-6 text-accent" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent">+1 (234) 567-890</a>
                </div>
              </div>
              <div className="glass-card p-6 flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent" />
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
              <div className="glass-card p-6">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[Linkedin, Facebook, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent/10 hover:text-accent transition-colors">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
