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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { sectionSchema } from "./schema";
import { z } from "zod";
import Link from "next/link";

export const CellAction = ({ data }: { data: z.infer<typeof sectionSchema> }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/facilities/${data.id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-facilities"],
      });
      setOpenDelete(false);
      toast.success("Data berhasil dihapus!");
    },
    onError: () => {
      setOpenDelete(false);
      toast.error("Data gagal dihapus!");
    },
  });

  return (
    <>
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin hapus data?</AlertDialogTitle>
            <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending} className="cursor-pointer">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutation.isPending}
              className="cursor-pointer bg-red-500 hover:bg-red-600"
              onClick={() => deleteMutation.mutate()}
            >
              {deleteMutation.isPending ? "Loading..." : "Hapus"}
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
