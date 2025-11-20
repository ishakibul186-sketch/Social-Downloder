import React, { useState, useEffect } from 'react';
import { auth } from './firebase/config';
import { signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import App from './App';
import { Loader } from './components/Loader';

const AuthGate: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null means checking

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userIdToken = urlParams.get('token');

    if (userIdToken) {
      console.log('Received User ID Token:', userIdToken);
      signInWithCustomToken(auth, userIdToken)
        .then((userCredential) => {
          console.log('Firebase sign-in successful:', userCredential.user.uid);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error('Firebase sign-in failed:', error);
          setIsAuthenticated(false);
        });
    } else {
       // If no token, check for a persisted session.
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          console.log('No token found in the URL and no user session.');
          setIsAuthenticated(false);
        }
        // Unsubscribe after the initial check to avoid memory leaks
        unsubscribe();
      });
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-xl">Verifying access...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <App />;
  }

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