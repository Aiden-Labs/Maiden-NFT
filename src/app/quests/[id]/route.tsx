import liteflow from "@/lib/liteflow";
import { z } from "zod";

const schema = z.record(z.string().uuid(), z.string());

function getSecret(id: string) {
  const kols = process.env.KOLS;
  if (!kols) return null;
  try {
    // Encode with Buffer.from(JSON.stringify(obj)).toString("base64")
    const payload = JSON.parse(
      Buffer.from(kols, "base64").toString("utf-8")
    ) as unknown;
    const parsed = schema.parse(payload);
    return parsed[id];
  } catch {
    return null;
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const secret = getSecret(id);
  const { address } = (await request.json()) as { address: string };
  if (!secret) return new Response("Invalid quest ID", { status: 400 });
  if (!address) return new Response("Missing address", { status: 400 });

  const timestamp = Date.now();
  const res = await liteflow.achievements.create(
    { questId: id, userAddress: address.toLowerCase(), timestamp },
    secret
  );
  if (res.error) return new Response(res.error.message, { status: 500 });
  return new Response("Created", { status: 200 });
}
