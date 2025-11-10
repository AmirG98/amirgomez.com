import { BlogPost } from '@/data/blog-posts';

interface BlogStructuredDataProps {
  post: BlogPost;
}

export default function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage || "https://www.amirgomez.com/amir-profile.jpg",
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "description": post.author.bio,
      "image": post.author.avatar,
      "url": "https://www.amirgomez.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Amir Gomez - Digital Marketing",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.amirgomez.com/amir-profile.jpg",
        "width": 200,
        "height": 200
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.amirgomez.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": `PT${post.readingTime}M`,
    "inLanguage": "en-US",
    "url": `https://www.amirgomez.com/blog/${post.slug}`,
    "about": {
      "@type": "Thing",
      "name": "Digital Marketing"
    },
    "mentions": post.tags.map(tag => ({
      "@type": "Thing",
      "name": tag
    })),
    "isPartOf": {
      "@type": "Blog",
      "name": "Amir Gomez Marketing Blog",
      "url": "https://www.amirgomez.com/blog"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}