'use client'
import React, { use } from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const page = () => {
    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        title:'',
        description:'',
        category:'Startup',
        author:'Asim',
        authorImg:"/author_img.jpg"
    })
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}));
        console.log(data);
    }
    const onSubmitHandler = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('category', data.category);
  formData.append('author', data.author);
  formData.append('authorImg', data.authorImg);
  if (image) formData.append('image', image); 
  try {
    const response = await axios.post('/api/blog', formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setImage(false);
      setData({
        title:'',
        description:'',
        category:'Startup',
        author:'Asim',
        authorImg:"/author_img.jpg"
    });
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.error(err);
    toast.error('Server error!');
  }
};

  return (
    <>
    <form
  onSubmit={onSubmitHandler}
  className="pt-4 px-3 sm:pt-12 sm:px-5 sm:pl-16"
>
  <p className="text-lg sm:text-xl font-medium">Upload Thumbnail</p>

  <label
    htmlFor="image"
    className="block mt-3 w-fit cursor-pointer"
  >
    <Image
      className="rounded border max-w-full h-auto"
      src={!image ? assets.upload_area : URL.createObjectURL(image)}
      width={180}
      height={100}
      alt="Upload Area"
    />
  </label>

  <input
    onChange={(e) => setImage(e.target.files[0])}
    type="file"
    id="image"
    hidden
    required
  />

  <p className="text-lg sm:text-xl mt-4 font-medium">Blog Title</p>
  <input
    name="title"
    onChange={onChangeHandler}
    value={data.title}
    className="w-full sm:max-w-2xl mt-2 px-3 py-2 sm:py-3 border rounded outline-none"
    type="text"
    placeholder="Type here"
    required
  />

  <p className="text-lg sm:text-xl mt-4 font-medium">
    Blog Description
  </p>
  <textarea
    name="description"
    onChange={onChangeHandler}
    value={data.description}
    className="w-full sm:max-w-2xl mt-2 px-3 py-2 sm:py-3 border rounded outline-none"
    placeholder="Write content here"
    rows={5}
    required
  />

  <p className="text-lg sm:text-xl mt-4 font-medium">Blog Category</p>
  <select
    name="category"
    onChange={onChangeHandler}
    value={data.category}
    className="w-full sm:w-48 mt-2 px-3 py-2 sm:py-3 border rounded text-gray-600"
  >
    <option value="Startup">Startup</option>
    <option value="Technology">Technology</option>
    <option value="Lifestyle">Lifestyle</option>
  </select>

  <button
    type="submit"
    className="mt-6 w-full sm:w-40 h-11 sm:h-12 bg-black text-white rounded active:scale-95 transition"
  >
    ADD
  </button>
</form>

    </>
  )
}

export default page
