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

export const adminSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Analisa Statistik",
        url: "/admin/dashboard/statistic",
        icon: Home,
        subItems: [
          { title: "Analisa UMKM", url: "/admin/dashboard/statistic/umkm-analytic", icon: ChartPie },
          { title: "Sebaran Wilayah", url: "/admin/dashboard/statistic/umkm-regional", icon: Grid2X2 },
          { title: "Pertumbuhan", url: "/admin/dashboard/statistic/umkm-growth", icon: ChartLine },
          // { title: "eCommerce", url: "/admin/dashboard/e-commerce", icon: ShoppingBag, comingSoon: true },
          // { title: "Academy", url: "/admin/dashboard/academy", icon: BookA, comingSoon: true },
          // { title: "Logistics", url: "/admin/dashboard/logistics", icon: Forklift, comingSoon: true },
        ],
      },
      {
        title: "Data UMKM",
        url: "/admin/dashboard/umkm-data",
        icon: ShoppingBag,
        subItems: [
          { title: "Daftar UMKM", url: "/admin/dashboard/umkm-data/umkm-list", icon: List },
          { title: "Verifikasi UMKM", url: "/admin/dashboard/umkm-data/umkm-verification", icon: CheckCheck },
          { title: "Aktivitas UMKM", url: "/admin/dashboard/umkm-data/umkm-activity", icon: Activity },
        ],
      },
      {
        title: "Program Bantuan",
        url: "/admin/dashboard/fund-program",
        icon: BookA,
        subItems: [
          { title: "Daftar Program", url: "/admin/dashboard/fund-program/program-list", icon: CalendarCheck },
          { title: "UMKM Penerima", url: "/admin/dashboard/fund-program/umkm-selected-list", icon: UserCheck },
          { title: "Riwayat Bantuan", url: "/admin/dashboard/fund-program/fund-history", icon: History },
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
        url: "/admin/users",
        icon: Users,
        subItems: [
          { title: "Daftar Pengguna", url: "/admin/users/user-list", icon: User },
          {
            title: "Verifikasi Pengguna",
            url: "/admin/users/user-verification",

            icon: UserPlus,
          },
          { title: "Hak Akses", url: "/admin/users/role-access", icon: Lock },
        ],
      },
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

export const umkmSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Statistik Usaha",
        url: "/umkm/dashboard/statistic",
        icon: Home,
        subItems: [{ title: "Statistik Produk", url: "/umkm/dashboard/statistic/business-summary", icon: ChartPie }],
      },
      {
        title: "Manajemen Usaha",
        url: "/umkm/dashboard/business-management",
        icon: ShoppingBag,
        subItems: [
          { title: "Daftar Produk", url: "/umkm/dashboard/business-management/product-list", icon: List },
          {
            title: "Data Penjualan",
            url: "/umkm/dashboard/business-management/sales-data",
            icon: CheckCheck,
          },
        ],
      },
      {
        title: "Keuangan & Inventori",
        url: "/umkm/dashboard/money-inventory",
        icon: BookA,
        subItems: [
          {
            title: "Laporan",
            url: "/umkm/dashboard/money-inventory/money-reports",
            icon: History,
            comingSoon: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Settings",
    items: [
      {
        title: "Pengaturan Akun",
        url: "/umkm/settings",
        icon: Users,
        subItems: [{ title: "Profil", url: "/umkm/settings/profile", icon: User, comingSoon: true }],
      },
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
