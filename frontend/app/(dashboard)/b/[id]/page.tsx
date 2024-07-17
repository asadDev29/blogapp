"use client";
import { instance } from "@/axios/instance";
import { AddBlog } from "@/components/addblog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDateFromString } from "@/lib/getDate";
import { IBlog, IComment } from "@/lib/types";
import { fetchBlog, fetchComments } from "@/lib/utils";
import { useEffect, useState, FormEvent } from "react";

interface IProps {
  params: { id: string };
}
const BlogPage = ({ params }: IProps) => {
  const [blog, setBlog] = useState<IBlog>();
  const [comments, setComments] = useState<IComment[]>();
  const [comment, setComment] = useState("");
  const [userId, setuserId] = useState("");
  useEffect(() => {
    const id = localStorage.getItem("user_id") || "";
    setuserId(id);
  }, []);
  useEffect(() => {
    (async () => {
      const fetchedBlog = await fetchBlog(params.id);
      setBlog(fetchedBlog);
      const fetchedComments = await fetchComments(params.id);
      setComments(fetchedComments);
    })();
  }, [params.id]);
  const handlepostComment = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await instance.post(`/posts/${params.id}/comments/`, {
        content: comment,
        post: params.id,
        author: userId,
      });
      setComment("");
      const fetchedComments = await fetchComments(params.id);
      setComments(fetchedComments);
    } catch (error) {
      throw new Error("Failed to fetch comments data");
    }
  };
  const deleteComment = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await instance.delete(
        `/posts/${params.id}/comments/${id}/`
      );
      const fetchedComments = await fetchComments(params.id);
      setComments(fetchedComments);
    } catch (error) {
      throw new Error("Failed to fetch comments data");
    }
  };
  return (
    <div className="container">
      {blog ? (
        <div>
          <div className="flex w-full justify-between items-center gap-3">
            <p>{getDateFromString(blog.created_at)}</p>
          </div>
          <h4 className=" py-3 text-3xl font-semibold tracking-tight">
            {blog.title}
          </h4>
          <p>{blog.content}</p>
          {comments && (
            <div className=" py-4">
              <h4 className=" text-lg font-semibold tracking-tight">
                {comments.length} Comments
              </h4>
              <form
                onSubmit={handlepostComment}
                className="flex  w-full items-center gap-1.5 py-5"
              >
                <Input
                  className="flex-1"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type="username"
                  id="username"
                  placeholder="Username"
                />
                <Button type="submit"> Post </Button>
              </form>
              <div className="py-3">
                {comments.map((comment) => (
                  <div
                    className="flex p-2 border-b items-center "
                    key={comment.id}
                  >
                    <p className="flex-1">{comment.content}</p>
                    {comment.author === Number(userId) && (
                      <Button
                        onClick={() => deleteComment(comment.id)}
                        size={"icon"}
                        variant={"outline"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="15"
                          height="15"
                          viewBox="0 0 30 30"
                          fill="red"
                        >
                          <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <h4 className=" py-3 text-3xl font-semibold tracking-tight">
          Loading{" "}
        </h4>
      )}
    </div>
  );
};

export default BlogPage;
