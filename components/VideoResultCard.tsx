
import React from 'react';
import type { VideoData } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TikTokIcon } from './icons/TikTokIcon';

interface VideoResultCardProps {
  data: VideoData;
}

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return <InstagramIcon className="w-6 h-6" />;
    case 'facebook':
      return <FacebookIcon className="w-6 h-6" />;
    case 'tiktok':
      return <TikTokIcon className="w-6 h-6" />;
    default:
      return null;
  }
};

export const VideoResultCard: React.FC<VideoResultCardProps> = ({ data }) => {
  return (
    <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700 animate-fade-in">
      <div className="relative">
        <img 
          src={data.thumbnail} 
          alt={data.title} 
          className="w-full h-auto aspect-video object-cover" 
        />
        <div className="absolute top-3 right-3 bg-black bg-opacity-60 p-2 rounded-full text-white">
          <PlatformIcon platform={data.platform} />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2" title={data.title}>
          {data.title}
        </h3>
        <a
          href={data.video_url}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 duration-300"
        >
          <DownloadIcon className="w-6 h-6 mr-3" />
          Download Video
        </a>
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed.
// For simplicity, adding it directly in index.html is an option or using a plugin.
// Let's assume a simple keyframe animation is available.
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;
document.head.appendChild(style);
