"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { celo } from "viem/chains";
import { http } from "wagmi";

export const config = createConfig({
  chains: [celo], // Pass your required chains as an array
  transports: {
    [celo.id]: http(),
    // For each of your required chains, add an entry to `transports` with
    // a key of the chain's `id` and a value of `http()`
  },
});

export const queryClient = new QueryClient();

export default function MyPrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId="cm3kpbwsx03ob10na4po85hno"
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "/logo2.svg",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
