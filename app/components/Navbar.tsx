import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { BellRing, CircleUser, MessageSquareMore, Search } from "lucide-react";
import React from "react";

function Navbar() {
  return (
    <div className="flex items-center justify-between p-4">
      {/* searchbar */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Search className=" text-gray-600 py-2 w-5 h-8" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none w-[200px] bg-transparent"
        />
      </div>
      {/* avatar */}
      <div className="flex items-center gap-6 justify-end w-full">
        <Button variant="secondary" size="icon" className="rounded-full ">
          <MessageSquareMore className="w-6 h-6" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full relative"
        >
          <div className="absolute -top-3 -right-3 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            1
          </div>
          <BellRing className="w-6 h-6" />
        </Button>
        <div>
            <ModeToggle/>
        </div>
        <div className="flex flex-col">
          <span className="text-sm leading-3 font-medium">
            adnane el otmani
          </span>
          <span className="text-xs  text-gray-600 text-right">Admin</span>
        </div>

        <div className="flex gap-4 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={6}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <LogoutLink>Logout</LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
