import { createClient } from "@libsql/client/web";

const turso = createClient({
  url: import.meta.env.TURSO!,
  authToken: import.meta.env.TURSO_AUTH_TOKEN!,
});

export default turso;
