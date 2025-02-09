import { Box } from "@mui/material";
import CardItem from "../card-item/card-item";
import { Product } from "@/interfaces/product";
import ClientPagination from "../pagination/client-pagination";

export default function CardList({
  products,
  maxPages,
}: Readonly<{ products: Product[]; maxPages: number }>) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, padding: 2 }}>
          {products.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
        </Box>
        <ClientPagination maxPages={maxPages} />
      </Box>
    </>
  );
}
