import Link from "next/link";
import { BlogPostMeta } from "@/lib/getPosts";

interface BlogPostCardProps {
  post: BlogPostMeta;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-sm transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
          {post.category}
        </span>
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString()}
        </time>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mt-auto"
      >
        Read More
      </Link>
    </div>
  );
}
