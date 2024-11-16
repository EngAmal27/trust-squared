import { Button } from "@/components/ui/button";
import { IEthereum } from "@dynamic-labs/ethereum";

export default function Login() {
  const isMiniPay = (
    window as Window & {
      ethereum: IEthereum & {
        isMiniPay?: boolean;
      };
    }
  )?.ethereum?.isMiniPay;

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-auto max-w-md mx-auto">
      <img src="/logo2.svg" alt="logo" className="w-44" />
      <p className="text-center text-sm text-muted-foreground mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.{" "}
      </p>
      <Button
        className="min-w-80"
        onClick={() => {
          if (isMiniPay) {
            window.location.href = "https://minipay.celo.org";
          }
        }}
      >
        Login {isMiniPay ? "with MiniPay" : null}
      </Button>
    </div>
  );
}
