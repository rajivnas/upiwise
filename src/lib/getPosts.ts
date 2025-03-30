"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "PostsData");

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
    console.log(`Reading posts from: ${postsDirectory}`);
    const files = await fs.readdir(postsDirectory);

    const mdFiles = files.filter((file) => file.endsWith(".md"));

    console.log(`Found ${mdFiles.length} markdown files`);

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        try {
          const slug = file.replace(/\.md$/, "");
          const filePath = path.join(postsDirectory, file);
          const content = await fs.readFile(filePath, "utf8");
          const { data } = matter(content);

          return {
            slug,
            title: data.title?.trim() || "Untitled Post",
            date: data.date || new Date().toISOString(),
            category: data.category?.trim() || "General",
            excerpt: data.excerpt?.trim() || "",
          };
        } catch (error) {
          console.error(`Error processing file ${file}:`, error);
          return null;
        }
      })
    );

    const validPosts = posts.filter(Boolean) as BlogPostMeta[];

    const slugs = new Set<string>();
    const duplicates = validPosts.filter((post) => {
      const exists = slugs.has(post.slug);
      slugs.add(post.slug);
      return exists;
    });

    if (duplicates.length > 0) {
      console.error("Duplicate slugs found:", duplicates);
      throw new Error(
        `Duplicate slugs: ${duplicates.map((d) => d.slug).join(", ")}`
      );
    }

    metaCache = validPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    lastCacheUpdate = Date.now();

    console.log(`Successfully loaded ${metaCache.length} posts`);
    return metaCache;
  } catch (error) {
    console.error("Error loading posts:", error);
    metaCache = [];
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  try {
    await fs.access(filePath);
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title?.trim() || "Untitled Post",
      content: content?.trim() || "",
      date: data.date || new Date().toISOString(),
      category: data.category?.trim() || "General",
      excerpt: data.excerpt?.trim() || "",
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
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
