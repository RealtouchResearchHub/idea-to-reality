import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { interests, problem } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating ideas for interests:", interests);

    const systemPrompt = `You are a business consultant and AI expert. Generate 2-3 innovative business ideas based on the user's interests and problem statement. For each idea, provide:
- A catchy title
- A clear description (2-3 sentences)
- Target market
- 4 AI/automation opportunities
- 4 recommended next steps
- A viability score (60-95)

Respond ONLY with valid JSON in this exact format:
{
  "ideas": [
    {
      "title": "string",
      "description": "string",
      "targetMarket": "string",
      "aiOpportunities": ["string", "string", "string", "string"],
      "nextSteps": ["string", "string", "string", "string"],
      "score": number
    }
  ]
}`;

    const userPrompt = `Interests/Expertise: ${interests}${problem ? `\nProblem to solve: ${problem}` : ''}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("Raw AI response:", content);

    // Parse the JSON response
    let ideas;
    try {
      // Handle potential markdown code blocks
      const jsonStr = content.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(jsonStr);
      ideas = parsed.ideas;
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Failed to parse AI response");
    }

    return new Response(JSON.stringify({ ideas }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-ideas function:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate ideas";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
