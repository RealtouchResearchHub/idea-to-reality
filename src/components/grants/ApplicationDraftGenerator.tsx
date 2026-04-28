import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, Check, RefreshCw, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ScoredGrant } from "@/lib/eligibilityEngine";
import { GRANTS } from "@/lib/grantData";
import { scoreGrant } from "@/lib/eligibilityEngine";
import { supabase } from "@/integrations/supabase/client";

interface DraftSection {
  title: string;
  content: string;
}

interface ApplicationDraftGeneratorProps {
  preselectedGrant?: ScoredGrant | null;
}

const HARVEST_TOUCH_CONTEXT = `
Organisation: Harvest Touch CIC
Type: Community Interest Company (CIC)
Location: Rochdale, Greater Manchester
Focus: Youth wellbeing, skills development, digital literacy, mental health
Beneficiaries: Young people aged 8–25, particularly from disadvantaged communities in Rochdale
Key Programmes:
  - 6-Week Wellbeing Programme: structured group sessions covering mindfulness, resilience, peer support
  - AI & Digital Skills Training / Future Skills Lab: workshops teaching digital skills, AI literacy, employability
  - Community Engagement Activities: events and outreach connecting young people to local opportunities
Organisation Size: Small CIC, under £25,000 annual turnover, passionate community-based team
Existing Documents: Safeguarding policy, bank account, governing document (Articles of Association), equalities policy
Track Record: Delivering community benefit since 2023, with measurable impact on young people's confidence and skills
Values: Community-first, inclusive, evidence-based, youth-led where possible
`;

function buildPrompt(grant: ScoredGrant, additionalContext: string): string {
  return `You are a highly experienced UK grant writer specialising in community organisations and CICs.

Write a compelling grant application for Harvest Touch CIC applying to: ${grant.name} (${grant.funder})

Grant details:
- Funding: £${grant.amount.min.toLocaleString()}–£${grant.amount.max.toLocaleString()}
- Priority areas: ${grant.priorityAreas.join(", ")}
- Focus: ${grant.focus.join(", ")}
- Description: ${grant.description}

Organisation context:
${HARVEST_TOUCH_CONTEXT}

${additionalContext ? `Additional context from the user:\n${additionalContext}\n` : ""}

Generate a structured application with these sections:
1. Project Title
2. Executive Summary (2–3 sentences, punchy opener)
3. The Need / Problem (evidence of local need in Rochdale)
4. Our Solution / Project Description (how Harvest Touch will address it)
5. Impact & Outcomes (specific, measurable SMART outcomes)
6. Budget Overview (high-level breakdown appropriate to grant size)
7. Why Harvest Touch (organisation credibility)
8. Sustainability (how the work continues beyond grant period)

Write in a warm, confident, community-focused tone. Be specific about Rochdale and the young people served.
Use UK English. Format each section clearly with a heading.`;
}

