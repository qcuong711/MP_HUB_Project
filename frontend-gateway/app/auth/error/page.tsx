'use client';

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case "OAuthSignin":
        return "Lỗi khi bắt đầu quá trình đăng nhập. Vui lòng thử lại.";
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
            Lỗi xác thực
          </h2>
          <p className="mt-2 text-center text-sm text-red-600">
            {getErrorMessage(error)}
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/auth/signin"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Quay lại trang đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
} 