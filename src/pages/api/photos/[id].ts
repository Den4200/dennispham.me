import type { APIRoute } from "astro";
import { IMMICH_SHARE_KEY, IMMICH_URL } from "astro:env/server";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  const res = await fetch(
    `${IMMICH_URL}/api/assets/${id}/thumbnail?size=preview`,
    { headers: { "x-immich-share-key": IMMICH_SHARE_KEY } },
  );

  if (!res.ok) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(res.body, {
    headers: {
      "content-type": res.headers.get("content-type") || "image/jpeg",
      "cache-control": "public, max-age=86400",
    },
  });
};
