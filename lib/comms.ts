import { APIRoute } from "./routing";

export function post(endpoint: APIRoute, payload: unknown): Promise<Response> {
  return fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
