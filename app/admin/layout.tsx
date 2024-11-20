import Image from "next/image";
import Menu from "../components/Menu";
import Link from "next/link";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className=" w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]  ">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2 p-3"
        >
          <Image src={"/logo.svg"} alt="logo" width={50} height={40} />
          <span className="hidden lg:block font-bold text-lg ">
            GoldenShop
          </span>
        </Link>
        <div className="sticky top-0">
        <Menu />
        </div>
      </div>
      {/* Main content */}
      <div className="w-full">
     <Navbar/>
          {children}
          
      </div>
    </div>
    </ThemeProvider>
  );
}
