import React from 'react';

const HrmInfo = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 m-4 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">HRM Microfrontend</h2>
          <p className="text-sm text-gray-600">Standalone Application</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            ✅ Active
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Port:</span>
          <span className="font-mono text-gray-800">3001</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Architecture:</span>
          <span className="text-gray-800 font-medium">Iframe-based</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Authentication:</span>
          <span className="text-gray-800 font-medium">OAuth 2.0 + OIDC</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-green-200">
        <p className="text-sm text-gray-600 italic">
          🚀 Microfrontend được tải độc lập từ <code className="bg-gray-100 px-1 rounded">hrm</code> project
        </p>
      </div>
    </div>
  );
};

export default HrmInfo; 