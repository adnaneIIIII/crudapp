"use client";
import Link from "next/link";
import {
  NotepadText,
  ShoppingCart,
  ShoppingBasket,
  Inbox,
  TableOfContents,
  ImageMinus,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navlinks = [
  {
    title: "admin",
    items: [
      {
        icon: Home,
        title: "Dashboard",
        link: "/admin",
      },
      {
        icon: ShoppingBasket,
        title: "Products",
        link: "/admin/products",
      },
      {
        icon: ShoppingCart,
        title: "Orders",
        link: "/admin/orders",
      },
      {
        icon: NotepadText,
        title: "Pages",
        link: "/admin/pages",
      },
      {
        icon: Inbox,
        title: "Comments",
        link: "/admin/comments",
      },
      {
        icon: TableOfContents,
        title: "Categories",
        link: "/admin/categories",
      },
      {
        icon: ImageMinus,
        title: "Banners",
        link: "/admin/banners",
      },
    ],
  },
];

function Menu() {
  const pathname = usePathname();
  return (
    <div className="mt-6 p-4 space-y-6 sticky">
      {navlinks.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-500 font-medium my-4">
            Menu
          </span>
          <div className="mt-2 space-y-2">
            {i.items.map((item) => (
              <Link
                href={item.link}
                key={item.title}
                className={cn(
                  item.link === pathname
                    ? "text-gray-800 font-medium flex gap-2 bg-slate-100 "
                    : "text-muted-foreground hover:text-foreground ",
                  "flex gap-2 px-2 rounded-lg text-sm py-3 items-center"
                )}
              >
                <item.icon
                  className={cn(
                    item.link === pathname
                      ? " font-bold flex gap-2 bg-slate-200 "
                      : "text-muted-foreground hover:text-foreground font-normal",
                    ""
                  )}
                />
                <span className="hidden lg:block">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Menu;
