import React from "react";
import MiniPayProvider from "./minipayProvider";
import DynamicProvider from "./dynamicProvider";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMiniPay = () => {
    if (window && window.ethereum) {
      // User has a injected wallet

      // @ts-expect-error
      if (window.ethereum.isMiniPay) {
        console.log("MiniPay detected");
        return true;
      }
    }
    console.log("MiniPay not detected");
    return false;
  };

  console.log("isMiniPay", isMiniPay());

  

  return isMiniPay() ? (
    <MiniPayProvider queryClient={queryClient}>{children}</MiniPayProvider>
  ) : (
    <DynamicProvider queryClient={queryClient}>{children}</DynamicProvider>
  );
}
