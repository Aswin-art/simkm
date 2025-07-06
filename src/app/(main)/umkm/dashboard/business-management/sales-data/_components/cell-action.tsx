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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { sectionSchema } from "./schema";

export const CellAction = ({ item }: { item: z.infer<typeof sectionSchema> }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/facilities/${item.id}`, {
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

      <Button size={"sm"} onClick={() => setOpenDelete(true)} className="cursor-pointer bg-red-600 hover:bg-red-800">
        <Trash className="mr-2 h-4 w-4" /> Hapus
      </Button>
    </>
  );
};
