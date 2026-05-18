import { Redis } from "@upstash/redis"; 
 import { Ratelimit } from "@upstash/ratelimit"; 
 
 // Only initialize if environment variables are present (trim to handle accidental newlines)
 const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
 const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
 const hasUpstashVars = 
   redisUrl && 
   redisUrl !== "PASTE_HERE" &&
   redisToken &&
   redisToken !== "PASTE_HERE";

 let redis: Redis | null = null;
 if (hasUpstashVars) {
   try {
     redis = new Redis({ url: redisUrl!, token: redisToken! });
   } catch (e) {
     console.error("Failed to initialize Upstash Redis:", e);
   }
 }
 
 // General form limiter: 5 requests per 10 minutes per IP 
 export const formRateLimit = redis ? new Ratelimit({ 
   redis, 
   limiter: Ratelimit.slidingWindow(5, "10 m"), 
   analytics: true, 
   prefix: "syren:rl:forms", 
 }) : null; 
 
 // Slightly stricter for testimonials (spam magnet) 
export const testimonialRateLimit = redis ? new Ratelimit({ 
  redis, 
  limiter: Ratelimit.slidingWindow(3, "30 m"), 
  analytics: true, 
  prefix: "syren:rl:testimonials", 
}) : null; 

// Specific limiters for contact and quote leads
export const contactRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
  prefix: "syren:rl:contact",
}) : null;

export const quoteRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
  prefix: "syren:rl:quote",
}) : null; 
 
export function getClientIp(req: Request) { 
  const ip = 
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
    req.headers.get("x-real-ip")?.trim() || 
    "unknown"; 
  return ip; 
}

export async function safeLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ blocked: boolean }> {
  if (!limiter) return { blocked: false };
  try {
    const { success } = await limiter.limit(identifier);
    return { blocked: !success };
  } catch (e) {
    console.error("Rate limit check failed (Redis error):", e);
    return { blocked: false };
  }
}
