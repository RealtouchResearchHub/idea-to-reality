import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const initialMessage: Message = {
  id: "1",
  role: "assistant",
  content: "Hi! I'm the Realtouch AI assistant. I'm here to help you explore your ideas, understand our services, and guide you toward the right solutions. What brings you here today?",
};

const quickReplies = [
  "I have a business idea",
  "What services do you offer?",
  "I need AI automation",
  "Book a consultation",
];

// Simulated AI responses based on keywords
const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("idea") || lowerMessage.includes("concept")) {
    return "That's exciting! I'd love to hear more about your idea. Could you tell me a bit about the problem you're trying to solve or the market you're targeting? This will help me understand how we can best support you. You might also find our Idea Lab helpful for refining and validating your concept.";
  }
  
  if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("help")) {
    return "We offer three main pillars of support:\n\n1️⃣ **AI Research & Strategic Consulting** - Market analysis, competitive intelligence, and strategic roadmaps\n\n2️⃣ **Business Solutions (A-Z)** - Complete support from ideation to execution, including planning, development, and launch\n\n3️⃣ **AI Products & Automation** - Custom AI tools, process automation, and digital solutions\n\nWhich area interests you most?";
  }
  
  if (lowerMessage.includes("automation") || lowerMessage.includes("ai")) {
    return "Great choice! AI automation can transform your business by eliminating repetitive tasks and unlocking new capabilities. We build custom solutions including:\n\n• AI chatbots and virtual assistants\n• Process automation workflows\n• Data analytics dashboards\n• Custom SaaS products\n\nDo you have a specific process or task you'd like to automate?";
  }
  
  if (lowerMessage.includes("consult") || lowerMessage.includes("book") || lowerMessage.includes("call") || lowerMessage.includes("talk")) {
    return "I'd be happy to connect you with our team for a deeper conversation. You can book a free consultation where we'll discuss your needs, explore possibilities, and outline potential next steps.\n\nWould you like me to direct you to our consultation booking page, or would you prefer to share more details about your project first?";
  }
  
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("pricing")) {
    return "Our pricing is tailored to each project's unique requirements. We believe in transparent, value-based pricing that aligns with your goals.\n\nFor an accurate quote, we'd need to understand your specific needs. Would you like to schedule a free consultation to discuss your project and get a customized proposal?";
  }
  
  if (lowerMessage.includes("startup") || lowerMessage.includes("founder")) {
    return "We love working with startups and founders! Whether you're at the idea stage or already growing, we can help with:\n\n• Validating and refining your concept\n• Building your MVP\n• Developing your go-to-market strategy\n• Integrating AI to give you an edge\n\nWhat stage is your startup at currently?";
  }
  
  return "Thank you for sharing that. To give you the most relevant guidance, could you tell me a bit more about:\n\n• The problem you're trying to solve\n• Your current stage (idea, planning, building, growing)\n• What kind of support would be most helpful right now\n\nI'm here to help you find the best path forward!";
};

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getAIResponse(text),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  return (
    <>
      {/* Chat toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-[0_8px_32px_-8px_hsla(173,80%,40%,0.5)] hover:scale-110 transition-transform flex items-center justify-center"
            aria-label="Open chat"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "600px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] glass-card flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-sm">AI Consultant</p>
                  <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex-shrink-0 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-accent" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-xl text-sm whitespace-pre-wrap ${
                          message.role === "user"
                            ? "bg-accent text-accent-foreground rounded-tr-none"
                            : "glass-card rounded-tl-none"
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex-shrink-0 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-accent" />
                      </div>
                      <div className="glass-card p-3 rounded-xl rounded-tl-none">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce animation-delay-200" />
                          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce animation-delay-400" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick replies */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary hover:bg-accent/10 hover:text-accent transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 h-10 px-4 rounded-lg bg-secondary border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                    <Button
                      type="submit"
                      variant="accent"
                      size="icon"
                      disabled={!input.trim() || isTyping}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
