import { redirect } from "next/navigation";

export default function Home() {
  redirect("/admin/dashboard");
  return <>Coming Soon</>;
}
