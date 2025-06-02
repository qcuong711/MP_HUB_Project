'use client';

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const registered = searchParams.get("registered");
  const errorParam = searchParams.get("error");

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signIn("identityserver", { 
        callbackUrl: "/dashboard",
        redirect: false
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        setError(getErrorMessage(result.error));
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "OAuthSignin":
        return "Không thể kết nối đến hệ thống xác thực. Vui lòng kiểm tra lại kết nối và đảm bảo Identity Server đang chạy.";
      case "OAuthCallback":
        return "Lỗi khi xác thực từ nhà cung cấp. Vui lòng thử lại.";
      case "OAuthCreateAccount":
        return "Không thể tạo tài khoản. Vui lòng thử lại.";
      case "EmailCreateAccount":
        return "Không thể tạo tài khoản email. Vui lòng thử lại.";
      case "Callback":
        return "Lỗi trong quá trình xử lý callback. Vui lòng thử lại.";
      case "OAuthAccountNotLinked":
        return "Email đã được sử dụng với một phương thức đăng nhập khác.";
      case "EmailSignin":
        return "Lỗi khi gửi email đăng nhập. Vui lòng thử lại.";
      case "CredentialsSignin":
        return "Thông tin đăng nhập không hợp lệ.";
      case "SessionRequired":
        return "Vui lòng đăng nhập để truy cập trang này.";
      default:
        return "Đã xảy ra lỗi. Vui lòng thử lại sau.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập vào hệ thống
          </h2>
          {registered && (
            <p className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center text-sm">
              Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.
            </p>
          )}
          {errorParam && (
            <p className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center text-sm">
              {getErrorMessage(errorParam)}
            </p>
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">{error}</div>
        )}

        <div className="mt-8 space-y-6">
          <div>
            <button
              onClick={handleSignIn}
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang xử lý...
                </>
              ) : "Đăng nhập với tài khoản hệ thống"}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
            >
              Chưa có tài khoản? Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 