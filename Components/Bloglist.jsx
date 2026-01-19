"use client";

import React, { useEffect, useState } from "react";
import Blogitem from "./Blogitem";
import axios from "axios";

const Bloglist = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.data); // ✅ FIX
      console.log(response.data.data);
    } catch (error) {
      console.error("Blog fetch error:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
  {/* Category Filter */}
  <div className="flex flex-wrap justify-center gap-2 sm:gap-6 my-6 sm:my-10 px-3">
    {["All", "Technology", "Startup", "Lifestyle"].map((item) => (
      <button
        key={item}
        onClick={() => setMenu(item)}
        className={`px-3 py-1 text-sm sm:text-base rounded-sm border transition ${
          menu === item
            ? "bg-black text-white border-black"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        {item}
      </button>
    ))}
  </div>

  {/* Blog Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-16 px-4 xl:px-24">
    {blogs
      .filter((item) =>
        menu === "All" ? true : item.category === menu
      )
      .map((item) => (
        <Blogitem
          key={item._id}
          id={item._id}
          image={item.image}
          title={item.title}
          description={item.description}
          category={item.category}
        />
      ))}
  </div>
</div>

  );
};

export default Bloglist;

