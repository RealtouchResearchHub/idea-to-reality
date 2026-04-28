import { motion } from "framer-motion";
import { ExternalLink, Calendar, CheckCircle2, XCircle, AlertCircle, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoredGrant } from "@/lib/eligibilityEngine";
import { formatAmount, getDeadlineLabel, getDaysUntilDeadline } from "@/lib/eligibilityEngine";
import { useState } from "react";

interface GrantCardProps {
  grant: ScoredGrant;
  index?: number;
  onTrack?: (grant: ScoredGrant) => void;
  isTracked?: boolean;
}

const eligibilityConfig = {
  eligible: {
    label: "Fully Eligible",
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
    dot: "bg-green-400",
  },
  partial: {
    label: "Partially Eligible",
    icon: AlertCircle,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
    dot: "bg-yellow-400",
  },
  ineligible: {
    label: "Not Eligible",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/20",
    dot: "bg-red-400",
  },
};

const complexityLabels = { low: "Easy Apply", medium: "Medium", high: "Complex" };
const complexityColors = {
  low: "bg-green-400/10 text-green-400",
  medium: "bg-yellow-400/10 text-yellow-400",
  high: "bg-red-400/10 text-red-400",
};

export default function GrantCard({ grant, index = 0, onTrack, isTracked }: GrantCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cfg = eligibilityConfig[grant.eligibility];
  const Icon = cfg.icon;
  const days = getDaysUntilDeadline(grant.deadlineDate);
  const deadlineLabel = getDeadlineLabel(grant);
  const isUrgent = days >= 0 && days <= 30 && grant.deadline !== "Rolling";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`glass-card border rounded-2xl overflow-hidden ${cfg.bg}`}
    >
      {/* Header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Score ring */}
          <div className="shrink-0 relative w-14 h-14">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="24" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
              <circle
                cx="28" cy="28" r="24" fill="none"
                stroke={grant.eligibility === "eligible" ? "#4ade80" : grant.eligibility === "partial" ? "#facc15" : "#f87171"}
                strokeWidth="4"
                strokeDasharray={`${(grant.score / 100) * 150.8} 150.8`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {grant.score}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}>
                <Icon className="w-3 h-3" />
                {cfg.label}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${complexityColors[grant.complexity]}`}>
                {complexityLabels[grant.complexity]}
              </span>
              {isUrgent && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-400/10 text-orange-400 animate-pulse">
                  Urgent
                </span>
              )}
            </div>
            <h3 className="font-heading font-semibold text-base sm:text-lg leading-tight mb-0.5">
              {grant.name}
            </h3>
            <p className="text-xs text-muted-foreground">{grant.funder}</p>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <p className="text-[10px] text-muted-foreground mb-0.5">Funding</p>
            <p className="text-xs font-semibold">{formatAmount(grant.amount.min, grant.amount.max)}</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <p className="text-[10px] text-muted-foreground mb-0.5">Deadline</p>
            <p className={`text-xs font-semibold ${isUrgent ? "text-orange-400" : ""}`}>
              {deadlineLabel}
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-secondary/50">
            <p className="text-[10px] text-muted-foreground mb-0.5">Turnaround</p>
            <p className="text-xs font-semibold">{grant.turnaroundWeeks}wks</p>
          </div>
        </div>

        {/* Match score bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[11px] text-muted-foreground">Match Score</span>
            <span className="text-[11px] font-medium">{grant.score}%</span>
          </div>
          <Progress value={grant.score} className="h-1.5" />
        </div>
      </div>

      {/* Expandable details */}
      <div
        className="px-5 sm:px-6 pb-1 cursor-pointer select-none flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span>{expanded ? "Hide details" : "Show details"}</span>
        {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-5 sm:px-6 pb-5 space-y-4"
        >
          <p className="text-sm text-muted-foreground">{grant.description}</p>

          {/* Why it fits */}
          {grant.matchReasons.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-2 text-green-400">Why it fits Harvest Touch:</p>
              <ul className="space-y-1">
                {grant.matchReasons.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {grant.warnings.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-2 text-yellow-400">Watch out:</p>
              <ul className="space-y-1">
                {grant.warnings.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <AlertCircle className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements checklist */}
          <div>
            <p className="text-xs font-medium mb-2">Documents required:</p>
            <ul className="space-y-1">
              {grant.requirements.map((req) => (
                <li key={req.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                  {req.met ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  )}
                  <span className={req.met ? "" : "text-red-400/80"}>{req.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus tags */}
          <div className="flex flex-wrap gap-1.5">
            {grant.focus.map((f) => (
              <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground capitalize">
                {f}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Action bar */}
      <div className="flex gap-2 px-5 sm:px-6 pb-5 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs"
          asChild
        >
          <a href={grant.applicationUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-3 h-3 mr-1" />
            Apply
          </a>
        </Button>
        {onTrack && (
          <Button
            variant={isTracked ? "secondary" : "cta"}
            size="sm"
            className="flex-1 text-xs"
            onClick={() => onTrack(grant)}
          >
            {isTracked ? (
              <>Tracked</>
            ) : (
              <>
                <Plus className="w-3 h-3 mr-1" />
                Track
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
