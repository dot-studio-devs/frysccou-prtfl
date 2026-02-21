import { createClient } from '@libsql/client/web';
export { renderers } from '../../renderers.mjs';

const turso = createClient({
  url: "libsql://frysccou-dev-esspindola.aws-us-east-1.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njk3MDk2MDcsImlkIjoiYzJjOTNkM2QtNTQ3NC00NGY4LWIzZWUtZGM0MzczMTI0ODZkIiwicmlkIjoiNTk0YmJlMjctNDVmMy00NTg0LWJkYWMtYmU5ZjdkNjUxNjU5In0.a1tGJimEf0Nk0v9pMpCOLKl6ShsK15wHzehwi78ydGwXBFOynFPI_ZdTZK2C5iG7IUpaJQfkiCUiGvuunQzwCw"
});

const prerender = false;
const RATE_LIMIT_MINUTES = 10;
const rateLimitMap = /* @__PURE__ */ new Map();
function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIP || "unknown";
}
function isRateLimited(ip) {
  const now = Date.now();
  const lastSubmission = rateLimitMap.get(ip);
  if (lastSubmission) {
    const timeDiff = now - lastSubmission;
    const minutesPassed = timeDiff / (1e3 * 60);
    if (minutesPassed < RATE_LIMIT_MINUTES) {
      return true;
    }
  }
  rateLimitMap.set(ip, now);
  setTimeout(
    () => {
      rateLimitMap.delete(ip);
    },
    RATE_LIMIT_MINUTES * 60 * 1e3
  );
  return false;
}
const GET = async () => {
  try {
    const result = await turso.execute(
      "SELECT id, author, message, created_at FROM guestbook ORDER BY created_at DESC LIMIT 50"
    );
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching guestbook:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const clientIP = getClientIP(request);
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({
          error: "rate_limit",
          message: `Please wait ${RATE_LIMIT_MINUTES} minutes before posting again.`
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { author, message } = body;
    if (!author || !message || author.length > 50 || message.length > 500) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    await turso.execute({
      sql: "INSERT INTO guestbook (author, message) VALUES (?, ?)",
      args: [author, message]
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Guestbook API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
