"use client";

import { Menu } from "@mui/material";
import CategoryMenuItem from "./category-menu-item";

export default function CategoryMenu({
  anchorEl,
  open,
  handleClose,
}: Readonly<{
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}>) {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <CategoryMenuItem name="Phones" link="/phone" handleClose={handleClose} />
    </Menu>
  );
}
