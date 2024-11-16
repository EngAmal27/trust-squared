import { getAddressLink } from "@/utils";
import { useMemo } from "react";
import Blockies from "react-blockies";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  address: string;
  name?: string;
}
// export const randomWalletAddress = () => {
//   const chars = "0123456789abcdef";
//   let address = "0x";
//   for (let i = 0; i < 40; i++) {
//     address += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return address;
// };

export default function TrustAccount({ address, name = "" }: ProfileCardProps) {
  return (
    <div className="flex items-centerp-4 rounded-lg px-4">
      {/* Profile Picture */}
      <Blockies
        seed={address.toLowerCase()}
        size={10}
        scale={5}
        className="rounded-full"
      />

      {/* Name and Wallet */}
      <div className="ml-4 flex flex-col">
        <Link
        
          to={getAddressLink(address)}
          className="font-medium text-lg underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {name || truncateAddress(address)}
        </Link>
        <span className="text-sm text-gray-500 mt-1">
          {truncateAddress(address)}
        </span>
      </div>
    </div>
  );
}

// Helper function to truncate address
function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
