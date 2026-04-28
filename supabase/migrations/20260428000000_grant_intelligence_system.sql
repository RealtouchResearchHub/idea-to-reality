-- Grant Intelligence System: persistent pipeline tracking

CREATE TABLE public.grant_pipeline (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  grant_id TEXT NOT NULL,
  grant_name TEXT NOT NULL,
  funder TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'shortlisted'
    CHECK (stage IN ('shortlisted', 'in_progress', 'submitted', 'awarded', 'unsuccessful')),
  notes TEXT,
  amount_min INTEGER,
  amount_max INTEGER,
  deadline TEXT,
  match_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.grant_pipeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can manage their own pipeline entries"
ON public.grant_pipeline
FOR ALL
USING (true)
WITH CHECK (true);

-- Grant application drafts

CREATE TABLE public.grant_drafts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  grant_id TEXT NOT NULL,
  grant_name TEXT NOT NULL,
  funder TEXT NOT NULL,
  draft_content TEXT NOT NULL,
  additional_context TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.grant_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can manage their own drafts"
ON public.grant_drafts
FOR ALL
USING (true)
WITH CHECK (true);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_grant_pipeline_updated_at
  BEFORE UPDATE ON public.grant_pipeline
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
