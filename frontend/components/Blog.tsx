import { getDateFromString } from "@/lib/getDate";
import { IBlog } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button";
interface IProps {
  blog: IBlog;
  deleteBlog: (id: number) => void;
}
const Blog = ({ blog, deleteBlog }: IProps) => {
  return (
    <div className="shadow-md rounded-sm p-3 text-[13px]">
      <div className="flex w-full justify-between items-center gap-3">
        <p>{getDateFromString(blog.created_at)}</p>
        <Button
          onClick={() => deleteBlog(blog.id)}
          size={"icon"}
          variant={"outline"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="red"
          >
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
          </svg>
        </Button>
      </div>
      <h4 className="pt-1 pb-3 text-xl font-semibold tracking-tight">
        {blog.title}
      </h4>
      <p>{blog.content.slice(0, 150)}...</p>
      <Link className="text-blue-500 underline" href={`/blog/${blog.id}`}>
        show more
      </Link>
    </div>
  );
};

export default Blog;