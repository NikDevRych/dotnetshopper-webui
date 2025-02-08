import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Image from "next/image";
import { Product } from "@/interfaces/product";

export default function CardItem({ product }: Readonly<{ product: Product }>) {
  return (
    <Card sx={{ width: "240px" }} elevation={2}>
      <CardMedia>
        <Image
          src={product.imageUrl || "/not-image.png"}
          width={240}
          height={240}
          alt={product.name}
        />
      </CardMedia>
      <CardContent>
        <Typography
          sx={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          variant="subtitle1"
        >
          {product.name}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: "baseline" }}>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          <Typography
            sx={{ textDecoration: "line-through" }}
            variant="subtitle1"
          >
            ${product.price}
          </Typography>
        </Stack>
        <Rating defaultValue={3.5} precision={0.5} readOnly />
        <Button
          fullWidth
          variant="contained"
          startIcon={<ShoppingCartOutlinedIcon />}
        >
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}
