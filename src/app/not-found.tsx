import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center py-20">
        <div className="text-8xl font-bold text-white/10 mb-6 font-display">404</div>
        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-white/50 text-lg mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary px-8 py-3 rounded-full">
            Back to Home
          </Link>
          <Link href="/book" className="btn-outline-dark px-8 py-3 rounded-full">
            Book Consultation
          </Link>
        </div>
      </div>
    </main>
  );
}
