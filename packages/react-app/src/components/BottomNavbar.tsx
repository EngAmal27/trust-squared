import { CiHome as IconHome, CiUser as IconTrusters } from "react-icons/ci";
import {
  FaHandHoldingUsd as IconDeligates,
  FaChartArea as IconHistory,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const navbarItems = {
  home: {
    icon: <IconHome className="w-8 h-auto bg-white rounded-sm p-1" />,
    label: "Home",
    route: "/",
  },
  profile: {
    icon: <IconTrusters className="w-8 h-auto bg-white rounded-sm p-1" />,
    label: "Profile",
    route: "/profile",
  },
  history: {
    icon: <IconHistory className="w-8 h-auto bg-white rounded-sm p-1" />,
    label: "History",
    route: "/history",
  },
  deligates: {
    icon: <IconDeligates className="w-8 h-auto bg-white rounded-sm p-1" />,
    label: "Deligates",
    route: "/deligates",
  },
};

export default function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4">
      <div className="flex flex-col w-[440px] mx-auto gap-8 p-4 px-8 rounded-tl-3xl rounded-tr-3xl">
        <div className="max-w-[440px] w-full flex justify-between items-center gap-2">
          <Link
            style={{
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
            to={`/truster`}
            className={`flex bg-[#36B82A4D] justify-end rounded-xl items-center flex-grow px-2 `}
          >
            <IconTrusters className="w-full h-14 rounded-sm p-1" color="#36B82A" />
            <span className="text-xl   text-[#36B82A]">$200</span>
          </Link>

          <Link
            to={`/trust`}
            style={{
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
            className="w-[90px] h-[90px] rounded-full bg-[#36B82A4D] flex-grow flex items-center justify-center"
          >
            <img src={`/qrlogo.svg`} alt="profile" />
          </Link>

          <Link
            to={`/deligates`}
            style={{
              boxShadow: "0px 4px 4px 0px #00000040",
            }}
            className={`flex bg-[#36B82A4D] justify-end rounded-xl items-center flex-grow  px-2 `}
          >
            <IconDeligates className="w-full h-14 rounded-sm p-1" color="#AC481E" />
            <span className="text-xl text-[#AC481E]">$200</span>
          </Link>

          {/* {Object.entries(navbarItems).map(([key, item]) => (
            <Link
              key={key}
              to={item.route}
              className={`flex flex-col items-center gap-1`}
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </Link>
          ))} */}
        </div>
        {/* <Button size={"lg"} className="bg-white text-black">
          Trust Someone
        </Button> */}
      </div>
    </div>
  );
}
