// app/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login() {
  // 1. Tunggu cookies() siap dulu (gunakan await)
  const cookieStore = await cookies();

  // 2. Baru kita set stempelnya
  cookieStore.set("token_umkm", "kode-rahasia-user-123", {
    httpOnly: true, // Keamanan: Cookie tidak bisa dicuri lewat script browser
    secure: process.env.NODE_ENV === "production", // Hanya aktif di HTTPS saat production
    maxAge: 60 * 60 * 24 * 7, // Kadaluarsa dalam 1 minggu (dalam satuan detik)
    path: "/", // Cookie berlaku di seluruh halaman web
  });

  // 3. Setelah stempel diberikan, arahkan ke dashboard
  redirect("/dashboard");
}

export async function logout() {
  // 1. Tunggu cookies() siap dulu
  const cookieStore = await cookies();

  // 2. Hapus stempelnya
  cookieStore.delete("token_umkm");

  // 3. Kembalikan ke halaman login
  redirect("/login");
}
