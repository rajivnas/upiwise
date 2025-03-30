"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src", "PostsData");

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

let metaCache: BlogPostMeta[] = [];
let lastCacheUpdate = 0;
const CACHE_DURATION = 60 * 1000;

async function getAllMetadata(): Promise<BlogPostMeta[]> {
  if (Date.now() - lastCacheUpdate < CACHE_DURATION && metaCache.length > 0) {
    return metaCache;
  }

  try {
    const files = await fs.readdir(postsDirectory);

    console.log("[Posts] Directory contents:", files);

    const validPosts = await Promise.all(
      files.map(async (file) => {
        if (!file.endsWith(".md")) return null;

        try {
          const slug = file.replace(/\.md$/, "");
          const content = await fs.readFile(
            path.join(postsDirectory, file),
            "utf8"
          );
          const { data } = matter(content);

          return {
            slug,
            title: data.title || "Untitled Post",
            date: data.date || new Date().toISOString(),
            category: data.category || "General",
            excerpt: data.excerpt || "",
          };
        } catch (error) {
          console.error(`Error processing file ${file}:`, error);
          return null;
        }
      })
    );

    // Filter out null entries and duplicates
    const posts = validPosts.filter(Boolean) as BlogPostMeta[];
    const slugs = new Set<string>();
    const cleanPosts = posts.filter((post) => {
      const exists = slugs.has(post.slug);
      if (!exists) slugs.add(post.slug);
      return !exists;
    });

    metaCache = cleanPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    lastCacheUpdate = Date.now();

    console.log("[Posts] Loaded successfully:", metaCache.length);
    return metaCache;
  } catch (error) {
    console.error("[Posts] Critical error:", error);
    console.log("[Posts] Resolved directory:", postsDirectory);
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled Post",
      content: content || "",
      date: data.date || new Date().toISOString(),
      category: data.category || "General",
      excerpt: data.excerpt || "",
    };
  } catch (error) {
    throw new Error(`Post not found: ${slug}`);
  }
}

export async function getPaginatedPosts(
  page: number = 1,
  limit: number = 6
): Promise<BlogPostMeta[]> {
  const posts = await getAllMetadata();
  const start = (page - 1) * limit;
  return posts.slice(start, start + limit);
}

export async function getTotalPostCount(): Promise<number> {
  return (await getAllMetadata()).length;
}
