import React from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";
const BlogTableItem = ({ authorImg, title, author ,date,deleteBlog,mongoId}) => {
  const blogDate = new Date(date);
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={authorImg || assets.profile_icon}
          width={40}
          height={40}
          alt={author ? `${author} profile image` : "Author profile image"}
        />
        <p>{author || "no author"}</p>
      </th>

      <td className="px-6 py-4">
        {title || "no title"}
      </td>

      <td className="px-6 py-4">
        {blogDate.toDateString()}
      </td>

      <td onClick={()=>deleteBlog(mongoId)} className="px-6 py-4 cursor-pointer">
        x
      </td>
    </tr>
  );
};

export default BlogTableItem;
