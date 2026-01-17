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
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image src={assets.logo} width={180} alt="logo" className="w-32 sm:w-auto" />
        <button onClick={() => router.push("/admin")} className="flex items-center gap-2 font-medium py-1 px-3 *:sm:py-3 sm-px-6 border border-solid border-black hover:shadow-[-7px_7px_0px_#000000]">Admin <Image src={assets.arrow} width={20} alt="arrow" /></button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-2xl mx-auto m-auto text-xs sm:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita animi voluptatem quaerat eum ducimus numquam optio earum iusto.</p>
        <form onSubmit={onSubmitHandler} className="flex justify-between max-w-md mx-auto scale-75 sm:scale-100 mt-10 border border-black hover:shadow-[-7px_7px_0px_#000000]" action="">
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" className="pl-4 outline-none"/>
            <button type="submit" className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Header;
