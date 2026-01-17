import { ConnectDB } from "@/lib/config/db";
import { BlogModel } from "@/lib/models/Blogmodel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const fs=require('fs');
export async function GET(request) {
  try {
    await ConnectDB();

    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json({ blog });
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ data: blogs });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}




export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    let imagePath = "";
    const image = formData.get("image");

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}_${image.name}`;
      const filePath = path.join(process.cwd(), "public/images", fileName);

      await writeFile(filePath, buffer);
      imagePath = `/images/${fileName}`;
    }

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      authorImg: formData.get("authorImg"),
      image: imagePath,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Blog creation failed" },
      { status: 500 }
    );
  }
}


//Delete Blog
export async function DELETE(request) {
  const id=await request.nextUrl.searchParams.get("id");
  const blog=await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`,()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog deleted successfully"});
}