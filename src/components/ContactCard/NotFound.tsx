import React from 'react';
import { TEXT_CONTENT } from '../../constants';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {TEXT_CONTENT.es.notFound}
        </h1>
        <p className="text-gray-600">
          {TEXT_CONTENT.es.notFoundDesc}
        </p>
      </div>
    </div>
  );
};

export default NotFound;