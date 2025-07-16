import { Home, ChartPie, ShoppingBag, ReceiptText, List, BarChart4, Boxes, type LucideIcon } from "lucide-react";

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
        subItems: [{ title: "Analisa UMKM", url: "/admin/dashboard/statistic/umkm-analytic", icon: ChartPie }],
      },
      {
        title: "Data UMKM",
        url: "/admin/dashboard/umkm-data",
        icon: ShoppingBag,
        subItems: [
          { title: "Daftar UMKM", url: "/admin/dashboard/umkm-data/umkm-list", icon: List },
          { title: "Penjualan UMKM", url: "/admin/dashboard/umkm-data/umkm-sales", icon: ReceiptText },
        ],
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
          { title: "Data Produk", url: "/umkm/dashboard/business-management/product-list", icon: Boxes },
          {
            title: "Data Penjualan",
            url: "/umkm/dashboard/business-management/sales-data",
            icon: ReceiptText,
          },
        ],
      },
    ],
  },
];
