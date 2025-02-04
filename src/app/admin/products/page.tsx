"use client";

import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Link from "next/link";

export default function AdminProducts() {
  const handleChangePage = () => {};

  const handleChangeRowsPerPage = () => {};

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
            <TableItem />
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Link href="/admin/products/create">
          <Button
            variant="contained"
            size="small"
            startIcon={<KeyboardDoubleArrowDownIcon />}
          >
            Insert product
          </Button>
        </Link>
        <TablePagination
          component="div"
          count={100}
          page={2}
          rowsPerPage={10}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </Container>
  );
}

function TableItem() {
  return (
    <TableRow hover>
      <TableCell>1</TableCell>
      <TableCell>
        <Image src="/laptop.webp" width={40} height={40} alt="product-image" />
      </TableCell>
      <TableCell>Product name may be long</TableCell>
      <TableCell>300$</TableCell>
    </TableRow>
  );
}
