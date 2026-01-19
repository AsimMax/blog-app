import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Layout({ children }) {
  return (
    <>
      <div className="flex min-h-screen">
  <ToastContainer theme="dark" />

  {/* Sidebar (hide on mobile if needed) */}
  <Sidebar />

  <div className="flex flex-col w-full">
    {/* Header */}
    <div className="flex items-center justify-between w-full py-3 px-4 sm:px-12 border-b border-black">
      <h3 className="text-sm sm:text-base font-medium">
        Admin Panel
      </h3>

      <Image
        src={assets.profile_icon}
        width={36}
        height={36}
        className="sm:w-10 sm:h-10"
        alt="Profile"
      />
    </div>

    {/* Page Content */}
    <div className="flex-1">
      {children}
    </div>
  </div>
</div>

    </>
  );
}
