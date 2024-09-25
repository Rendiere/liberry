import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [step1Completed, setStep1Completed] = useState(false);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.xml')) {
      // Here you would typically process the file
      // For now, we'll just simulate completion
      setStep1Completed(true);
      // In a real scenario, you'd want to send this file to your backend
      // and wait for a response before proceeding
      setTimeout(() => {
        router.push('/library');
      }, 1000);
    } else {
      alert('Please upload a valid iTunes Library.xml file');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white p-4">
      <Head>
        <title>Onboarding - Based</title>
      </Head>
      <main className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Get Started with Based</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Load your music library</h2>
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700">Upload iTunes Library.xml file</span>
              <input 
                type="file" 
                accept=".xml"
                onChange={handleFileUpload}
                className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-purple-50 file:text-purple-700
                          hover:file:bg-purple-100"
              />
            </label>
            <button 
              className="w-full py-2 px-4 bg-gray-200 text-gray-500 rounded-full cursor-not-allowed"
              disabled
            >
              Scan for music
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4 opacity-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Link your online accounts</h2>
          <p className="text-gray-600">Complete step 1 to unlock this step</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 opacity-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Explore your music library</h2>
          <p className="text-gray-600">Complete steps 1 and 2 to unlock this step</p>
        </div>
      </main>
    </div>
  );
};

export default OnboardingPage;