import { motion } from "framer-motion";
import { Trash2, ArrowRight, ExternalLink, FileText, CheckCircle2, Clock, Send, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoredGrant, formatAmount, getDeadlineLabel } from "@/lib/eligibilityEngine";

export type PipelineStage = "shortlisted" | "in_progress" | "submitted" | "awarded" | "unsuccessful";

export interface TrackedGrant {
  grant: ScoredGrant;
  stage: PipelineStage;
  addedAt: Date;
  notes?: string;
}

interface GrantTrackerProps {
  tracked: TrackedGrant[];
  onRemove: (id: string) => void;
  onStageChange: (id: string, stage: PipelineStage) => void;
  onDraft: (grant: ScoredGrant) => void;
}

const STAGES: { key: PipelineStage; label: string; icon: React.ElementType; color: string; bg: string }[] = [
  { key: "shortlisted", label: "Shortlisted", icon: CheckCircle2, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  { key: "in_progress", label: "In Progress", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  { key: "submitted", label: "Submitted", icon: Send, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
  { key: "awarded", label: "Awarded", icon: Trophy, color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
  { key: "unsuccessful", label: "Unsuccessful", icon: ArrowRight, color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
];

const NEXT_STAGE: Record<PipelineStage, PipelineStage | null> = {
  shortlisted: "in_progress",
  in_progress: "submitted",
  submitted: "awarded",
  awarded: null,
  unsuccessful: null,
};

export default function GrantTracker({ tracked, onRemove, onStageChange, onDraft }: GrantTrackerProps) {
  if (tracked.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4">
          <FileText className="w-7 h-7 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading font-semibold mb-2">No grants tracked yet</h3>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Browse grants in the <span className="text-cta font-medium">Discover</span> tab and click{" "}
          <span className="font-medium">Track</span> to add them to your pipeline.
        </p>
      </div>
    );
  }

  const byStage = STAGES.map((s) => ({
    ...s,
    items: tracked.filter((t) => t.stage === s.key),
  }));

  const totalValue = tracked
    .filter((t) => t.stage === "awarded")
    .reduce((sum, t) => sum + t.grant.amount.max, 0);

  return (
    <div className="space-y-6">
      {/* Pipeline summary */}
      <div className="flex flex-wrap gap-3">
        {byStage.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.key} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium ${s.bg} ${s.color}`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{s.label}</span>
              <span className="bg-white/10 px-1.5 py-0.5 rounded-full">{s.items.length}</span>
            </div>
          );
        })}
        {totalValue > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium bg-green-400/10 border-green-400/20 text-green-400 ml-auto">
            <Trophy className="w-3.5 h-3.5" />
            <span>Awarded: £{totalValue.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Kanban columns */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {byStage.map((stage) => {
          const Icon = stage.icon;
          return (
            <div key={stage.key} className="space-y-3">
              {/* Column header */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${stage.bg}`}>
                <Icon className={`w-3.5 h-3.5 ${stage.color}`} />
                <span className={`text-xs font-semibold ${stage.color}`}>{stage.label}</span>
                <span className="ml-auto text-xs bg-white/10 px-1.5 py-0.5 rounded-full">
                  {stage.items.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2 min-h-[80px]">
                {stage.items.map((item, i) => {
                  const nextStage = NEXT_STAGE[item.stage];
                  return (
                    <motion.div
                      key={item.grant.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-card p-3 rounded-xl space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-semibold leading-tight truncate">{item.grant.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{item.grant.funder}</p>
                        </div>
                        <button
                          onClick={() => onRemove(item.grant.id)}
                          className="shrink-0 text-muted-foreground hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>{formatAmount(item.grant.amount.min, item.grant.amount.max)}</span>
                        <span>{getDeadlineLabel(item.grant)}</span>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[10px] px-2 flex-1"
                          onClick={() => onDraft(item.grant)}
                        >
                          <FileText className="w-2.5 h-2.5 mr-1" />
                          Draft
                        </Button>
                        {nextStage && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-[10px] px-2 flex-1"
                            onClick={() => onStageChange(item.grant.id, nextStage)}
                          >
                            <ArrowRight className="w-2.5 h-2.5 mr-1" />
                            {STAGES.find((s) => s.key === nextStage)?.label}
                          </Button>
                        )}
                        {!nextStage && item.stage !== "awarded" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-[10px] px-2 flex-1"
                            onClick={() => onStageChange(item.grant.id, "unsuccessful")}
                          >
                            Unsuccessful
                          </Button>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-6 text-[10px]"
                        asChild
                      >
                        <a href={item.grant.applicationUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-2.5 h-2.5 mr-1" />
                          Open application
                        </a>
                      </Button>
                    </motion.div>
                  );
                })}

                {stage.items.length === 0 && (
                  <div className="border border-dashed border-border rounded-xl h-16 flex items-center justify-center">
                    <p className="text-[10px] text-muted-foreground">Empty</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
