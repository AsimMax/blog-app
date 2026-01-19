import React from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div className="flex flex-col bg-slate-100 min-h-screen">
  {/* Top Logo */}
  <div className="px-3 sm:pl-14 py-3 border-b border-black flex items-center">
    <Image
      src={assets.logo}
      width={120}
      alt="Logo"
      className="w-24 sm:w-32"
    />
  </div>

  {/* Sidebar */}
  <div className="w-full sm:w-80 py-6 sm:py-12 border-r border-black">
    <div className="flex flex-col gap-4 px-3 sm:px-0 sm:w-[80%] sm:ml-auto">
      <Link
        href="/admin/addProduct"
        className="flex items-center gap-3 font-medium px-3 py-2 bg-white border border-black shadow-[-4px_4px_0px_#000000] active:scale-95 transition"
      >
        <Image src={assets.add_icon} alt="" width={24} />
        <p className="text-sm sm:text-base">Add Blogs</p>
      </Link>

      <Link
        href="/admin/blogList"
        className="flex items-center gap-3 font-medium px-3 py-2 bg-white border border-black shadow-[-4px_4px_0px_#000000] active:scale-95 transition"
      >
        <Image src={assets.blog_icon} alt="" width={24} />
        <p className="text-sm sm:text-base">Blog Lists</p>
      </Link>

      <Link
        href="/admin/subscriptions"
        className="flex items-center gap-3 font-medium px-3 py-2 bg-white border border-black shadow-[-4px_4px_0px_#000000] active:scale-95 transition"
      >
        <Image src={assets.email_icon} alt="" width={24} />
        <p className="text-sm sm:text-base">Subscriptions</p>
      </Link>
    </div>
  </div>
</div>

  );
};

export default Sidebar;
