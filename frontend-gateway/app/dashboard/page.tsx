'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Xin chào, {session?.user?.name}</span>
              <button
                onClick={() => router.push("/api/auth/signout")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Quản lý người dùng</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Xem và quản lý tất cả người dùng trong hệ thống
                </p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Xem chi tiết
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Quản lý vai trò</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Phân quyền và quản lý vai trò người dùng
                </p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Xem chi tiết
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">Cài đặt hệ thống</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Cấu hình và quản lý cài đặt hệ thống
                </p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 