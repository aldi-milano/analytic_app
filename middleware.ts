import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticated = request.cookies.has("token_umkm");

  // Daftar rute yang TIDAK PERLU login (halaman publik)
  const isPublicRoute =
    path === "/login" ||
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes(".");

  // 1. Jika belum login dan mencoba buka halaman selain halaman publik
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Jika sudah login tapi iseng buka halaman login atau root ("/")
  if (isAuthenticated && (path === "/login" || path === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ini berarti: Jalankan middleware di SEMUA URL,
  // kecuali file statis Next.js (gambar, favicon, css)
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
