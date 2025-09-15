import React from 'react';

interface MessageBoxProps {
  message: React.ReactNode | null;
  type?: 'info' | 'combo';
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, type = 'info' }) => {
  if (!message) return null;

  const baseClasses = "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white px-12 py-8 rounded-2xl text-center text-4xl font-bold z-[1001] shadow-2xl transition-opacity duration-300 ease-in-out";
  const typeClasses = type === 'info' ? "bg-black/70" : "bg-green-600/90";

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      {message}
    </div>
  );
};

export default MessageBox;
