export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Amir Gomez
        </h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
          Full-stack developer and digital marketing specialist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            Get Started
          </button>
          <button className="border border-foreground/20 px-8 py-3 rounded-full font-semibold hover:bg-foreground/5 transition-colors">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
