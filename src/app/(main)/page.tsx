import CardList from "@/components/card-list/card-list";
import { API, PRODUCT } from "@/constants/api-constants";
import { GetProducts } from "@/interfaces/product";
import { Container } from "@mui/material";
import axios from "axios";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const url = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/${API}/${PRODUCT}?count=${10}&skip=${(currentPage - 1) * 10}`;
  const response = await axios.get<GetProducts>(url);
  const products = response.data.products;
  const maxPages = response.data.maxPages;

  return (
    <Container maxWidth="xl">
      <CardList products={products} maxPages={maxPages} />
    </Container>
  );
}
