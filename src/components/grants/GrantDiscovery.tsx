import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GrantCard from "./GrantCard";
import { ScoredGrant } from "@/lib/eligibilityEngine";

interface GrantDiscoveryProps {
  grants: ScoredGrant[];
  trackedIds: Set<string>;
  onTrack: (grant: ScoredGrant) => void;
}

type FilterEligibility = "all" | "eligible" | "partial" | "ineligible";
type FilterComplexity = "all" | "low" | "medium" | "high";
type SortBy = "score" | "amount" | "deadline";

export default function GrantDiscovery({ grants, trackedIds, onTrack }: GrantDiscoveryProps) {
  const [search, setSearch] = useState("");
  const [eligibilityFilter, setEligibilityFilter] = useState<FilterEligibility>("all");
  const [complexityFilter, setComplexityFilter] = useState<FilterComplexity>("all");
  const [sortBy, setSortBy] = useState<SortBy>("score");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...grants];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.funder.toLowerCase().includes(q) ||
          g.focus.some((f) => f.toLowerCase().includes(q)) ||
          g.description.toLowerCase().includes(q)
      );
    }

    if (eligibilityFilter !== "all") {
      result = result.filter((g) => g.eligibility === eligibilityFilter);
    }

    if (complexityFilter !== "all") {
      result = result.filter((g) => g.complexity === complexityFilter);
    }

    result.sort((a, b) => {
      if (sortBy === "score") return b.score - a.score;
      if (sortBy === "amount") return b.amount.max - a.amount.max;
      if (sortBy === "deadline") {
        const da = a.deadline === "Rolling" ? 9999 : Math.ceil((a.deadlineDate.getTime() - Date.now()) / 86400000);
        const db = b.deadline === "Rolling" ? 9999 : Math.ceil((b.deadlineDate.getTime() - Date.now()) / 86400000);
        return da - db;
      }
      return 0;
    });

    return result;
  }, [grants, search, eligibilityFilter, complexityFilter, sortBy]);

  const eligibilityOptions: { value: FilterEligibility; label: string; color: string }[] = [
    { value: "all", label: "All", color: "" },
    { value: "eligible", label: "Eligible", color: "text-green-400" },
    { value: "partial", label: "Partial", color: "text-yellow-400" },
    { value: "ineligible", label: "Not Eligible", color: "text-red-400" },
  ];

  const complexityOptions: { value: FilterComplexity; label: string }[] = [
    { value: "all", label: "Any complexity" },
    { value: "low", label: "Easy Apply" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "Complex" },
  ];

  const sortOptions: { value: SortBy; label: string }[] = [
    { value: "score", label: "Match Score" },
    { value: "amount", label: "Funding Amount" },
    { value: "deadline", label: "Urgency" },
  ];

  const hasFilters = eligibilityFilter !== "all" || complexityFilter !== "all" || search.trim();

  return (
    <div className="space-y-5">
      {/* Search + filter bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search grants by name, funder, or focus area..."
            className="pl-9 bg-secondary border-border"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <Button
          variant={showFilters ? "secondary" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="glass-card p-4 rounded-xl space-y-4">
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Eligibility */}
            <div>
              <p className="text-xs font-medium mb-2">Eligibility</p>
              <div className="flex flex-wrap gap-1.5">
                {eligibilityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setEligibilityFilter(opt.value)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      eligibilityFilter === opt.value
                        ? "bg-cta/20 border-cta/50 text-cta"
                        : "border-border text-muted-foreground hover:text-foreground"
                    } ${opt.color}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity */}
            <div>
              <p className="text-xs font-medium mb-2">Complexity</p>
              <div className="flex flex-wrap gap-1.5">
                {complexityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setComplexityFilter(opt.value)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      complexityFilter === opt.value
                        ? "bg-cta/20 border-cta/50 text-cta"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="text-xs font-medium mb-2">Sort by</p>
              <div className="flex flex-wrap gap-1.5">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                      sortBy === opt.value
                        ? "bg-cta/20 border-cta/50 text-cta"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={() => { setSearch(""); setEligibilityFilter("all"); setComplexityFilter("all"); }}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="text-foreground font-medium">{filtered.length}</span> of{" "}
          <span className="text-foreground font-medium">{grants.length}</span> grants
          {eligibilityFilter !== "all" && (
            <span className="ml-1">· filtered by <span className="text-cta">{eligibilityFilter}</span></span>
          )}
        </p>
        {/* Quick sort pills (desktop) */}
        <div className="hidden sm:flex gap-1.5">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value)}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                sortBy === opt.value
                  ? "bg-cta/20 border-cta/50 text-cta"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grant grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No grants match your filters</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((grant, i) => (
            <GrantCard
              key={grant.id}
              grant={grant}
              index={i}
              onTrack={onTrack}
              isTracked={trackedIds.has(grant.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
