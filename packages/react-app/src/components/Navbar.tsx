import { CiSettings } from "react-icons/ci";



export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4">
      <img src="/logo1.svg" alt="logo" className="w-12" />
      <CiSettings className="w-8 h-auto" />
    </div>
  );
}
