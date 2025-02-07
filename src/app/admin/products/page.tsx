"use client";

import {
  Alert,
  Button,
  Container,
  IconButton,
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
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import axios from "axios";
import { API, PRODUCT } from "@/constants/api-constants";
import { GetProducts, Product } from "@/interfaces/product";
import { useEffect, useState } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [maxPages, setMaxPages] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(false);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getProducts = () => {
      setError(false);

      const url = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/${API}/${PRODUCT}?count=${rowsPerPage}&skip=${page * 10}`;
      axios
        .get<GetProducts>(url)
        .then((res) => {
          setProducts(res.data.products);
          setMaxPages(res.data.maxPages);
        })
        .catch(() => setError(true));
    };

    getProducts();
  }, [page, rowsPerPage]);

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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableItem key={product.id} product={product} />
            ))}
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
          count={maxPages * 10}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>

      {error && (
        <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
          Cant load products, please try leter...
        </Alert>
      )}
    </Container>
  );
}

function TableItem({ product }: Readonly<{ product: Product }>) {
  return (
    <TableRow hover>
      <TableCell>{product.id}</TableCell>

      <TableCell>
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            width={40}
            height={40}
            alt="product-image"
          />
        )}
      </TableCell>

      <TableCell>{product.name}</TableCell>
      <TableCell>{product.price}$</TableCell>

      <TableCell>
        <Link href={`/admin/products/${product.id}`} scroll={false}>
          <IconButton color="primary">
            <EditIcon />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
}
