"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { registerAction } from "@/actions/auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const FormSchema = z.object({
  name: z.string().min(1, { message: "Nama usaha wajib diisi." }),
  email: z.string().email({ message: "Masukkan alamat email yang valid." }),
  password: z.string().min(6, { message: "Kata sandi minimal terdiri dari 6 karakter." }),
  phone: z.string().min(6, { message: "Nomor telepon minimal terdiri dari 6 karakter." }),
  address: z.string().min(1, { message: "Alamat wajib diisi." }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      phone: "",
      name: "",
      address: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await registerAction(data);
    if (res.error) {
      toast.error(res.error ?? "Terjadi kesalahan saat masuk. Silakan coba lagi.");
      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Usaha</FormLabel>
              <FormControl>
                <Input id="name" type="text" placeholder="Bakpia Enak" autoComplete="organization" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Usaha</FormLabel>
              <FormControl>
                <Textarea id="address" placeholder="Jln. Kenanga No.15" autoComplete="street-address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat Email</FormLabel>
              <FormControl>
                <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-muted-foreground hover:text-primary absolute top-1/2 right-2 -translate-y-1/2"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor Telepon</FormLabel>
              <FormControl>
                <Input id="phone" type="tel" placeholder="0812345678" autoComplete="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} className="w-full cursor-pointer" type="submit">
          {isLoading ? "Mendaftarkan..." : "Daftar"}
        </Button>
      </form>
    </Form>
  );
}
