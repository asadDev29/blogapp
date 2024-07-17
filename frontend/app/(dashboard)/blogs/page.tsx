"use client";
import { instance } from "@/axios/instance";
import { AddBlog } from "@/components/addblog";
import Blog from "@/components/Blog";
import { getBlogs } from "@/lib/getBlogs";
import { blogs } from "@/lib/mock-data";
import { IBlog } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  useEffect(() => {
    (async () => {
      const fetchedBlogs = await getBlogs();
      setBlogs(fetchedBlogs);
    })();
  }, []);
  const deleteBlog = async (id: number) => {
    console.log("clicked");
    try {
      const token = localStorage.getItem("token");

      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await instance.delete(`/posts/${id}`);
      const fetchedBlogs = await getBlogs();
      setBlogs(fetchedBlogs);
      // Handle successful blog addition
      console.log("Blog added successfully");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };
  return (
    <div className="container">
      <div className="flex justify-between gap-2 pb-5">
        <h2 className="scroll-m-20   text-3xl font-semibold tracking-tight first:mt-0">
          Blogs
        </h2>
        <AddBlog setBlogs={setBlogs} />
      </div>
      <div className="flex flex-col gap-6 ">
        {blogs?.length &&
          blogs.map((blog) => (
            <Blog deleteBlog={deleteBlog} blog={blog} key={blog.id} />
          ))}
      </div>
    </div>
  );
};

export default BlogsPage;
