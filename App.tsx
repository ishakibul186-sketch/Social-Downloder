
import React, { useState } from 'react';
import { UrlInputForm } from './components/UrlInputForm';
import { VideoResultCard } from './components/VideoResultCard';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { fetchVideoDetails } from './services/downloaderService';
import type { VideoData } from './types';

function App() {
  const [url, setUrl] = useState<string>('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (submittedUrl: string) => {
    if (!submittedUrl.trim()) {
      setError('Please enter a URL.');
      return;
    }
    
    setUrl(submittedUrl);
    setIsLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const result = await fetchVideoDetails(submittedUrl);
      if (result.error) {
        setError(result.error);
      } else if (result.video_url && result.title && result.thumbnail && result.platform) {
        setVideoData(result as VideoData);
      } else {
        setError('An unexpected error occurred. The response was incomplete.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch video details. Please check your network connection or the URL.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
          Social Downloader
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Download videos from Facebook, Instagram, and TikTok with a single link.
        </p>

        <UrlInputForm onSubmit={handleSubmit} isLoading={isLoading} />

        <div className="w-full mt-8 min-h-[300px] flex items-center justify-center">
          {isLoading && <Loader />}
          {error && !isLoading && <ErrorMessage message={error} />}
          {videoData && !isLoading && <VideoResultCard data={videoData} />}
          {!isLoading && !error && !videoData && (
             <div className="text-gray-500">
               <p>Your video will appear here.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
