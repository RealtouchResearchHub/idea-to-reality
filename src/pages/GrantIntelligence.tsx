import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Sparkles, LayoutDashboard, Search, GitBranch, FileEdit } from "lucide-react";
import HarvestTouchLayout from "@/components/grants/HarvestTouchLayout";
import GrantDashboard from "@/components/grants/GrantDashboard";
import GrantDiscovery from "@/components/grants/GrantDiscovery";
import GrantTracker, { TrackedGrant, PipelineStage } from "@/components/grants/GrantTracker";
import ApplicationDraftGenerator from "@/components/grants/ApplicationDraftGenerator";
import { GRANTS } from "@/lib/grantData";
import { scoreAllGrants, ScoredGrant } from "@/lib/eligibilityEngine";
import { useToast } from "@/hooks/use-toast";

const scoredGrants = scoreAllGrants(GRANTS);

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "discover", label: "Discover", icon: Search },
  { id: "pipeline", label: "Pipeline", icon: GitBranch },
  { id: "draft", label: "Draft Application", icon: FileEdit },
] as const;

type TabId = typeof TABS[number]["id"];

export default function GrantIntelligence() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [tracked, setTracked] = useState<TrackedGrant[]>([]);
  const [draftGrant, setDraftGrant] = useState<ScoredGrant | null>(null);

  const trackedIds = new Set(tracked.map((t) => t.grant.id));

  const handleTrack = useCallback((grant: ScoredGrant) => {
    if (trackedIds.has(grant.id)) {
      toast({ title: `${grant.name} is already in your pipeline` });
      return;
    }
    setTracked((prev) => [
      ...prev,
      { grant, stage: "shortlisted", addedAt: new Date() },
    ]);
    toast({
      title: "Added to pipeline",
      description: `${grant.name} added to your shortlist.`,
    });
  }, [trackedIds, toast]);

  const handleRemove = useCallback((id: string) => {
    setTracked((prev) => prev.filter((t) => t.grant.id !== id));
  }, []);

  const handleStageChange = useCallback((id: string, stage: PipelineStage) => {
    setTracked((prev) =>
      prev.map((t) => (t.grant.id === id ? { ...t, stage } : t))
    );
  }, []);

  const handleDraft = useCallback((grant: ScoredGrant) => {
    setDraftGrant(grant);
    setActiveTab("draft");
  }, []);

  return (
    <>
      <Helmet>
        <title>Grant Intelligence | Harvest Touch CIC — Rochdale</title>
        <meta
          name="description"
          content="Harvest Touch CIC grant finder — AI-powered discovery, eligibility scoring, pipeline tracking and instant application drafts for community funding."
        />
        <meta name="keywords" content="Harvest Touch CIC, Rochdale grants, community funding, youth wellbeing grants, CIC grants UK" />
        <meta property="og:title" content="Grant Intelligence | Harvest Touch CIC" />
        <meta property="og:description" content="Find and apply for the right grants faster. AI-scored against Harvest Touch's CIC profile." />
        <meta property="og:type" content="website" />
      </Helmet>

      <HarvestTouchLayout>
        {/* Hero */}
        <section className="section-padding relative overflow-hidden pb-0">
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse-glow animation-delay-400" />
          </div>

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mb-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-5">
                <Sparkles className="w-4 h-4" />
                Harvest Touch CIC · AI Grant Intelligence
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
                Find, Match & Win{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Funding for Rochdale
                </span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Every grant scored against Harvest Touch's CIC profile — youth wellbeing,
                digital skills, Rochdale-based. Manage your pipeline and draft applications in minutes.
              </p>
            </motion.div>

            {/* Tab navigation */}
            <div className="flex gap-1 sm:gap-2 border-b border-border overflow-x-auto pb-px scrollbar-hide">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 sm:px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      isActive
                        ? "border-cta text-cta"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    {tab.id === "pipeline" && tracked.length > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-cta text-cta-foreground">
                        {tracked.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tab content */}
        <section className="section-padding pt-8">
          <div className="container-custom">
            {activeTab === "dashboard" && (
              <GrantDashboard grants={scoredGrants} trackedCount={tracked.length} />
            )}
            {activeTab === "discover" && (
              <GrantDiscovery
                grants={scoredGrants}
                trackedIds={trackedIds}
                onTrack={handleTrack}
              />
            )}
            {activeTab === "pipeline" && (
              <GrantTracker
                tracked={tracked}
                onRemove={handleRemove}
                onStageChange={handleStageChange}
                onDraft={handleDraft}
              />
            )}
            {activeTab === "draft" && (
              <ApplicationDraftGenerator preselectedGrant={draftGrant} />
            )}
          </div>
        </section>
      </HarvestTouchLayout>
    </>
  );
}
