import React from 'react';
import App from './App';

const AuthGate: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userIdToken = urlParams.get('token');

  if (userIdToken) {
    console.log('User ID Token found, starting app.');
    return <App />;
  }

  console.log('No User ID Token found in the URL. Access denied.');
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-8 text-center border border-gray-700">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          Please Access the Application Apps Hive Platform.
        </p>
        <a
          href="https://apps-hive-view.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 duration-300"
        >
          Go to the Apps Hive Platform
        </a>
      </div>
    </div>
  );
};

export default AuthGate;
