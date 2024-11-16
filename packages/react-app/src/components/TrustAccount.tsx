import { useMemo } from "react";
import Blockies from "react-blockies";

interface ProfileCardProps {
  name?: string;
}

export default function TrustAccount({ name = "John Doe" }: ProfileCardProps) {
  const randomWalletAddress = useMemo(() => {
    const chars = "0123456789abcdef";
    let address = "0x";
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  }, []);

  return (
    <div className="flex items-center p-4 border rounded-lg">
      {/* Profile Picture */}
      <Blockies
        seed={randomWalletAddress.toLowerCase()}
        size={10}
        scale={5}
        className="rounded-full"
      />

      {/* Name and Wallet */}
      <div className="ml-4 flex flex-col">
        <span className="font-medium text-lg">{name}</span>
        <span className="text-sm text-gray-500 mt-1">
          {truncateAddress(randomWalletAddress)}
        </span>
      </div>
    </div>
  );
}

// Helper function to truncate address
function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
