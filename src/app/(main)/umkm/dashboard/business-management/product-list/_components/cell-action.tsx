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
import * as z from "zod";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { sectionSchema } from "./schema";
import { remove } from "@/actions/products";

export const CellAction = ({ item }: { item: z.infer<typeof sectionSchema> }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const response = await remove(item.id);

    if (response.error) {
      toast.error(response.error);
      setIsLoading(false);
    }

    if (response.success) {
      toast.success("Produk berhasil dihapus");
      setOpenDelete(false);
      setIsLoading(false);
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

      <Button size={"sm"} onClick={() => setOpenDelete(true)} className="cursor-pointer bg-red-600 hover:bg-red-800">
        <Trash className="mr-2 h-4 w-4" /> Hapus
      </Button>
    </>
  );
};
