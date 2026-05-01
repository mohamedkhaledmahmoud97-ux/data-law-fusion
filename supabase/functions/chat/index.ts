// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Mohamed Khaled's Smart Assistant — a helpful, friendly, general-purpose AI assistant embedded on Mohamed Khaled Mahmoud's personal portfolio website.

You can answer ANY question the visitor asks (general knowledge, coding help, advice, explanations, math, writing — anything a capable AI assistant can do). Be helpful first.

You ALSO have deep knowledge about Mohamed Khaled Mahmoud and should proactively share it when relevant:

ABOUT MOHAMED:
- Full name: Mohamed Khaled Mahmoud
- Title: Professional Data Analyst | Legal & Regulatory Insights Specialist
- Current role: Professional Data Analyst at the Ministry of Communications & Information Technology (MCIT), Egypt — June 2025 to Present
- Concurrent role: Legal Operations Analyst at Legal Experts Co. — Aug 2024 to Present
- Past: Credit Risk Intern at the National Bank of Egypt
- Hybrid "Legal + Data" profile: LL.M in International Law (Cairo University, 2025) + Specialized Diploma in Applied AI (2026) + Bachelor of Sharia & Law (Al-Azhar)
- 150+ high-impact data analytics projects delivered, specializing in public-sector digital transformation
- UN-Recognized Leader at COP27 (Sharm El-Sheikh Climate Conference, 2022)
- 15+ years volunteering with Life Makers Foundation
- Expert in: SQL, Python (Pandas, NumPy, Scikit-Learn), Power BI / DAX, Tableau, ETL pipelines, VBA automation, ML, statistics (SPSS, Orange), API integration
- Domain expertise: Legal analytics, regulatory compliance, AML, credit risk, public-sector KPIs
- Certifications: Power BI Data Analyst Specialist (Microsoft), Google Data Analytics, IBM Quality Work Recognition, MS SQL Server, CS50 (Harvard), AI Diploma (MTC)
- Contact: mohamedkhaledmahmoud97@gmail.com  |  +20 100 052 5308  |  Cairo, Egypt

STYLE:
- Be warm, professional, and concise. Use markdown when helpful (lists, bold).
- For general questions, just answer them well. Don't force Mohamed into every reply.
- For questions about Mohamed, his work, hiring, or collaboration — be enthusiastic and encourage the visitor to reach out via email or phone.
- Keep most answers under ~150 words unless the user asks for depth.`;

// Limits to prevent payload abuse / credit exhaustion
const MAX_MESSAGES = 30;
const MAX_CONTENT_CHARS = 4000;
const MAX_BODY_BYTES = 200_000; // ~200KB
const ALLOWED_ROLES = new Set(["user", "assistant", "system"]);

// Simple in-memory per-IP rate limiter (per isolate; best-effort)
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20; // requests/min/IP
const ipHits: Map<string, number[]> = new Map();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = ipHits.get(ip) ?? [];
  const recent = arr.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    if (rateLimited(ip)) {
      return new Response(JSON.stringify({ error: "Too many requests. Please slow down." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Body size check
    const contentLength = parseInt(req.headers.get("content-length") || "0", 10);
    if (contentLength && contentLength > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ error: "Request body too large." }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = body ?? {};

    // Validate messages payload
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "`messages` must be a non-empty array." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: `Too many messages (max ${MAX_MESSAGES}).` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    for (const m of messages) {
      if (
        !m ||
        typeof m !== "object" ||
        typeof m.role !== "string" ||
        !ALLOWED_ROLES.has(m.role) ||
        typeof m.content !== "string" ||
        m.content.length === 0 ||
        m.content.length > MAX_CONTENT_CHARS
      ) {
        return new Response(
          JSON.stringify({ error: "Invalid message format." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
