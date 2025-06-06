import React from 'react';
import LandingHero from '../components/LandingHero';

export default function HrmLandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Navigation */}
      <nav className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <a className="flex-none text-xl font-semibold text-black focus:outline-none focus:opacity-80 dark:text-white" href="#" aria-label="Brand">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-2-2 2-2"/>
                </svg>
              </div>
              <span className="text-xl font-bold">HRM System</span>
            </div>
          </a>
        </div>

        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500" href="/dashboard">Dashboard</a>
          <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500" href="#features">Tính năng</a>
          <a className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500" href="#about">Giới thiệu</a>
        </div>
      </nav>

      {/* Hero Section */}
      <LandingHero />

      {/* Features Section */}
      <div id="features" className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Tính năng nổi bật</h2>
          <p className="mt-1 text-gray-600 dark:text-neutral-400">Khám phá những tính năng mạnh mẽ của hệ thống HRM</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="h-52 flex flex-col justify-center items-center bg-green-500 rounded-t-xl">
              <svg className="size-28 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="m22 21-2-2 2-2"/>
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-green-600 dark:text-green-500">
                Quản lý nhân sự
              </span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                Employee Management
              </h3>
              <p className="mt-3 text-gray-500 dark:text-neutral-500">
                Quản lý thông tin nhân viên, cơ cấu tổ chức, và quy trình làm việc một cách hiệu quả.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="h-52 flex flex-col justify-center items-center bg-blue-500 rounded-t-xl">
              <svg className="size-28 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                Chấm công
              </span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                Smart Attendance
              </h3>
              <p className="mt-3 text-gray-500 dark:text-neutral-500">
                Hệ thống chấm công thông minh với AI face recognition và mobile check-in.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="h-52 flex flex-col justify-center items-center bg-amber-500 rounded-t-xl">
              <svg className="size-28 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="2" y2="22"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-amber-600 dark:text-amber-500">
                Payroll
              </span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                Automated Payroll
              </h3>
              <p className="mt-3 text-gray-500 dark:text-neutral-500">
                Tính lương tự động, quản lý thuế và bảo hiểm một cách chính xác và kịp thời.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-white">Thống kê hệ thống</h2>
            <p className="mt-1 text-green-100">Những con số ấn tượng từ hệ thống HRM</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">247</h3>
              <p className="text-green-100">Tổng nhân viên</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">235</h3>
              <p className="text-green-100">Đang làm việc</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">98.5%</h3>
              <p className="text-green-100">Độ chính xác chấm công</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">15 phút</h3>
              <p className="text-green-100">Thời gian xử lý lương</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-gray-900 w-full dark:bg-neutral-950">
        <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
          <div className="text-center">
            <div>
              <a className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80" href="#" aria-label="Brand">
                HRM System
              </a>
            </div>

            <div className="mt-3">
              <p className="text-gray-500 dark:text-neutral-500">Hệ thống quản lý nhân sự hiện đại và thông minh.</p>
              <p className="text-gray-500 dark:text-neutral-500">© 2024 HRM System. Made with ❤️</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 