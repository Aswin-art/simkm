"use client";

import { useCallback, useEffect, useState } from "react";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getInitials } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";
import { getCurrentUser } from "@/actions/users";

export function AccountSwitcher() {
  const [user, setUser] = useState<any>(null);
  const handleFetchUser = useCallback(async () => {
    try {
      const response = await getCurrentUser();

      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error in AppSidebar:", error);
    }
  }, []);

  useEffect(() => {
    handleFetchUser();
  }, [handleFetchUser]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-lg">
          <AvatarImage src={user?.avatar ?? undefined} alt={user?.name} />
          <AvatarFallback className="rounded-lg">{getInitials(user?.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 space-y-1 rounded-lg" side="bottom" align="end" sideOffset={4}>
        <DropdownMenuItem
          key={user?.email}
          className={cn("p-0", user?.id === user?.id && "bg-accent/50 border-l-primary border-l-2")}
          onClick={() => setUser(user)}
        >
          <div className="flex w-full items-center justify-between gap-2 px-1 py-1.5">
            <Avatar className="size-9 rounded-lg">
              <AvatarImage src={user?.avatar ?? undefined} alt={user?.name} />
              <AvatarFallback className="rounded-lg">{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.name}</span>
              <span className="truncate text-xs capitalize">{user?.role}</span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logoutAction}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
