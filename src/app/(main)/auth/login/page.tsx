import Link from "next/link";

import { Blocks } from "lucide-react";

import { LoginForm } from "./_components/login-form";

export default function Login() {
  return (
    <div className="flex h-dvh">
      <div className="bg-primary hidden lg:block lg:w-1/3">
        <div className="flex h-full flex-col items-center justify-center p-12 text-center">
          <div className="space-y-6">
            <Blocks className="text-primary-foreground mx-auto size-14" />
            <div className="space-y-2">
              <h1 className="text-primary-foreground text-5xl font-bold">SIMKM</h1>
              <p className="text-primary-foreground/80 text-xl font-medium">Sistem Informasi UMKM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="text-foreground font-medium tracking-tight">Login</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              Selamat datang di SIMKM, silakan masuk menggunakan akun anda untuk melanjutkan.
            </div>
          </div>
          <div className="space-y-4">
            <LoginForm />
            <p className="text-muted-foreground text-center text-xs font-medium">
              Belum memiliki akun?{" "}
              <Link href="register" className="text-primary font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
