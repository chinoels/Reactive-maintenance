// pages/index.js
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Reactive Maintenance</title>
      </Head>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold mb-4">Welcome to Reactive Maintenance</h1>
          <p className="text-lg mb-6">
            This is the AI-powered QR maintenance request system
          </p>
          <a
            href="/request"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
          >
            Submit Maintenance Request
          </a>
        </div>
      </div>
    </>
  );
}

