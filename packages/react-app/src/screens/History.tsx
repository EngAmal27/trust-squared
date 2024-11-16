import { calculateStats } from "@/utils";
import { useState } from "react";
import { CiLocationArrow1, CiUser } from "react-icons/ci";

export const stats = {
  score: {
    icon: <CiUser className="h-8 w-auto" />,
    label: "Score",
    value: 1,
  },
  netFlow: {
    icon: <CiLocationArrow1  className="h-8 w-auto" />,
    label: "Net Flow",
    value: 1,
  },
  supporters: {
    icon: <CiUser  className="h-8 w-auto" />,
    label: "Supporters",
    value: 1,
  },
  
  delegates: {
    icon: <CiLocationArrow1  className="h-8 w-auto" />,
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
  const [timePeriod] = useState<"day" | "week" | "month" | "year">("day");

  return (
    <div>
      <div className="flex justify-between items-center">
        {Object.entries(stats).map(([key, value]) => {
          const stat = calculateStats(timePeriod, value);
          return <Stat key={key} {...stat} />;
        })}
      </div>
    </div>
  );
}
