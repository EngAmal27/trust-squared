import { Button } from "@/components/ui/button";
import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
import { injected } from "@wagmi/connectors";
import { useConnect } from "wagmi";
import { useAccount } from "wagmi";

export default function Login() {
  const { connect } = useConnect();

  let isMiniPlay = false;
  if (window && window.ethereum) {
    // User has a injected wallet

    // @ts-expect-error
    if (window.ethereum.isMiniPay) {
      isMiniPlay = true;
    }
  }

  const onConnectMiniPay = () => {
    try {
      connect({
        connector: injected(),
      });
    } catch (error) {
      console.error("Error connecting:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-auto max-w-md mx-auto">
      <img src="/logo2.svg" alt="logo" className="w-44" />
      {isMiniPlay ? (
        <Button onClick={onConnectMiniPay}>Connect MiniPay</Button>
      ) : (
        <DynamicConnectButton buttonClassName="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90">
          Connect Wallet
        </DynamicConnectButton>
      )}
      {/* Connect Wallet */}
    </div>
  );
}
