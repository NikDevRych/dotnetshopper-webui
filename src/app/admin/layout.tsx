"use client";

import AdminHeader from "@/components/admin/header/header";
import AdminSidebar from "@/components/admin/sidebar/sidebar";
import { useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openSiderbar, setOpenSiderbar] = useState(true);

  const toggleSiderbar = () => {
    setOpenSiderbar(!openSiderbar);
  };

  return (
    <div className="flex">
      <AdminSidebar isOpen={openSiderbar} />
      <div className="flex-1">
        <AdminHeader onClick={toggleSiderbar} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
