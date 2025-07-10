"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { sectionSchema } from "./schema";
import { z } from "zod";
import Link from "next/link";
import { removeUmkm } from "@/actions/users";

export const CellAction = ({ data }: { data: z.infer<typeof sectionSchema> }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await removeUmkm(data.id);

    if (response.error) {
      return toast.error(response.error);
    }

    if (response.success) {
      toast.success("Data berhasil dihapus!");
      window.location.reload();
    }
  };

  return (
    <>
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin hapus data?</AlertDialogTitle>
            <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading} className="cursor-pointer">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isLoading}
              className="cursor-pointer bg-red-500 hover:bg-red-600"
              onClick={() => handleDelete()}
            >
              {isLoading ? "Loading..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 cursor-pointer p-0">
            <span className="sr-only">Buka menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer">
            <Link href={"/admin/dashboard/umkm-data/umkm-list/" + data.id} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" /> Detail
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)} className="cursor-pointer">
            <Trash className="mr-2 h-4 w-4" /> Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
