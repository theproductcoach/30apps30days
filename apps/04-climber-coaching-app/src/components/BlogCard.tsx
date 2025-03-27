import Link from "next/link";
import { format } from "date-fns";
import { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card group">
      <Link href={`/blog/${post.id}`}>
        <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-green-500 transition-colors duration-200">
          {post.title}
        </h2>
        <time className="text-sm text-gray-400 block mb-3">
          {format(new Date(post.created_at), "MMMM d, yyyy")}
        </time>
        <div className="text-gray-300 line-clamp-3">{post.content}</div>
      </Link>
    </article>
  );
}
