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

export const umkmSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Dashboards",
    items: [
      {
        title: "Analisa Statistik",
        url: "/umkm/dashboard/statistic",
        icon: Home,
        subItems: [
          { title: "Analisa UMKM", url: "/umkm/dashboard/statistic/umkm-analytic", icon: ChartPie },
          { title: "Sebaran Wilayah", url: "/umkm/dashboard/statistic/umkm-regional", icon: Grid2X2 },
          { title: "Pertumbuhan", url: "/umkm/dashboard/statistic/umkm-growth", icon: ChartLine },
          // { title: "eCommerce", url: "/umkm/dashboard/e-commerce", icon: ShoppingBag, comingSoon: true },
          // { title: "Academy", url: "/umkm/dashboard/academy", icon: BookA, comingSoon: true },
          // { title: "Logistics", url: "/umkm/dashboard/logistics", icon: Forklift, comingSoon: true },
        ],
      },
      {
        title: "Data UMKM",
        url: "/umkm/dashboard/umkm-data",
        icon: ShoppingBag,
        subItems: [
          { title: "Daftar UMKM", url: "/umkm/dashboard/umkm-data/umkm-list", icon: List },
          { title: "Verifikasi UMKM", url: "/umkm/dashboard/umkm-data/umkm-verification", icon: CheckCheck },
          { title: "Aktivitas UMKM", url: "/umkm/dashboard/umkm-data/umkm-activity", icon: Activity },
        ],
      },
      {
        title: "Program Bantuan",
        url: "/umkm/dashboard/fund-program",
        icon: BookA,
        subItems: [
          { title: "Daftar Program", url: "/umkm/dashboard/fund-program/program-list", icon: CalendarCheck },
          { title: "UMKM Penerima", url: "/umkm/dashboard/fund-program/umkm-selected-list", icon: UserCheck },
          { title: "Riwayat Bantuan", url: "/umkm/dashboard/fund-program/fund-history", icon: History },
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
