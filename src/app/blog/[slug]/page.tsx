import BlogPostClient from "./BlogPostClient";
import { articles } from "./data";

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}

export default function BlogPost() {
  return <BlogPostClient />;
}
