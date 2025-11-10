import Link from 'next/link';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-foreground/5 py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="text-xl font-bold mb-2">Amir Gomez</div>
            <p className="text-foreground/60">Digital Marketing Specialist</p>
          </div>
          <div className="flex space-x-6">
            <Link 
              href="https://linkedin.com/in/amirgomez" 
              className="text-foreground/60 hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
            <Link 
              href="mailto:amir@amirgomez.com" 
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Email
            </Link>
          </div>
        </div>
        <div className="border-t border-foreground/10 mt-8 pt-8 text-center text-foreground/60">
          <p>&copy; 2025 Amir Gomez. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}