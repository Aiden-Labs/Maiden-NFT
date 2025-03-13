"use client";
import ActiveStage from "@/components/active-stage";
import DiscordIcon from "@/components/icons/discord";
import XformerlyTwitterIcon from "@/components/icons/x";
import MintStage from "@/components/mint-stage";
import MintStageSkeleton from "@/components/mint-stage-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCollection from "@/hooks/useCollection";
import useDrops from "@/hooks/useDrops";
import { ExternalLinkIcon, LinkIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { useAccount, useClient } from "wagmi";

export default function Drop() {
  const chainId = process.env.NEXT_PUBLIC_COLLECTION_CHAIN
    ? parseInt(process.env.NEXT_PUBLIC_COLLECTION_CHAIN, 10)
    : null;
  const address = process.env.NEXT_PUBLIC_COLLECTION_ADDRESS ?? "";
  if (!chainId) throw new Error("Missing collection chain ID");
  if (!address) throw new Error("Missing collection address");
  const account = useAccount();
  const collection = useCollection(chainId, address);
  const drops = useDrops(chainId, address, account.address);
  const client = useClient({ chainId });
  const chain = useMemo(() => (client ? client.chain : null), [client]);
  const currentDrop = useMemo(() => {
    if (!drops.data) return null;
    const live = drops.data.data.find((drop) => drop.status === "LIVE");
    if (live) return live;
    return drops.data.data[drops.data.data.length - 1];
  }, [drops.data]);

  if (collection.error) throw new Error(collection.error.message);
  if (collection.isLoading)
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Loader2Icon className="size-10 animate-spin" />
      </div>
    );
  if (!collection.data) return <div>Collection not found</div>;

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="relative h-full flex items-center">
            {collection.data.image && (
              <Image
                src={collection.data.image}
                alt={collection.data.name}
                width={1000}
                height={1000}
                className="min-w-full min-h-full object-cover blur-3xl opacity-10"
              />
            )}
          </div>
        </div>

        <div className="container mx-auto py-28">
          <header className="p-4 flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-4xl font-semibold">{collection.data.name}</h1>
            {chain && (
              <span>
                <Badge variant="secondary">{chain?.name}</Badge>
              </span>
            )}
          </header>

          <main className="container mx-auto p-4 grid md:grid-cols-2 gap-6 md:gap-12 lg:gap-24">
            <Card className="aspect-square overflow-hidden">
              {collection.data.image && (
                <Image
                  src={collection.data.image || ""}
                  alt={collection.data.name}
                  width={800}
                  height={800}
                  className="object-cover"
                />
              )}
            </Card>

            <div className="space-y-6">
              <Card className="bg-transparent shadow-none md:shadow md:bg-card/50 border-0 md:border">
                <CardHeader className="px-0 md:px-6">
                  <CardTitle>Mint Stages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-0 md:px-6">
                  {drops.isLoading && !drops.isFetched && <MintStageSkeleton />}
                  {drops.error && <div>Error: {drops.error.message}</div>}
                  {(drops.data?.data || []).map((drop) => (
                    <MintStage
                      key={drop.id}
                      drop={drop}
                      selected={drop === currentDrop}
                    />
                  ))}
                </CardContent>
                {currentDrop && (
                  <>
                    <Separator />
                    <div className="py-6 md:px-6">
                      {currentDrop && <ActiveStage drop={currentDrop} />}
                    </div>
                  </>
                )}
              </Card>
            </div>
          </main>
        </div>
      </div>

      <Separator />

      <div className="container mx-auto p-4 mt-8">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 space-y-4">
            <h2 className="text-2xl font-bold">{collection.data.name}</h2>
            <nav className="flex gap-2">
              {chain && (
                <Button variant="outline" asChild>
                  <a
                    href={`${chain.blockExplorers?.default.url}/address/${collection.data.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    Contract {collection.data.address.slice(0, 6)}...
                    {collection.data.address.slice(-4)}
                  </a>
                </Button>
              )}
              {collection.data.website && (
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={collection.data.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {collection.data.twitter && (
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={collection.data.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2"
                  >
                    <XformerlyTwitterIcon className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {collection.data.discord && (
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={collection.data.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2"
                  >
                    <DiscordIcon className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </nav>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {collection.data.description}
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
