"use client";

import { useEffect, useState, useCallback } from "react";
import BlogPostCard from "@/components/ui/blog/BlogPostCard";
import FeaturedPost from "@/components/ui/blog/FeaturedPost";
import { getPaginatedPosts, getTotalPostCount } from "@/lib/getPosts";
import type { BlogPostMeta } from "@/lib/getPosts";
import { Skeleton } from "@/components/ui/blog/Skeleton";
import { ArrowUp } from "lucide-react";

const INITIAL_LOAD_SIZE = 8;
const PAGE_SIZE = 6;
const LOAD_DELAY = 800;

export default function BlogPage() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPostMeta[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<BlogPostMeta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const loadMorePosts = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, LOAD_DELAY));

      const [newPosts, total] = await Promise.all([
        getPaginatedPosts(page, PAGE_SIZE),
        getTotalPostCount(),
      ]);

      setTotalPosts(total);
      setVisiblePosts((prev) => [
        ...prev,
        ...newPosts.filter((p) => !prev.some((ep) => ep.slug === p.slug)),
      ]);
      setHasMore(visiblePosts.length + newPosts.length < total);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, visiblePosts.length]);

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      try {
        const [initialPosts, total] = await Promise.all([
          getPaginatedPosts(1, INITIAL_LOAD_SIZE),
          getTotalPostCount(),
        ]);

        setTotalPosts(total);
        setFeaturedPosts(initialPosts.slice(0, 2));
        setVisiblePosts(initialPosts.slice(2));
        setPage(2);
        setHasMore(initialPosts.length < total);
      } catch (error) {
        console.error("Initial load failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, []);

  const handleScroll = useCallback(() => {
    setShowScrollTop(window.scrollY > 500);

    const scrollBottom =
      window.innerHeight + document.documentElement.scrollTop;
    const threshold = document.documentElement.offsetHeight - 500;

    if (scrollBottom >= threshold && !isLoading && hasMore) {
      loadMorePosts();
    }
  }, [isLoading, hasMore, loadMorePosts]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading && visiblePosts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <Skeleton className="h-12 w-1/2 mx-auto mb-8" />
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Skeleton className="h-96 rounded-xl" />
            <Skeleton className="h-96 rounded-xl" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={`init-${i}`} className="h-64 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Insights Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Latest updates, security tips, and financial analysis best practices
          </p>
        </div>

        {featuredPosts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.slug} post={post} />
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visiblePosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={`load-${Date.now()}-${i}`}
                className="h-64 rounded-xl"
              />
            ))}
          </div>
        )}

        {!hasMore && (
          <div className="text-center py-8 text-gray-500">
            Showing {visiblePosts.length} of {totalPosts} posts
          </div>
        )}

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}
