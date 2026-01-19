"use client";
import React, { useState, useEffect } from "react";
import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import { toast } from "react-hot-toast";
const page = () => {
  const [blogs, setBlogs] = useState([]); // ✅ array

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.data); // ✅ FIX
  };

const deleteBlog=async(mongoId)=>{
    const response = await axios.delete('/api/blog',{
      params:{id:mongoId}
    });
    toast.success(response.data.msg);
    fetchBlogs();
}

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-4 px-3 sm:pt-12 sm:pl-16">
  <h1 className="text-lg sm:text-xl font-semibold">
    All Blogs
  </h1>

  <div className="relative mt-4 border border-gray-300 rounded-lg overflow-x-auto">
    <table className="min-w-[600px] w-full text-sm text-gray-600">
      <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-100">
        <tr>
          <th className="hidden sm:table-cell px-3 py-3">
            Author
          </th>
          <th className="px-3 py-3">Blog Title</th>
          <th className="px-3 py-3">Date</th>
          <th className="px-3 py-3 text-center">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {blogs.map((item, index) => (
          <BlogTableItem
            key={index}
            mongoId={item._id}
            title={item.title}
            author={item.author}
            authorImg={item.author.png}
            date={item.date}
            deleteBlog={deleteBlog}
          />
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default page;
