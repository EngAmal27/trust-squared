import { stats } from "./screens/History";

type Stat = (typeof stats)[keyof typeof stats];

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
