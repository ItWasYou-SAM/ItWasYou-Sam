import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blogData";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  return post ? { title: post.title, description: post.description } : {};
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main id="main-content" className="terminal-shell article-page">
      <Link className="article-back" href="/blog">← cd ../blog</Link>
      <header>
        <p className="command-label">$ cat {post.slug}.md</p>
        <h1>{post.title}</h1>
        <div><time dateTime={post.date}>{post.date}</time><span>{post.category}</span><span>{post.readTime}</span></div>
        <p>{post.description}</p>
      </header>
      <article>
        {post.sections.map((section, index) => (
          <section key={section.heading || index}>
            {section.heading && <h2>## {section.heading}</h2>}
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <p className="article-eof">▊ end of file</p>
      </article>
    </main>
  );
}
