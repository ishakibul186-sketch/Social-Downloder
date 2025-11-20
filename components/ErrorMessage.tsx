
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full max-w-xl text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
      <strong className="font-bold">Oops! </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
