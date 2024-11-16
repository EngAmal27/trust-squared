import TrustAccount, { randomWalletAddress } from "@/components/TrustAccount";
import { useGetMemberTrustees } from "@/hooks/queries/useGetMember";
import { formatFlow, SAMPLE_ADDRESS, truncateAddress } from "@/utils";
import { useState } from "react";
import Blockies from "react-blockies";
import { CiLocationArrow1, CiUser } from "react-icons/ci";
import { etherUnits, formatUnits } from "viem";

export const stats = {
  score: {
    icon: <CiUser className="h-8 w-auto" />,
    label: "Score",
    value: 1,
  },
  netFlow: {
    icon: <CiLocationArrow1 className="h-8 w-auto" />,
    label: "Net Flow",
    value: 1,
  },
  supporters: {
    icon: <CiUser className="h-8 w-auto" />,
    label: "Supporters",
    value: 1,
  },

  delegates: {
    icon: <CiLocationArrow1 className="h-8 w-auto" />,
    label: "Delegates",
    value: 1,
  },
};

export function Stat({
  label,
  value,
  icon,
}: (typeof stats)[keyof typeof stats]) {
  return (
    <div className="flex items-center gap-1 flex-col flex-wrap">
      {icon}
      <label>{label}</label>
      <p className="text-xl font-bold text-amber-500">{value}</p>
    </div>
  );
}

export default function History() {
  const { data, status } = useGetMemberTrustees(SAMPLE_ADDRESS);

  const totalDelegates = data?.data.member.trustees.length;
  const totalFlow = data?.data.member.trustees.reduce(
    (acc, curr) => acc + Number(curr.flowRate),
    0
  );

  return (
    <div className="px-4">
      <div className="py-2">
        <TrustAccount address={randomWalletAddress()} />

        <div className="py-4 flex flex-col gap-4 items-center justify-center">
          <div className="flex items-end gap-4">
            <CiUser className="h-8 w-auto" />
            <div className="font-lg ">{"Total Delegates"}</div>
            <div className="text-xl text-[#36B82A]">{totalDelegates}</div>
          </div>

          <div className="flex items-center gap-4">
            <CiLocationArrow1 className="h-8 w-auto" />
            <div className="font-lg ">{"Total Outflow"}</div>
            <div className="text-xl text-[#36B82A]">
              {totalFlow ? formatFlow(totalFlow.toString()) : "0"}
            </div>
          </div>
        </div>
      </div>

      {/* Headers */}
      <div className="flex justify-between py-4 font-semibold text-gray-600">
        <div>Address</div>
        <div>Amount Delegated</div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {data?.data.member.trustees.map((t) => (
          <div key={t.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Blockies
                seed={t.id.toLowerCase()}
                size={8}
                scale={4}
                className="rounded-full"
              />
              <div>
                {/* <div className="font-medium">{trustee.name}</div> */}
                <div className="text-sm text-gray-500">
                  {truncateAddress(t.id)}
                </div>
              </div>
            </div>
            <div className="font-medium">
              {formatFlow(t.flowRate.toString())}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
