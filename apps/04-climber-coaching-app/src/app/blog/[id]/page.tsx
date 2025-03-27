"use client";

import { useEffect, useState } from "react";
import { BlogPost } from "@/types";
import { getBlogPosts } from "@/lib/storage";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = () => {
      const posts = getBlogPosts();
      const foundPost = posts.find((p) => p.id === params.id);
      setPost(foundPost || null);
      setIsLoading(false);
    };

    fetchPost();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  // Extract the content after the first heading
  const contentWithoutFirstHeading = post.content
    .split("\n")
    .slice(2)
    .join("\n");

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-900 rounded-lg shadow-lg">
      <article className="prose prose-invert prose-green mx-auto">
        <header className="mb-8 not-prose">
          <h1 className="text-4xl font-bold text-white mb-4 hover:text-green-400 transition-colors duration-200">
            {post.title}
          </h1>
          <time className="text-gray-500 text-sm">
            {format(new Date(post.created_at), "MMMM d, yyyy")}
          </time>
        </header>
        <div className="prose prose-invert prose-lg prose-headings:text-green-400 prose-a:text-green-400 max-w-none">
          <ReactMarkdown>{contentWithoutFirstHeading}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
