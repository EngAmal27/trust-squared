import { QRCodeSVG } from "qrcode.react";
import { useMemo } from "react";
import Blockies from "react-blockies";
import TrustAccount from "./TrustAccount";

interface ProfileCardProps {
  email?: string;
  trustScore?: number;
}

export default function ProfileCard({
  email,
  trustScore = 85,
}: ProfileCardProps) {
  const randomWalletAddress = useMemo(() => {
    const chars = "0123456789abcdef";
    let address = "0x";
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      {/* User Profile Section */}
      <TrustAccount name={email || truncateAddress(randomWalletAddress)} />
      {/* <div className="flex items-center gap-4 mb-6 w-full">
        <Blockies
          seed={randomWalletAddress.toLowerCase()}
          size={10}
          scale={4}
          className="rounded-full"
        />
        <div className="flex-1">
          <p className="font-medium">
            {email || truncateAddress(randomWalletAddress)}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Trust Score:</span>
            <div className="flex items-center gap-1">
              <span className="text-green-600 font-medium">{trustScore}</span>
              <span className="text-xs text-gray-400">/100</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* QR Code Section */}
      <div className="border rounded-lg p-4 shadow-sm">
        <QRCodeSVG
          value={truncateAddress(randomWalletAddress)}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>
      <p className="mt-4 font-medium text-base">Scan to delegate</p>
      <p className="mt-2 text-sm break-all text-center text-gray-500">
        {randomWalletAddress}
      </p>
    </div>
  );
}

// Helper function to truncate address
export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
