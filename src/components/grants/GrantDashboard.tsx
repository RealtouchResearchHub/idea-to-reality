import { motion } from "framer-motion";
import { TrendingUp, Clock, CheckCircle2, AlertCircle, PoundSterling, Target, Zap, Building2 } from "lucide-react";
import { ScoredGrant } from "@/lib/eligibilityEngine";
import { formatAmount } from "@/lib/eligibilityEngine";
import { HARVEST_TOUCH_PROFILE } from "@/lib/grantData";

interface GrantDashboardProps {
  grants: ScoredGrant[];
  trackedCount: number;
}

export default function GrantDashboard({ grants, trackedCount }: GrantDashboardProps) {
  const eligible = grants.filter((g) => g.eligibility === "eligible");
  const partial = grants.filter((g) => g.eligibility === "partial");
  const totalPotential = eligible.reduce((sum, g) => sum + g.amount.max, 0);
  const avgScore = Math.round(grants.reduce((sum, g) => sum + g.score, 0) / grants.length);
  const topGrant = grants[0];
  const urgentGrants = grants.filter((g) => {
    const days = Math.ceil((g.deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days >= 0 && days <= 30 && g.deadline !== "Rolling";
  });

  const stats = [
    {
      label: "Fully Eligible",
      value: eligible.length,
      sub: `of ${grants.length} grants`,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Partially Eligible",
      value: partial.length,
      sub: "worth reviewing",
      icon: AlertCircle,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Funding Potential",
      value: `£${(totalPotential / 1000).toFixed(0)}k`,
      sub: "from eligible grants",
      icon: PoundSterling,
      color: "text-cta",
      bg: "bg-cta/10",
    },
    {
      label: "Avg Match Score",
      value: `${avgScore}%`,
      sub: "across all grants",
      icon: TrendingUp,
      color: "text-accent",
      bg: "bg-accent/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* CIC profile banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 sm:p-5 border border-cta/20 rounded-2xl"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-cta/10 flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-cta" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Harvest Touch CIC — Intelligence Profile Active</p>
            <p className="text-xs text-muted-foreground">
              {HARVEST_TOUCH_PROFILE.location} · Youth & Wellbeing · Under £25k turnover · All grants scored against your profile
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {HARVEST_TOUCH_PROFILE.focusAreas.slice(0, 4).map((f) => (
              <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-cta/10 text-cta capitalize">
                {f}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-card p-4 sm:p-5 rounded-2xl"
            >
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <Icon className={`w-4.5 h-4.5 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-heading font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs font-medium mt-0.5">{stat.label}</p>
              <p className="text-[11px] text-muted-foreground">{stat.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Highlights row */}
      <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Top pick */}
        {topGrant && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-4 rounded-2xl border border-green-400/20 bg-green-400/5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-xs font-semibold text-green-400">Top Recommendation</span>
            </div>
            <p className="text-sm font-semibold leading-tight mb-1">{topGrant.name}</p>
            <p className="text-xs text-muted-foreground mb-2">{topGrant.funder}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{formatAmount(topGrant.amount.min, topGrant.amount.max)}</span>
              <span className="text-sm font-bold text-green-400">{topGrant.score}% match</span>
            </div>
          </motion.div>
        )}

        {/* Urgent deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card p-4 rounded-2xl border border-orange-400/20 bg-orange-400/5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-orange-400">Urgent Deadlines</span>
          </div>
          {urgentGrants.length === 0 ? (
            <p className="text-xs text-muted-foreground">No urgent deadlines in the next 30 days</p>
          ) : (
            <ul className="space-y-1.5">
              {urgentGrants.slice(0, 3).map((g) => {
                const days = Math.ceil((g.deadlineDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                return (
                  <li key={g.id} className="flex items-center justify-between text-xs">
                    <span className="text-foreground truncate pr-2">{g.name}</span>
                    <span className="text-orange-400 font-medium shrink-0">{days}d</span>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>

        {/* Quick wins */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-4 rounded-2xl border border-cta/20 bg-cta/5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-cta" />
            <span className="text-xs font-semibold text-cta">Quick Wins (Easy Apply)</span>
          </div>
          {grants.filter((g) => g.complexity === "low" && g.eligibility !== "ineligible").length === 0 ? (
            <p className="text-xs text-muted-foreground">No easy-apply grants found</p>
          ) : (
            <ul className="space-y-1.5">
              {grants
                .filter((g) => g.complexity === "low" && g.eligibility !== "ineligible")
                .slice(0, 3)
                .map((g) => (
                  <li key={g.id} className="flex items-center justify-between text-xs">
                    <span className="truncate pr-2">{g.name}</span>
                    <span className="text-cta font-medium shrink-0">{g.score}%</span>
                  </li>
                ))}
            </ul>
          )}
        </motion.div>
      </div>

      {/* Tracked grants indicator */}
      {trackedCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          You're tracking <span className="text-cta font-semibold">{trackedCount}</span> grant{trackedCount > 1 ? "s" : ""} in your pipeline.
          Switch to the <span className="text-foreground font-medium">Pipeline</span> tab to manage them.
        </motion.div>
      )}
    </div>
  );
}
