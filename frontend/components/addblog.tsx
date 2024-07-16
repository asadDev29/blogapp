"use client";
import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import { instance } from "@/axios/instance";
import { IBlog } from "@/lib/types";
import { getBlogs } from "@/lib/getBlogs";
interface IProps {
  setBlogs: React.Dispatch<React.SetStateAction<IBlog[]>>;
}
export function AddBlog({ setBlogs }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await instance.post("/posts/", {
        title,
        content,
        author: localStorage.getItem("user_id"),
      });
      const fetchedBlogs = await getBlogs();
      setBlogs(fetchedBlogs);
      // Handle successful blog addition
      console.log("Blog added successfully");
      setIsOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add Blog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Blog</DialogTitle>
            <DialogDescription>
              {`Write your blog. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                required
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Textarea
                required
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="inline-block ms-auto" type="submit">
              Create
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="inline-block ms-auto"
              type="button"
            >
              close
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
