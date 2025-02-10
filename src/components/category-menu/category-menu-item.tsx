"use client";

import { MenuItem } from "@mui/material";
import Link from "next/link";

export default function CategoryMenuItem({
  name,
  link,
  handleClose,
}: Readonly<{ name: string; link: string; handleClose: () => void }>) {
  return (
    <Link href={link} scroll={false}>
      <MenuItem onClick={handleClose}>{name}</MenuItem>
    </Link>
  );
}
