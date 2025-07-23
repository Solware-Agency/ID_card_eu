import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-indigo-900">
        {/* Floating abstract shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-violet-600/40 to-blue-600/40 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-blue-600/40 to-indigo-600/40 rounded-full mix-blend-screen filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-gradient-to-r from-slate-600/30 to-indigo-600/40 rounded-full mix-blend-screen filter blur-xl opacity-40 animate-pulse animation-delay-1000"></div>
        
        {/* Aurora-like overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-500/10 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/10 to-transparent animate-pulse animation-delay-3000"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;