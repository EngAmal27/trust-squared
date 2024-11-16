import TrustAccount, { randomWalletAddress } from "@/components/TrustAccount";
import { QRCodeSVG } from "qrcode.react";
import { useVerifier } from "@/hooks/queries/useVerifier";

export default function Home() {

  //this will try to get user verified by the backened
  const verifierResult = useVerifier()
  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <TrustAccount address={randomWalletAddress()} />

      <QRCodeSVG
        className=" rounded-lg p-2 shadow-xl"
        value={randomWalletAddress()}
        size={200}
        level="H"
        includeMargin={true}
      />

      <div className="py-4 flex gap-4">
        <div className="flex justify-between items-center flex-col">
          <span>Trust Score</span>
          <span className=" text-xl text-[#36B82A]">10/10</span>
        </div>

        <div className="flex justify-between items-center flex-col">
          <span>Balance</span>
          <span className=" text-xl text-[#36B82A]">$7,782.00</span>
        </div>
        {/* <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CiUser />
            <p className="text-lg">Total Supporters</p>
          </div>
          <p className="font-bold text-lg">15</p>
        </div> */}

        {/* <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CiLocationArrow1 />
            <p className="text-lg">Total Amount</p>
          </div>
          <p className="font-bold text-lg">$12,345</p>
        </div> */}
      </div>
    </div>
  );
}
