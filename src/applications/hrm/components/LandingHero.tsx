import React from 'react';
import Link from 'next/link';
import { createLoginUrl } from '../lib/auth';

export default function LandingHero() {
  const handleLogin = () => {
    window.location.href = createLoginUrl();
  };

  return (
    <div className="relative overflow-hidden">
      {/* Gradients */}
      <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-green-300/50 to-emerald-100 blur-3xl w-[500px] h-[700px] rotate-[-60deg] transform -translate-x-40 dark:from-green-900/50 dark:to-emerald-900"></div>
        <div className="bg-gradient-to-tl from-blue-50 via-green-100 to-blue-50 blur-3xl w-[1440px] h-[800px] rounded-full origin-top-left -rotate-12 -translate-x-60 dark:from-green-900/70 dark:via-emerald-900/70 dark:to-blue-900/70"></div>
      </div>
      {/* End Gradients */}

      <div className="relative z-10">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="max-w-2xl text-center mx-auto">
            <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-green-600 to-emerald-500 text-transparent dark:from-green-400 dark:to-emerald-400">
              HRM System: Quản lý nhân sự thông minh
            </p>

            {/* Title */}
            <div className="mt-5 max-w-2xl">
              <h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
                Hệ thống HRM
                <span className="bg-clip-text bg-gradient-to-tl from-green-600 to-emerald-600 text-transparent"> Hiện đại</span>
              </h1>
            </div>
            {/* End Title */}

            <div className="mt-5 max-w-3xl">
              <p className="text-lg text-gray-600 dark:text-neutral-400">
                Giải pháp quản lý nhân sự toàn diện, từ tuyển dụng, đánh giá, chấm công đến phát triển nhân tài. 
                Tối ưu hóa quy trình HR với công nghệ AI và analytics tiên tiến.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 gap-3 flex justify-center">
              <button 
                onClick={handleLogin}
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" x2="3" y1="12" y2="12"/>
                </svg>
                Đăng nhập
              </button>
              <button 
                onClick={() => window.parent?.postMessage({ type: 'DEMO_MODE' }, '*')}
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 transition-colors"
              >
                <svg className="shrink-0 size-4" width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3h16l-1 12H3L2 3z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M6 8h6M6 11h4" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Xem Demo
              </button>
            </div>
            {/* End Buttons */}

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="flex justify-center items-center size-12 bg-green-100 rounded-xl mx-auto dark:bg-green-900">
                  <svg className="shrink-0 size-6 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m22 21-2-2 2-2"/>
                  </svg>
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Quản lý nhân viên</h3>
                  <p className="mt-1 text-gray-600 dark:text-neutral-400">Theo dõi thông tin, hiệu suất và phát triển nhân viên</p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex justify-center items-center size-12 bg-blue-100 rounded-xl mx-auto dark:bg-blue-900">
                  <svg className="shrink-0 size-6 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Chấm công thông minh</h3>
                  <p className="mt-1 text-gray-600 dark:text-neutral-400">AI-powered attendance với face recognition</p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex justify-center items-center size-12 bg-amber-100 rounded-xl mx-auto dark:bg-amber-900">
                  <svg className="shrink-0 size-6 text-amber-600 dark:text-amber-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" x2="12" y1="2" y2="22"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Payroll tự động</h3>
                  <p className="mt-1 text-gray-600 dark:text-neutral-400">Tính lương, thuế và bảo hiểm tự động</p>
                </div>
              </div>
            </div>
            {/* End Features */}
          </div>
        </div>
      </div>
    </div>
  );
} 