import { formatUnits } from "viem";
import { stats } from "./screens/Trusters";

type Stat = (typeof stats)[keyof typeof stats];

// Helper function to truncate address
export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function calculateStats(
  timePeriod: "day" | "week" | "month" | "year",
  stat: Stat
) {
  switch (timePeriod) {
    case "day":
      return {
        ...stat,
        value: stat.value / 1,
      };
    case "week":
      return {
        ...stat,
        value: stat.value / 7,
      };
    case "month":
      return {
        ...stat,
        value: stat.value / 30,
      };
    case "year":
      return {
        ...stat,
        value: stat.value / 365,
      };
  }
}

export const SAMPLE_ADDRESS = "0x2CeADe86A04e474F3cf9BD87208514d818010627";

export const formatScore = (rate: string) => {
  if (!rate) return
  const score = (Number(rate) / 1e18) * 1e5;
  const vals = score.toString().split(".");
  return vals[0] + "." + vals[1].slice(0, 2) + " ☘️";
};

export const formatFlow = (flow: string) => {
  return (Number(formatUnits(BigInt(flow), 18)) * 2592000).toFixed(2) + " G$";
};
