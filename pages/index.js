import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans relative">
      {/* Admin Login - top right */}
      <div className="absolute top-4 right-4">
        <Link href="/admin">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Admin Login
          </button>
        </Link>
      </div>

      {/* Centered content */}
      <div className="flex items-center justify-center h-full w-full pt-24">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Reactive Maintenance
          </h1>
          <p className="text-lg">
            This is the AI-powered QR maintenance request system.
          </p>
        </div>
      </div>
    </div>
  );
}

