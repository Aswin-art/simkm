"use client";
import * as React from "react";

import { ChartPie, ShoppingBag, BookA, Forklift, Search, List } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

const searchItems = [
  {
    group: "Statistik Usaha",
    icon: ChartPie,
    label: "Statistik Produk",
    url: "/umkm/dashboard/statistic/business-summary",
  },
  {
    group: "Manajemen Usaha",
    icon: List,
    label: "Data Produk",
    url: "/umkm/dashboard/business-management/product-list",
  },
  {
    group: "Manajemen Usaha",
    icon: BookA,
    label: "Data Penjualan",
    url: "/umkm/dashboard/business-management/sales-data",
  },
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        className="text-muted-foreground flex cursor-pointer items-center gap-2 text-sm"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4" />
        Cari cepat
        <kbd className="bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Cari statistik usaha, manajemen usaha dan lainnya..." />
        <CommandList>
          <CommandEmpty>Data tidak ditemukan.</CommandEmpty>
          {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group} key={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem
                      key={item.label}
                      className={`flex items-center justify-between !py-1.5`}
                      onSelect={() => {
                        setOpen(false);
                        router.push(item.url);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.label}</span>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
