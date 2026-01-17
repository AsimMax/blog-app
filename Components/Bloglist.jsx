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
      <div className="flex justify-center gap-6 my-10">
        {["All", "Technology", "Startup", "Lifestyle"].map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={
              menu === item
                ? "bg-black text-white py-1 px-4 rounded-sm"
                : ""
            }
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
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

