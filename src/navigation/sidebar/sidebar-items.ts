import {
  Home,
  ChartPie,
  ChartLine,
  ShoppingBag,
  ReceiptText,
  Users,
  List,
  User,
  Cog,
  BarChart4,
  Boxes,
  Wallet,
  FileBarChart2,
  type LucideIcon,
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
          { title: "Pertumbuhan", url: "/admin/dashboard/statistic/umkm-growth", icon: ChartLine },
        ],
      },
      {
        title: "Data UMKM",
        url: "/admin/dashboard/umkm-data",
        icon: ShoppingBag,
        subItems: [
          { title: "Daftar UMKM", url: "/admin/dashboard/umkm-data/umkm-list", icon: List },
          { title: "Penjualan UMKM", url: "/admin/dashboard/umkm-data/umkm-activity", icon: ReceiptText },
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
        subItems: [{ title: "Daftar Pengguna", url: "/admin/users/user-list", icon: User }],
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
        subItems: [{ title: "Statistik Produk", url: "/umkm/dashboard/statistic/business-summary", icon: BarChart4 }],
      },
      {
        title: "Manajemen Usaha",
        url: "/umkm/dashboard/business-management",
        icon: ShoppingBag,
        subItems: [
          { title: "Daftar Produk", url: "/umkm/dashboard/business-management/product-list", icon: Boxes },
          {
            title: "Data Penjualan",
            url: "/umkm/dashboard/business-management/sales-data",
            icon: ReceiptText,
          },
        ],
      },
      {
        title: "Keuangan & Inventori",
        url: "/umkm/dashboard/money-inventory",
        icon: Wallet,
        subItems: [
          {
            title: "Laporan",
            url: "/umkm/dashboard/money-inventory/money-reports",
            icon: FileBarChart2,
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
