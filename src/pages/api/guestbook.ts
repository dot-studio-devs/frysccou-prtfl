import type { APIRoute } from "astro";
import turso from "../../lib/turso";

export const prerender = false;

const RATE_LIMIT_MINUTES = 10;
const rateLimitMap = new Map<string, number>();

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIP || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastSubmission = rateLimitMap.get(ip);

  if (lastSubmission) {
    const timeDiff = now - lastSubmission;
    const minutesPassed = timeDiff / (1000 * 60);

    if (minutesPassed < RATE_LIMIT_MINUTES) {
      return true;
    }
  }

  rateLimitMap.set(ip, now);

  setTimeout(
    () => {
      rateLimitMap.delete(ip);
    },
    RATE_LIMIT_MINUTES * 60 * 1000,
  );

  return false;
}

export const GET: APIRoute = async () => {
  try {
    const result = await turso.execute(
      "SELECT id, author, message, created_at FROM guestbook ORDER BY created_at DESC LIMIT 50",
    );
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching guestbook:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const clientIP = getClientIP(request);

    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({
          error: "rate_limit",
          message: `Please wait ${RATE_LIMIT_MINUTES} minutes before posting again.`,
        }),
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { author, message } = body;

    if (!author || !message || author.length > 50 || message.length > 500) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await turso.execute({
      sql: "INSERT INTO guestbook (author, message) VALUES (?, ?)",
      args: [author, message],
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Guestbook API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
