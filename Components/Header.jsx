"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const Header = () => {

const router = useRouter();
const [email, setEmail] = useState("");
const onSubmitHandler=async(e)=>{
  e.preventDefault();
  const formData=new FormData();
  formData.append('email',email);
  const response=await axios.post('/api/email',formData);
  if(response.data.success){
    toast.success(response.data.msg);
    setEmail("");
  }else{
    toast.error("Subscription failed");
  }
}

  return (
    <div className="py-4 px-4 sm:py-5 md:px-12 lg:px-28">
  {/* Top Bar */}
  <div className="flex justify-between items-center">
    <Image
      src={assets.logo}
      width={180}
      alt="logo"
      className="w-28 sm:w-40"
    />

    <button
      onClick={() => router.push("/admin")}
      className="flex items-center gap-2 font-medium py-1.5 px-3 sm:py-3 sm:px-6 border border-black transition hover:shadow-[-6px_6px_0px_#000000]"
    >
      Admin
      <Image src={assets.arrow} width={16} alt="arrow" />
    </button>
  </div>

  {/* Hero Content */}
  <div className="text-center my-8 sm:my-12">
    <h1 className="text-2xl sm:text-5xl font-medium">
      Latest Blogs
    </h1>

    <p className="mt-6 sm:mt-10 max-w-2xl mx-auto text-xs sm:text-base text-gray-700">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Expedita animi voluptatem quaerat eum ducimus numquam optio earum iusto.
    </p>

    {/* Subscribe Form */}
    <form
      onSubmit={onSubmitHandler}
      className="flex items-center max-w-md mx-auto mt-8 sm:mt-10 border border-black transition hover:shadow-[-6px_6px_0px_#000000]"
    >
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-3 py-3 text-sm sm:text-base outline-none"
        required
      />

      <button
        type="submit"
        className="border-l border-black px-4 sm:px-8 py-3 text-sm sm:text-base active:bg-gray-600 active:text-white transition"
      >
        Subscribe
      </button>
    </form>
  </div>
</div>

  );
};

export default Header;
