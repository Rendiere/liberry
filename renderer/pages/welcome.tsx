import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const WelcomePage: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white p-4">
      <Head>
        <title>Welcome to Based</title>
      </Head>
      <main className="text-center">
        <h1 className="text-6xl font-bold mb-4">Based</h1>
        <p className="text-xl mb-8">
          Manage your music library like it's {currentYear}
        </p>
        <Link href="/onboarding" className="bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors">
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default WelcomePage;