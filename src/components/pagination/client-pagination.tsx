"use client";

import { Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function ClientPagination({
  maxPages,
}: Readonly<{ maxPages: number }>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber?.toString() || "1");
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination
      size="large"
      count={maxPages}
      page={currentPage}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={createPageURL(item.page)}
          {...item}
        />
      )}
    />
  );
}
