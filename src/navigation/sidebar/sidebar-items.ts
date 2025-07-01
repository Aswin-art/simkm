import {
  Home,
  ChartPie,
  Grid2X2,
  ChartLine,
  ShoppingBag,
  BookA,
  Forklift,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  type LucideIcon,
  List,
  CheckCircle,
  CheckCheck,
  Activity,
  CalendarCheck,
  History,
  UserCircle,
  User,
  UserCheck,
  UserPlus,
  Cog,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Analisa Statistik",
        url: "/dashboard",
        icon: Home,
        subItems: [
          { title: "Analisa UMKM", url: "/dashboard/default", icon: ChartPie },
          { title: "Sebaran Wilayah", url: "/dashboard", icon: Grid2X2 },
          { title: "Pertumbuhan", url: "/dashboard/analytics", icon: ChartLine },
          // { title: "eCommerce", url: "/dashboard/e-commerce", icon: ShoppingBag, comingSoon: true },
          // { title: "Academy", url: "/dashboard/academy", icon: BookA, comingSoon: true },
          // { title: "Logistics", url: "/dashboard/logistics", icon: Forklift, comingSoon: true },
        ],
      },
      {
        title: "Data UMKM",
        url: "/dashboard/umkm",
        icon: ShoppingBag,
        subItems: [
          { title: "Daftar UMKM", url: "/dashboard/umkm", icon: List },
          { title: "Verifikasi UMKM", url: "/dashboard/umkm", icon: CheckCheck },
          { title: "Aktivitas UMKM", url: "/dashboard", icon: Activity },
        ],
      },
      {
        title: "Program Bantuan",
        url: "/dashboard/program",
        icon: BookA,
        subItems: [
          { title: "Daftar Program", url: "/dashboard/program", icon: CalendarCheck },
          { title: "UMKM Penerima", url: "/dashboard", icon: UserCheck },
          { title: "Riwayat Bantuan", url: "/dashboard/analytics", icon: History },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Users",
    items: [
      {
        title: "Kelola Admin",
        url: "/auth",
        icon: Users,
        subItems: [
          { title: "Daftar Pengguna", url: "/auth/v1/login", newTab: true, icon: User },
          { title: "Verifikasi Pengguna", url: "/auth/v1/register", newTab: true, icon: UserPlus },
          { title: "Hak Akses", url: "/auth/v1/register", newTab: true, icon: Lock },
        ],
      },
      // {
      //   title: "Email",
      //   url: "/mail",
      //   icon: Mail,
      //   comingSoon: true,
      // },
      // {
      //   title: "Chat",
      //   url: "/chat",
      //   icon: MessageSquare,
      //   comingSoon: true,
      // },
      // {
      //   title: "Calendar",
      //   url: "/calendar",
      //   icon: Calendar,
      //   comingSoon: true,
      // },
      // {
      //   title: "Kanban",
      //   url: "/kanban",
      //   icon: Kanban,
      //   comingSoon: true,
      // },
      // {
      //   title: "Invoice",
      //   url: "/invoice",
      //   icon: ReceiptText,
      //   comingSoon: true,
      // },
      // {
      //   title: "Users",
      //   url: "/users",
      //   icon: Users,
      //   comingSoon: true,
      // },
      // {
      //   title: "Roles",
      //   url: "/roles",
      //   icon: Lock,
      //   comingSoon: true,
      // },
    ],
  },
  {
    id: 3,
    label: "Others",
    items: [
      {
        title: "Pengaturan",
        url: "/others",
        icon: Cog,
        comingSoon: true,
      },
    ],
  },
];
