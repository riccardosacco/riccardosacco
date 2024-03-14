import { draftMode } from "next/headers";
import directus from "@/app/lib/directus";
import { readItem } from "@directus/sdk";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const id = searchParams.get("id");

  if (secret !== "MY_SECRET_TOKEN") {
    return new Response("Invalid token", { status: 401 });
  }

  if (!id) {
    return new Response("Missing id", { status: 401 });
  }

  const resume = await directus.request(readItem("resume", id));

  if (!resume) {
    return new Response("Invalid id", { status: 401 });
  }

  draftMode().enable();

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/resume?id=${resume.id}`,
    },
  });
}
