import { motion } from "framer-motion";
import { MessageSquare, Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIAssistantPreviewProps {
  onOpenChat: () => void;
}

const AIAssistantPreview = ({ onOpenChat }: AIAssistantPreviewProps) => {
  return (
    <section className="section-padding relative overflow-hidden bg-secondary/30">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chat preview visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="glass-card p-6 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="glass-card p-3 rounded-tl-none">
                    <p className="text-sm">Hi! I'm here to help you navigate your business journey. What brings you here today?</p>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <div className="bg-accent text-accent-foreground p-3 rounded-xl rounded-tr-none max-w-[80%]">
                    <p className="text-sm">I have an app idea but I'm not sure how to start building it.</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="glass-card p-3 rounded-tl-none">
                    <p className="text-sm">That's exciting! I'd love to hear more about your idea. Have you thought about the core problem it solves? I can help you validate the concept and explore the best path forward.</p>
                  </div>
                </div>
              </div>
              
              {/* Input */}
              <div className="mt-6 flex gap-2">
                <div className="flex-1 h-10 rounded-lg bg-secondary border border-border flex items-center px-4">
                  <span className="text-sm text-muted-foreground">Type your message...</span>
                </div>
                <Button variant="accent" size="icon">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Available 24/7
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Your AI <span className="text-gradient-accent">Consultant</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Not ready to book a call? No problem. Our AI assistant is here to help you 
              explore ideas, understand our services, and guide you to the right solutions — 
              all at your own pace.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                "Get instant answers about our services",
                "Explore and refine your business ideas",
                "Understand which solutions fit your needs",
                "Receive personalized recommendations"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            
            <Button variant="accent" size="lg" onClick={onOpenChat}>
              Talk to AI Consultant
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantPreview;
