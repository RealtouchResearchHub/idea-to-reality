import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Sparkles, Lightbulb, Target, Zap, ArrowRight, RefreshCw, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface IdeaResult {
  title: string;
  description: string;
  targetMarket: string;
  aiOpportunities: string[];
  nextSteps: string[];
  score: number;
}

const sampleResults: IdeaResult[] = [
  {
    title: "AI-Powered Fitness Companion",
    description: "A personalized fitness app that uses AI to create custom workout plans, track progress, and provide real-time form correction through your phone camera.",
    targetMarket: "Health-conscious millennials and Gen Z seeking personalized fitness solutions",
    aiOpportunities: [
      "Computer vision for form analysis",
      "Personalized workout generation",
      "Progress prediction algorithms",
      "Natural language coaching"
    ],
    nextSteps: [
      "Validate demand with potential users",
      "Define MVP feature set",
      "Research competitors",
      "Create business model canvas"
    ],
    score: 85,
  },
  {
    title: "Smart Meal Planning Assistant",
    description: "An AI tool that generates weekly meal plans based on dietary preferences, budget, and available ingredients. Automatically creates shopping lists and suggests recipes.",
    targetMarket: "Busy professionals and families looking to eat healthier while saving time",
    aiOpportunities: [
      "Nutritional optimization algorithms",
      "Recipe recommendation engine",
      "Image recognition for ingredients",
      "Budget optimization"
    ],
    nextSteps: [
      "Survey target audience",
      "Map user journey",
      "Identify data sources for recipes",
      "Design prototype"
    ],
    score: 78,
  },
];

const IdeaLab = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<"input" | "processing" | "results">("input");
  const [interests, setInterests] = useState("");
  const [problem, setProblem] = useState("");
  const [results, setResults] = useState<IdeaResult[]>([]);
  const [email, setEmail] = useState("");

  const handleGenerate = async () => {
    if (!interests.trim()) {
      toast({
        title: "Please enter your interests",
        description: "Tell us what areas or industries you're passionate about.",
        variant: "destructive",
      });
      return;
    }

    setStep("processing");

    try {
      const { data, error } = await supabase.functions.invoke("generate-ideas", {
        body: { interests, problem },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setResults(data.ideas);
      setStep("results");
    } catch (error: any) {
      console.error("Error generating ideas:", error);
      toast({
        title: "Error generating ideas",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      setStep("input");
    }
  };

  const handleReset = () => {
    setStep("input");
    setInterests("");
    setProblem("");
    setResults([]);
  };

  const handleEmailCapture = async () => {
    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("leads").insert({
        email: email,
        message: `Idea Lab results: ${results.map(r => r.title).join(", ")}`,
        source: "idea_lab"
      });
      
      if (error) throw error;
      
      toast({
        title: "Results sent!",
        description: "Check your inbox for a detailed report of your ideas.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Idea Lab | Realtouch Research & Consulting</title>
        <meta
          name="description"
          content="Generate, refine, and validate business ideas with our AI-powered Idea Lab. Get instant insights on market potential and AI opportunities."
        />
      </Helmet>

      <Layout>
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cta/5 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow animation-delay-400" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cta/10 text-cta text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Tool
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
                The <span className="text-gradient-cta">Idea Lab</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Not sure where to start? Let AI help you generate, refine, and validate 
                business concepts. Get instant insights and a clear path forward.
              </p>
            </motion.div>

            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              {step === "input" && (
                <div className="glass-card p-8 sm:p-12">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        What are your interests or areas of expertise?
                      </label>
                      <Textarea
                        value={interests}
                        onChange={(e) => setInterests(e.target.value)}
                        placeholder="e.g., Health & fitness, technology, education, sustainability..."
                        className="min-h-[100px] bg-secondary border-border"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        What problem do you want to solve? (Optional)
                      </label>
                      <Textarea
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        placeholder="e.g., People struggle to maintain consistent workout routines..."
                        className="min-h-[100px] bg-secondary border-border"
                      />
                    </div>

                    <Button variant="cta" size="lg" className="w-full" onClick={handleGenerate}>
                      Generate Ideas
                      <Sparkles className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {step === "processing" && (
                <div className="glass-card p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cta/10 mb-6">
                    <Sparkles className="w-10 h-10 text-cta animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    Generating Your Ideas...
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Our AI is analyzing market opportunities and creating personalized concepts.
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cta animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-cta animate-bounce animation-delay-200" />
                    <div className="w-2 h-2 rounded-full bg-cta animate-bounce animation-delay-400" />
                  </div>
                </div>
              )}

              {step === "results" && (
                <div className="space-y-8">
                  {/* Results header */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-heading font-bold">Your AI-Generated Ideas</h2>
                      <p className="text-muted-foreground">Based on your interests and goals</p>
                    </div>
                    <Button variant="outline" onClick={handleReset}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Start Over
                    </Button>
                  </div>

                  {/* Ideas */}
                  <div className="space-y-6">
                    {results.map((idea, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="glass-card p-6 sm:p-8"
                      >
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center">
                              <Lightbulb className="w-6 h-6 text-cta" />
                            </div>
                            <div>
                              <h3 className="text-xl font-heading font-semibold">{idea.title}</h3>
                              <p className="text-sm text-muted-foreground">Viability Score: {idea.score}%</p>
                            </div>
                          </div>
                          <div className="w-16 h-16 rounded-full border-4 border-cta flex items-center justify-center">
                            <span className="text-lg font-bold text-cta">{idea.score}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6">{idea.description}</p>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Target className="w-4 h-4 text-accent" />
                              <h4 className="font-medium text-sm">Target Market</h4>
                            </div>
                            <p className="text-sm text-muted-foreground">{idea.targetMarket}</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Zap className="w-4 h-4 text-accent" />
                              <h4 className="font-medium text-sm">AI Opportunities</h4>
                            </div>
                            <ul className="space-y-1">
                              {idea.aiOpportunities.map((opp) => (
                                <li key={opp} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-accent" />
                                  {opp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-border">
                          <h4 className="font-medium text-sm mb-3">Recommended Next Steps</h4>
                          <div className="flex flex-wrap gap-2">
                            {idea.nextSteps.map((step, i) => (
                              <span key={step} className="px-3 py-1.5 rounded-lg bg-secondary text-sm text-muted-foreground">
                                {i + 1}. {step}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Email capture */}
                  <div className="glass-card p-6 sm:p-8 border-accent/20">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex-1">
                        <h3 className="text-lg font-heading font-semibold mb-2">
                          Save Your Results
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Get a detailed PDF report and schedule a free consultation to discuss next steps.
                        </p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="bg-secondary border-border"
                        />
                        <Button variant="cta" onClick={handleEmailCapture}>
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Ready to bring one of these ideas to life?
                    </p>
                    <Button variant="cta" size="lg" asChild>
                      <a href="/contact">
                        Book a Consultation
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default IdeaLab;