export default function ApplicationDraftGenerator({ preselectedGrant }: ApplicationDraftGeneratorProps) {
  const { toast } = useToast();
  const [selectedGrantId, setSelectedGrantId] = useState<string>(preselectedGrant?.id ?? "");
  const [additionalContext, setAdditionalContext] = useState("");
  const [generating, setGenerating] = useState(false);
  const [draft, setDraft] = useState<DraftSection[]>([]);
  const [rawDraft, setRawDraft] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0, 1, 2]));
  const [copiedSection, setCopiedSection] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState(false);

  const scoredGrants = GRANTS.map(scoreGrant).sort((a, b) => b.score - a.score);
  const selectedGrant = scoredGrants.find((g) => g.id === selectedGrantId) ?? preselectedGrant ?? null;

  const toggleSection = (i: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const parseDraft = (raw: string): DraftSection[] => {
    const sections: DraftSection[] = [];
    const lines = raw.split("\n");
    let currentTitle = "";
    let currentContent: string[] = [];

    for (const line of lines) {
      const headingMatch = line.match(/^#+\s+(.+)$/) || line.match(/^\*\*(.+)\*\*$/) || line.match(/^(\d+\.\s+[A-Z].+)$/);
      if (headingMatch) {
        if (currentTitle) {
          sections.push({ title: currentTitle, content: currentContent.join("\n").trim() });
        }
        currentTitle = headingMatch[1].replace(/^\d+\.\s+/, "").replace(/\*\*/g, "");
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }
    if (currentTitle) {
      sections.push({ title: currentTitle, content: currentContent.join("\n").trim() });
    }
    return sections.filter((s) => s.content.length > 0);
  };

  const handleGenerate = async () => {
    if (!selectedGrant) {
      toast({ title: "Please select a grant first", variant: "destructive" });
      return;
    }

    setGenerating(true);
    setDraft([]);
    setRawDraft("");

    try {
      const { data, error } = await supabase.functions.invoke("generate-grant-application", {
        body: {
          prompt: buildPrompt(selectedGrant, additionalContext),
          grantName: selectedGrant.name,
          funderName: selectedGrant.funder,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const raw: string = data.draft ?? data.text ?? data.content ?? "";
      setRawDraft(raw);
      setDraft(parseDraft(raw));
      setExpandedSections(new Set(Array.from({ length: 10 }, (_, i) => i)));
    } catch (err: any) {
      toast({
        title: "Generation failed",
        description: err.message ?? "Please try again. If using the demo, the AI function needs to be deployed.",
        variant: "destructive",
      });
      // Fallback demo draft
      const demo = generateDemoDraft(selectedGrant);
      setRawDraft(demo);
      setDraft(parseDraft(demo));
      setExpandedSections(new Set(Array.from({ length: 10 }, (_, i) => i)));
    } finally {
      setGenerating(false);
    }
  };

  const copySection = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedSection(index);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(rawDraft);
    setAllCopied(true);
    toast({ title: "Full draft copied to clipboard!" });
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-heading font-bold mb-1">AI Application Draft Generator</h2>
        <p className="text-sm text-muted-foreground">
          Select a grant, add any extra context, and let AI generate a complete first draft in seconds.
        </p>
      </div>

      {/* Grant selector */}
      <div className="glass-card p-5 rounded-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Grant to Apply For</label>
          <select
            value={selectedGrantId}
            onChange={(e) => setSelectedGrantId(e.target.value)}
            className="w-full rounded-lg bg-secondary border border-border px-3 py-2 text-sm text-foreground"
          >
            <option value="">— Choose a grant —</option>
            {scoredGrants.map((g) => (
              <option key={g.id} value={g.id}>
                {g.score}% · {g.name} ({g.funder}) — {g.eligibility === "eligible" ? "✓ Eligible" : g.eligibility === "partial" ? "~ Partial" : "✗ Ineligible"}
              </option>
            ))}
          </select>
        </div>

        {selectedGrant && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-cta/5 border border-cta/20 text-xs space-y-1"
          >
            <p className="font-semibold text-cta">{selectedGrant.name}</p>
            <p className="text-muted-foreground">
              {selectedGrant.funder} · £{selectedGrant.amount.min.toLocaleString()}–£{selectedGrant.amount.max.toLocaleString()} · {selectedGrant.score}% match
            </p>
            <p className="text-muted-foreground">Priority: {selectedGrant.priorityAreas.slice(0, 3).join(", ")}</p>
          </motion.div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">
            Additional Context <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Textarea
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="e.g. We recently ran 3 wellbeing sessions with 24 young people... or mention specific stats, partnerships, or outcomes you want highlighted..."
            className="min-h-[80px] bg-secondary border-border text-sm"
          />
        </div>

        <Button
          variant="cta"
          size="lg"
          className="w-full"
          onClick={handleGenerate}
          disabled={!selectedGrant || generating}
        >
          {generating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating Draft...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Application Draft
            </>
          )}
        </Button>
      </div>

      {/* Draft output */}
      {draft.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-heading font-semibold">Your Application Draft</h3>
              <p className="text-xs text-muted-foreground">
                For: {selectedGrant?.name} · {draft.length} sections generated
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleGenerate} disabled={generating}>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Regenerate
              </Button>
              <Button variant="cta" size="sm" onClick={copyAll}>
                {allCopied ? (
                  <><Check className="w-3.5 h-3.5 mr-1.5" />Copied!</>
                ) : (
                  <><Copy className="w-3.5 h-3.5 mr-1.5" />Copy All</>
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {draft.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl overflow-hidden border border-border/50"
              >
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => toggleSection(i)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-cta/10 flex items-center justify-center">
                      <FileText className="w-3 h-3 text-cta" />
                    </div>
                    <span className="text-sm font-semibold">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); copySection(section.content, i); }}
                      className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy section"
                    >
                      {copiedSection === i ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {expandedSections.has(i) ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>
                {expandedSections.has(i) && (
                  <div className="px-4 pb-4 pt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {section.content}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center pt-2">
            This is an AI-generated first draft. Review, personalise, and add your own evidence before submitting.
          </p>
        </motion.div>
      )}
    </div>
  );
}

function generateDemoDraft(grant: ScoredGrant): string {
  return `## Project Title
Empowering Rochdale's Young People: Harvest Touch Wellbeing & Skills Programme

## Executive Summary
Harvest Touch CIC delivers transformative wellbeing and skills programmes for young people aged 8–25 in Rochdale. Through our evidence-based 6-Week Wellbeing Programme and AI & Digital Skills Training, we directly address the mental health and employment challenges facing disadvantaged young people in our community. We are seeking £${Math.min(grant.amount.max, 10000).toLocaleString()} to expand our reach and deepen our impact across Rochdale Borough.

## The Need / Problem
Rochdale consistently ranks among the most deprived areas in England, with youth unemployment running at 18% above the national average. One in four young people in our target age group report experiencing mental health difficulties, yet local provision remains significantly underfunded. We hear directly from families that young people are falling through the gaps — disengaged from school, isolated from peers, and lacking the skills and confidence to access opportunities.

## Our Solution / Project Description
Harvest Touch CIC will deliver our proven 6-Week Wellbeing Programme to 30 young people aged 8–16, alongside our Future Skills Lab digital training sessions for 16–25 year olds not in education, employment or training (NEET). Our programmes use peer-supported learning, mindfulness techniques, and hands-on digital skill building to create lasting change. Each participant receives a tailored support plan and ongoing check-ins beyond the programme period.

## Impact & Outcomes
By the end of the funding period, we will:
- 30 young people complete the 6-Week Wellbeing Programme (80% completion target)
- 85% of participants report improved wellbeing scores (measured via validated PHQ-A)
- 20 young people complete digital skills modules with recognised certification
- 70% of NEET participants move into employment, education or training within 3 months
- 2 community showcase events engaging 100+ local families

## Budget Overview
- Staffing (programme delivery & coordination): 60%
- Materials, resources & venue: 20%
- Monitoring, evaluation & reporting: 10%
- Contingency: 10%
Total requested: £${Math.min(grant.amount.max, 10000).toLocaleString()}

## Why Harvest Touch
Founded in 2023, Harvest Touch CIC was built from lived experience of the challenges facing young people in Rochdale. Our small but committed team has already delivered community benefit to over 80 young people in our first year, with 92% of participants rating our programmes as "excellent" or "very good." We hold a current safeguarding policy, equalities policy, and governing documents, and are fully compliant with CIC regulatory requirements.

## Sustainability
Beyond this funding period, Harvest Touch will diversify income through a blended funding model: additional grant applications (including to National Lottery Community Fund and Action Together), social enterprise income from digital training consultancy, and a growing network of local business sponsors. The skills and confidence built in our beneficiaries create lasting community resilience that extends far beyond any single programme cycle.`;
}
