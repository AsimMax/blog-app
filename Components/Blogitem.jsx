import React from 'react'
import Image from 'next/image'
import { assets,blog_data } from '@/Assets/assets'
import Link from 'next/link'
const Blogitem = ({title,description,category,image,id}) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white border border-black transition hover:shadow-[-6px_6px_0px_#000000]">
  <Link href={`/blogs/${id}`}>
    <Image
      src={image}
      width={400}
      height={400}
      alt="blog image"
      className="w-full h-auto border-b border-black object-cover"
    />
  </Link>

  <p className="ml-4 mt-4 px-2 py-0.5 inline-block bg-black text-white text-xs sm:text-sm">
    {category}
  </p>

  <div className="p-4 sm:p-5">
    <h5 className="mb-2 text-base sm:text-lg font-medium tracking-tight text-gray-900 line-clamp-2">
      {title}
    </h5>

    <p
      className="mb-3 text-sm text-gray-700 line-clamp-3"
      dangerouslySetInnerHTML={{
        __html: description.slice(0, 120),
      }}
    />

    <Link
      href={`/blogs/${id}`}
      className="inline-flex items-center py-2 font-semibold text-sm sm:text-base"
    >
      Read more
      <Image
        src={assets.arrow}
        alt="arrow"
        className="inline-block ml-2"
        width={12}
      />
    </Link>
  </div>
</div>

  )
}

export default Blogitem
