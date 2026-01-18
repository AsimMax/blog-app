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
    <div className="flex-1 pt-5 px-3 sm:pt-12 sm:pl-16">
  <h1>All blogs</h1>

  <div className="relative h-[80vh] max-w-4xl overflow-x-auto mt-4 border border-gray-400">
    <table className="w-full text-sm text-gray-500">
      <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
        <tr>
          <th className="hidden sm:table-cell px-4 py-3">Author name</th>
          <th className="px-4 py-3">Blog Title</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Action</th>
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
