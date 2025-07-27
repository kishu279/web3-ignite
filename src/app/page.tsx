import AirDrop from "@/components/AirDrop";
import CheckBalance from "@/components/CheckBalance";
import GetKeyPair from "@/components/GetKeyPair";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center mx-auto max-w-7xl">
      {/* Header Section */}
      <section className="mt-10">
        {/* navbar  */}
        <div>
          <h1 className="text-3xl font-mono tracking-tighter font-bold">
            Kishu - Solana
          </h1>
        </div>
      </section>
      {/* Hero Section */}
      <section className="mt-10">
        <div className="flex flex-col items-center justify-center space-y-0 font-mono">
          {/* Feature section */}
          <h1 className="text-2xl ">Welcome to the Kishu Solana</h1>
          <p>need any assistance then please dont try to contact us</p>
        </div>
      </section>

      {/* working */}
      <section className="mt-32 flex flex-col w-full">
        <Tabs defaultValue="keyPair" className="w-full items-center space-y-2">
          <TabsList>
            <TabsTrigger value="keyPair">Key-Pair</TabsTrigger>
            <TabsTrigger value="airdrop">Airdrop</TabsTrigger>
            <TabsTrigger value="send-sol">Send Sol</TabsTrigger>
            <TabsTrigger value="balance">Check Sol Balance</TabsTrigger>
          </TabsList>
          <TabsContent value="keyPair">
            <GetKeyPair />
          </TabsContent>
          <TabsContent value="airdrop">
            <AirDrop />
          </TabsContent>
          <TabsContent value="send-sol">
            <div>
              <p>Sending will be coming soon</p>
            </div>
          </TabsContent>
          <TabsContent value="balance">
            <CheckBalance />
          </TabsContent>
        </Tabs>
      </section>

      {/* foother section */}
      <section></section>
    </div>
  );
}
