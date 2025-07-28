import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Admin Login in Top Right */}
      <div className="w-full p-4 flex justify-end">
        <Link href="/admin">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Admin Login
          </button>
        </Link>
      </div>

      {/* Centered Welcome Text */}
      <div className="flex-grow flex items-center justify-center text-center px-4 font-serif">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Reactive Maintenance</h1>
          <p className="text-lg">This is the AI-powered QR maintenance request system.</p>
        </div>
      </div>
      
    </div>
  );
}

