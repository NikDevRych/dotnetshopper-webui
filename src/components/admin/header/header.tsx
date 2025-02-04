"use client";

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useState } from "react";
import Link from "next/link";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);

  const handleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => handleDrawer(true)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>
          <IconButton size="large" color="inherit">
            <AccountCircleIcon fontSize="inherit" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => handleDrawer(false)}>
        <Box>
          <List>
            <Link href="/admin">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Main" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link href="/admin/products">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InventoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
