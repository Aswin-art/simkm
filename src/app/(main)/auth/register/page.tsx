import Link from "next/link";

import { Blocks } from "lucide-react";

import { RegisterForm } from "./_components/register-form";

export default function Register() {
  return (
    <div className="flex h-dvh">
      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-2/3">
        <div className="w-full max-w-md space-y-10 py-24 lg:py-32">
          <div className="space-y-4 text-center">
            <div className="text-foreground font-medium tracking-tight">Register</div>
            <div className="text-muted-foreground mx-auto max-w-xl">
              Silakan buat akun Anda untuk mulai mengelola dan memajukan usaha Anda bersama kami.
            </div>
          </div>
          <div className="space-y-4">
            <RegisterForm />
            <p className="text-muted-foreground text-center text-xs font-medium">
              Sudah memiliki akun?{" "}
              <Link href="login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

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
    </div>
  );
}
