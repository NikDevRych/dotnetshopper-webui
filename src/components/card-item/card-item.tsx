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

export default function CardItem() {
  return (
    <Card sx={{ width: "240px" }} elevation={2}>
      <CardMedia>
        <Image src="/laptop.webp" width={240} height={240} alt="product-item" />
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
          Product Name its maybe long or not
        </Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: "baseline" }}>
          <Typography variant="h6" color="primary">
            $299
          </Typography>
          <Typography
            sx={{ textDecoration: "line-through" }}
            variant="subtitle1"
          >
            $300
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
