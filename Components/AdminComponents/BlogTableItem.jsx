import React from "react";
import Image from "next/image";
import { assets } from "@/Assets/assets";

const BlogTableItem = ({
  authorImg,
  title,
  author,
  date,
  deleteBlog,
  mongoId,
}) => {
  const blogDate = new Date(date);

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      {/* Author (hidden on mobile) */}
      <th
        scope="row"
        className="hidden sm:flex items-center gap-3 px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={authorImg || assets.profile_icon}
          width={36}
          height={36}
          className="rounded-full"
          alt={author ? `${author} profile image` : "Author profile image"}
        />
        <p className="text-sm">
          {author || "No author"}
        </p>
      </th>

      {/* Title */}
      <td className="px-3 py-3 text-sm text-gray-700">
        {title || "No title"}
      </td>

      {/* Date */}
      <td className="px-3 py-3 text-sm hidden sm:table-cell">
        {blogDate.toDateString()}
      </td>

      {/* Action */}
      <td
        onClick={() => deleteBlog(mongoId)}
        className="px-3 py-3 text-center text-red-600 font-bold cursor-pointer select-none active:scale-90 transition"
      >
        ✕
      </td>
    </tr>
  );
};

export default BlogTableItem;
