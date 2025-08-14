import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Amir Gomez
            </Link>
            <div className="flex space-x-6">
              <Link href="/services" className="hover:text-foreground/80 transition-colors">
                Services
              </Link>
              <Link href="/blog" className="hover:text-foreground/80 transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Full-Stack Developer & <br />
          Technical Consultant
        </h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
          Building modern web applications and providing technical expertise 
          for businesses nationwide and remote projects worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/services"
            className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            View Services
          </Link>
          <Link 
            href="/blog"
            className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-foreground/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Professional Development Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              <p className="text-foreground/80 mb-4">
                Custom web applications using React, Next.js, and modern technologies
              </p>
              <Link 
                href="/services/web-development/san-francisco"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Learn more →
              </Link>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">Technical Consulting</h3>
              <p className="text-foreground/80 mb-4">
                Strategic guidance and architecture consulting for your projects
              </p>
              <Link 
                href="/services/consulting/new-york"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Learn more →
              </Link>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">App Development</h3>
              <p className="text-foreground/80 mb-4">
                Native and cross-platform mobile applications
              </p>
              <Link 
                href="/services/app-development/remote"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest from the Blog
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="border border-foreground/10 rounded-lg p-6">
              <h3 className="font-semibold mb-2">React Hooks Complete Guide</h3>
              <p className="text-sm text-foreground/80 mb-4">
                Master React Hooks with practical examples and best practices
              </p>
              <Link 
                href="/blog/react/hooks-guide"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Read article →
              </Link>
            </div>
            <div className="border border-foreground/10 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Next.js App Router Guide</h3>
              <p className="text-sm text-foreground/80 mb-4">
                Everything you need to know about the new App Router
              </p>
              <Link 
                href="/blog/nextjs/app-router-guide"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Read article →
              </Link>
            </div>
            <div className="border border-foreground/10 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Web Development Best Practices</h3>
              <p className="text-sm text-foreground/80 mb-4">
                Modern techniques for building scalable web applications
              </p>
              <Link 
                href="/blog/web-development/best-practices"
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                Read article →
              </Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/blog"
              className="bg-foreground text-background px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-foreground/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Get a free consultation and custom quote for your development needs. 
            Available for projects nationwide and remote work.
          </p>
          <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            Schedule Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
