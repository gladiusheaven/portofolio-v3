/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Dev/fallback only — exposed in the client bundle. Prefer VITE_AI_PROXY_URL in production. */
  readonly VITE_GEMINI_API_KEY?: string
  /** URL of the serverless proxy that holds the Gemini key server-side. */
  readonly VITE_AI_PROXY_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}