"use client";

import { useParams } from "next/navigation";
import { blog_data, assets } from "@/Assets/assets";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/Components/Footer";
import Link from "next/link";
import axios from "axios";

const Page = () => {
  const { id } = useParams();          // ✅ FIX
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: { id },                 // ✅ FIX
    });
    setData(response.data.blog);
  };

  useEffect(() => {
    if (id) fetchBlogData();           // ✅ safe call
  }, [id]);

  if (!data) return null;

  return (
    <>
      {/* Header */}
<div className="bg-gray-200 py-4 px-4 sm:py-5 sm:px-5 md:px-12 lg:px-28">
  <div className="flex justify-between items-center">
    <Link href="/">
      <Image
        src={assets.logo}
        alt="logo"
        width={180}
        className="w-28 sm:w-40"
      />
    </Link>

    <button className="flex items-center gap-2 text-sm sm:text-base font-medium py-1.5 px-3 sm:py-3 sm:px-6 border border-black transition hover:shadow-[-6px_6px_0px_#000000]">
      Get Started
      <Image src={assets.arrow} alt="arrow" />
    </button>
  </div>

  <div className="text-center my-16 sm:my-24">
    <h1 className="text-xl sm:text-5xl font-semibold max-w-lg mx-auto leading-snug">
      {data.title}
    </h1>

    <Image
      className="mx-auto mt-4 sm:mt-6 border border-white rounded-full"
      src={data.author_img?.trim() || "/author.png"}
      alt="author"
      width={56}
      height={56}
    />
  </div>
</div>

{/* Blog Content */}
<div className="mx-4 sm:mx-5 max-w-3xl md:mx-auto -mt-16 sm:-mt-24 mb-10">
  <Image
    src={data.image}
    alt="blog"
    width={1280}
    height={720}
    className="w-full border-4 border-white rounded-lg"
  />

  <div
    className="blog-content mt-6 text-sm sm:text-base leading-relaxed"
    dangerouslySetInnerHTML={{ __html: data.description }}
  />

  <div className="my-16 sm:my-24">
    <p className="font-semibold my-4 text-sm sm:text-base">
      Share this article on social media
    </p>

    <div className="flex gap-3 sm:gap-4">
      <Image src={assets.facebook_icon} alt="facebook" width={40} />
      <Image src={assets.twitter_icon} alt="twitter" width={40} />
      <Image src={assets.googleplus_icon} alt="googleplus" width={40} />
    </div>
  </div>
</div>

<Footer />

    </>
  );
};

export default Page;
