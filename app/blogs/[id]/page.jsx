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
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              alt="logo"
              width={180}
              className="w-32 sm:w-auto"
            />
          </Link>

          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black hover:shadow-[-7px_7px_0px_#000000]">
            Get Started
            <Image src={assets.arrow} alt="arrow" />
          </button>
        </div>

        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-lg mx-auto">
            {data.title}
          </h1>

          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.author_img?.trim()|| "/author.png"}
            alt="author"
            width={60}
            height={60}
          />
        </div>
      </div>

      {/* Blog Content */}
      <div className="mx-5 max-w-3xl md:mx-auto -mt-24 mb-10">
        <Image
          src={data.image}
          alt="blog"
          width={1280}
          height={720}
          className="w-full border-4 border-white"
        />

        <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}></div>

        <div className="my-24">
          <p className="font-semibold my-4">
            Share this article on social media
          </p>

          <div className="flex gap-4">
            <Image src={assets.facebook_icon} alt="facebook" width={50} />
            <Image src={assets.twitter_icon} alt="twitter" width={50} />
            <Image src={assets.googleplus_icon} alt="googleplus" width={50} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Page;
