
import React, { useState } from 'react';
import { LinkIcon } from './icons/LinkIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full max-w-xl">
      <div className="flex items-center bg-gray-800 border-2 border-gray-700 rounded-full shadow-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-shadow duration-300">
        <div className="pl-5 pr-2 text-gray-500">
          <LinkIcon className="w-6 h-6" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste video link here..."
          className="w-full py-4 text-lg bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-full m-2 flex items-center justify-center transition-colors duration-300"
        >
          {isLoading ? (
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <DownloadIcon className="w-6 h-6 mr-2 hidden sm:inline-block" />
              <span className="text-lg">Download</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
