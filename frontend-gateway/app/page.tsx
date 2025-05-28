'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user || { name: "" };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">Hệ Thống Giáo Dục Trực Tuyến</h1>
        
        {isAuthenticated ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Xin chào, {user.name}!</h2>
            <p className="mb-4">Bạn đã đăng nhập thành công.</p>
            <div className="flex gap-4">
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Đăng xuất
              </button>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Vào hệ thống
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Chào mừng!</h2>
            <p className="mb-4">Vui lòng đăng nhập để tiếp tục.</p>
            <div className="flex gap-4">
              <Link
                href="/auth/signin"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                href="/auth/register"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
