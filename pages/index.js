import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome to Reactive Maintenance</h1>
      <p className="text-gray-700">This is the AI-powered QR maintenance request system.</p>

      {/* Add Admin Login Button */}
      <div className="mt-8">
        <Link href="/admin">
          <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800">
            Admin Login
          </button>
        </Link>
      </div>
    </div>
  );
}

