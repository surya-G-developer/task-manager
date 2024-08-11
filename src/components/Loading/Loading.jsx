import React from 'react';

export default function Loading({ message = '' }) {
  return (
    <main className='flex-grow flex  items-center justify-center'>
      <div className="flex flex-col items-center justify-center bg-white p-5 rounded-sm">
        <span className="loading loading-spinner loading-lg bg-primary"></span>
        {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
      </div>
    </main>
  );
}