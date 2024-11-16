import TrustAccount from "@/components/TrustAccount";
import { CiUser, CiLocationArrow1 } from "react-icons/ci";

export default function Home() {
  return (
    <div>
      <TrustAccount />
      <div className="py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CiUser />
            <p className="text-lg">Total Supporters</p>
          </div>
          <p className="font-bold text-lg">15</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CiLocationArrow1 />
            <p className="text-lg">Total Amount</p>
          </div>
          <p className="font-bold text-lg">$12,345</p>
        </div>
      </div>
    </div>
  );
}
