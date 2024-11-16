import { stats } from "./screens/History";

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
