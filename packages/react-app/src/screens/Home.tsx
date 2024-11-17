import TrustAccount from "@/components/TrustAccount";
import { POOL_CONTRACT } from "@/env";
import { useGetMember } from "@/hooks/queries/useGetMember";
import { useVerifier } from "@/hooks/queries/useVerifier";
import { useBalanceStream } from "@/hooks/useBalanceStream";
import { useVerifiedIdentities } from "@/hooks/useVerifiedIdentities";
import { formatScore } from "@/utils";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { BadgeCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAccount } from "wagmi";

// const formatScore = (rate: string) => {
//     const score = ((Number(rate) / 1e18) * 1e5).toFixed(2);
//     return score + " ☘️";
//   };

export default function Home() {
  //this will try to get user verified by the backened
  const verifierResult = useVerifier();
  const account = useAccount();
  const { data } = useGetMember(account.address as string);
  // console.log({data, addr: account.address})
  const identities = useVerifiedIdentities(account.address);
  // console.log({identities})

  // @ts-ignore
  const balance = useBalanceStream(
    account.address,
    // @ts-ignore
    BigInt(data?.data?.member?.inFlowRate || 0) -
      BigInt(data?.data?.member?.outFlowRate || 0)
  );

  const { user = {} } = useDynamicContext();

  // return <div>home</div>;

  // return
  return (
    <div className="flex flex-col w-full items-center">
      <div
        style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
        className="bg-[#DFF7E2] rounded-3xl p-8 flex flex-col items-center gap-4"
      >
        {account.address && (
          <TrustAccount
            address={account.address as string}
            // @ts-ignore
            name={user?.alias || user?.email?.split("@")[0] || ""}
          />
        )}

        <QRCodeSVG
          bgColor="transparent"
          className="rounded-lg"
          value={account.address as string}
          size={200}
          level="H"
          includeMargin={true}
        />
        <div className="py-4 flex gap-4">
          {Object.entries(identities || {}).map(([k, v]) => {
            if (v)
              return (
                <div key={k} className="flex gap-4">
                  {k} <BadgeCheck color="blue" />
                </div>
              );
          })}
        </div>
        <div className="py-4 flex gap-4">
          <div className="flex justify-between items-center flex-col">
            <span>Trust Score</span>
            <span className=" text-xl text-[#36B82A]">
              {formatScore(data?.data?.member?.trustScore || "")}
            </span>
          </div>

          <div className="flex justify-between items-center flex-col">
            <span>Balance</span>
            <span className=" text-xl text-[#36B82A]">
              {balance?.toString()} G$
            </span>
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
