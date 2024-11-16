import { createConfig, useConnect, useAccount, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "@wagmi/connectors";
import { celo } from "viem/chains";
import { http } from "viem";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

// Create config
const config = createConfig({
  chains: [celo],
  connectors: [injected()],
  transports: {
    [celo.id]: http("https://forno.celo.org"),
  },
});

export default function MiniPayProvider({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  return (
    <DynamicContextProvider
      settings={{
        appName: "Trusted Square",
        environmentId: "d9ba107d-58b4-49db-9f8b-475239b06071",
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {/* <MiniPayWidget /> */}
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}

function MiniPayWidget() {
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();

  const onConnect = async () => {
    try {
      await connect({
        connector: injected(),
      });
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  return (
    <div>
      {isConnected ? (
        <div></div>
      ) : (
        <button onClick={onConnect}>Connect MiniPay</button>
      )}
    </div>
  );
}
