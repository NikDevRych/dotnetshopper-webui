import CardList from "@/components/card-list/card-list";
import {
  API,
  PARAM_COUNT,
  PARAM_IS_ACTIVE,
  PARAM_SKIP,
  PRODUCT,
} from "@/constants/api-constants";
import { GetProducts } from "@/interfaces/product";
import { Backdrop, CircularProgress, Container } from "@mui/material";
import axios from "axios";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  try {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * 10;
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/${API}/${PRODUCT}?${PARAM_COUNT}=${10}&${PARAM_SKIP}=${skip}&${PARAM_IS_ACTIVE}=${true}`;
    const response = await axios.get<GetProducts>(url);
    const products = response.data.products;
    const maxPages = response.data.maxPages;

    return (
      <Container maxWidth="xl">
        <CardList products={products} maxPages={maxPages} />
      </Container>
    );
  } catch {
    return (
      <Backdrop open>
        <CircularProgress size={100} />
      </Backdrop>
    );
  }
}
