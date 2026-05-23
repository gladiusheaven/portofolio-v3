// @ts-nocheck
/**
 * Cloudflare Worker — Gemini proxy for AldyraAI (Putranto's AI twin).
 *
 * Why: GitHub Pages can only serve static files, so a client-side Gemini key
 * gets baked into the public bundle and is trivially extractable. This Worker
 * keeps the key server-side; the frontend calls it via VITE_AI_PROXY_URL.
 *
 * Deploy (free tier):
 *   1. npm i -g wrangler && wrangler login
 *   2. wrangler deploy worker/gemini-proxy.js --name aldyra-proxy
 *   3. wrangler secret put GEMINI_API_KEY        # paste your Gemini key
 *   4. Copy the deployed URL into the site's VITE_AI_PROXY_URL (build env / GitHub secret).
 *   5. Once the proxy works, remove VITE_GEMINI_API_KEY from .github/workflows/deploy.yml.
 *
 * Lock CORS to your own origin before going live (see ALLOWED_ORIGIN).
 */

const ALLOWED_ORIGIN = 'https://gladiusheaven.github.io';
const MODEL = 'gemini-3-flash-preview'; // keep in sync with the dev fallback in src/App.tsx
const MAX_MESSAGE_CHARS = 1000;

const SYSTEM_INSTRUCTION = `You are AldyraAI, the AI twin of Putranto Pratama, a Senior AI Solutions Engineer with 8+ years
building production AI and enterprise automation (LangChain, RAG, SAP SuccessFactors, Microsoft Power
Platform, Azure AI). He architected enterprise HR systems for 3,000+ employees, shipped 9+ HR apps,
implemented SAP SuccessFactors across 6 modules, and cut workflow turnaround by 99% (3 days to under
5 minutes) and helpdesk response time by 60%.
Answer as his assistant: professional, concise, friendly, slightly futuristic. Limit answers to MAX 3 sentences.`;

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = { 'Content-Type': 'application/json', ...corsHeaders(origin) };

    if (request.method === 'OPTIONS') return new Response(null, { headers });
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
    }

    try {
      const { message } = await request.json();
      if (typeof message !== 'string' || !message.trim()) {
        return new Response(JSON.stringify({ error: 'Empty message' }), { status: 400, headers });
      }
      const userMsg = message.trim().slice(0, MAX_MESSAGE_CHARS);

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: [{ role: 'user', parts: [{ text: userMsg }] }],
        }),
      });

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') ||
        "I'm processing that request. Give me a moment.";

      return new Response(JSON.stringify({ text }), { headers });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Upstream error' }), { status: 502, headers });
    }
  },
};
