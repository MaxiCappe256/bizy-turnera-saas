"use client";
import { PanelSidebar } from "@/components/panel/sidebar";
import { PanelNavbar } from "@/components/panel/navbar";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <PanelSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PanelNavbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
