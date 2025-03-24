import liteflow from "@/lib/liteflow";
import kols from "../../../../kol.json";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id as keyof typeof kols;
  const secret = kols[id];
  const { address } = await request.json();
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
