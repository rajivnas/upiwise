import { getPost, getPaginatedPosts } from "@/lib/getPosts";
import { remark } from "remark";
import html from "remark-html";
import { Metadata } from "next";
import "./post-styles.css";
import Link from "next/link";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    title: `${post.title} | Your Blog Name`,
    description: post.excerpt || post.content.slice(0, 160),
  };
}

export default async function PostPage({ params }: any) {
  const { slug } = params;
  const post = await getPost(slug);

  const recentPosts = await getPaginatedPosts(1, 3);
  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <div className="min-h-screen bg-white py-8 mb-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-md uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        <article
          className="article-content mb-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <section className="mt-16 border-t border-gray-100 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            More Articles
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((recentPost) => (
              <Link
                key={recentPost.slug}
                href={`/blog/${recentPost.slug}`}
                className="group overflow-hidden rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200 hover:shadow-md"
              >
                <div className="p-5">
                  <span className="inline-block px-2 py-1 mb-3 text-xs font-semibold text-blue-700 bg-blue-50 rounded-md uppercase tracking-wider">
                    {recentPost.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {recentPost.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {recentPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
