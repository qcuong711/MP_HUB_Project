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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập vào hệ thống
          </h2>
          {registered && (
            <p className="mt-2 text-center text-sm text-green-600">
              Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.
            </p>
          )}
          {errorParam && (
            <p className="mt-2 text-center text-sm text-red-600">
              {getErrorMessage(errorParam)}
            </p>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <div>
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập với tài khoản hệ thống"}
          </button>
        </div>

        <div className="text-sm text-center">
          <Link
            href="/auth/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Chưa có tài khoản? Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
} 