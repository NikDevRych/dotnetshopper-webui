"use client";

import {
  AppBar,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryMenu from "../category-menu/category-menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#424242" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link href="/">
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Image
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "white",
                  borderRadius: "100%",
                }}
                src="/dotnet-logo.svg"
                width={50}
                height={50}
                alt="dotnet-shopper-logo"
              />
              <Typography
                sx={{ display: { xs: "none", md: "block" } }}
                variant="h5"
              >
                DotNet Shopper
              </Typography>
            </Stack>
          </Link>

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Button variant="contained" onClick={handleOpen}>
              Category
            </Button>
            <TextField
              variant="outlined"
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <IconButton color="primary">
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
            <IconButton color="primary">
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <CategoryMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </>
  );
}
