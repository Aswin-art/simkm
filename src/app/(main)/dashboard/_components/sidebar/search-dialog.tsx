"use client";
import * as React from "react";

import { ChartPie, Grid2X2, ChartLine, ShoppingBag, BookA, Forklift, Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const searchItems = [
  { group: "Analisa Statistik", icon: ChartPie, label: "Analisa UMKM" },
  { group: "Analisa Statistik", icon: Grid2X2, label: "Sebaran Wilayah" },
  { group: "Analisa Statistik", icon: ChartLine, label: "Pertumbuhan" },
  { group: "Data UMKM", icon: ShoppingBag, label: "Daftar UMKM" },
  { group: "Data UMKM", icon: BookA, label: "Verifikasi UMKM" },
  { group: "Data UMKM", icon: Forklift, label: "Aktivitas UMKM" },
  { group: "Program Bantuan", icon: Forklift, label: "Daftar Program" },
  { group: "Program Bantuan", icon: Forklift, label: "UMKM Penerima" },
  { group: "Program Bantuan", icon: Forklift, label: "Riwayat Bantuan" },
  { group: "Users", label: "Daftar Pengguna" },
  { group: "Users", label: "Verifikasi Pengguna" },
  { group: "Users", label: "Hak Akses" },
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
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
        <CommandInput placeholder="Cari data umkm, pengguna, dan lainnya..." />
        <CommandList>
          <CommandEmpty>Data tidak ditemukan.</CommandEmpty>
          {[...new Set(searchItems.map((item) => item.group))].map((group, i) => (
            <React.Fragment key={group}>
              {i !== 0 && <CommandSeparator />}
              <CommandGroup heading={group} key={group}>
                {searchItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <CommandItem className="!py-1.5" key={item.label} onSelect={() => setOpen(false)}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                      {/* {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>} */}
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
