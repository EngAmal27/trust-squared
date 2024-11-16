import TrustAccount, { randomWalletAddress } from "@/components/TrustAccount";
import { QRCodeSVG } from "qrcode.react";
import { useVerifier } from "@/hooks/queries/useVerifier";
import { useGetMember } from "@/hooks/queries/useGetMember";
import { formatScore, SAMPLE_ADDRESS } from "@/utils";
import { useBalance } from "wagmi";
import { useAccount } from "wagmi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useBalanceStream } from "@/hooks/useBalanceStream";

// const formatScore = (rate: string) => {
//     const score = ((Number(rate) / 1e18) * 1e5).toFixed(2);
//     return score + " ☘️";
//   };

export default function Home() {
  //this will try to get user verified by the backened
  const verifierResult = useVerifier();
  const account = useAccount()
  const { data } = useGetMember(account.address as string)
  const balance = useBalanceStream(account.address, data?.data.member.inFlowRate - data?.data.member.outFlowRate)

  // if (status === "pending") return <div>Loading...</div>;

  // if (status === "error") return <div>Error</div>;

  // if (!data) return <div>No data</div>;

  const { user } = useDynamicContext()
  return (
    <div className="flex flex-col w-full items-center">
      <div
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        className="bg-[#DFF7E2] rounded-3xl p-8 flex flex-col items-center gap-4"
      >
        <TrustAccount address={account.address as string} name={user?.alias || user?.email} />

        <QRCodeSVG
          bgColor="transparent"
          className="rounded-lg"
          value={account.address as string}
          size={200}
          level="H"
          includeMargin={true}
        />

        <div className="py-4 flex gap-4">
          <div className="flex justify-between items-center flex-col">
            <span>Trust Score</span>
            <span className=" text-xl text-[#36B82A]">
              {formatScore(data?.data.member.trustScore || "")}
            </span>
          </div>

          <div className="flex justify-between items-center flex-col">
            <span>Balance</span>
            <span className=" text-xl text-[#36B82A]">{balance?.toString()} G$</span>
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
    </div>
  );
}
