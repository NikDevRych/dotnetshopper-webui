import { Box } from "@mui/material";
import CardItem from "../card-item/card-item";

export default function CardList() {
  return (
    <>
      <Box
        sx={{ display: "flex", flexWrap: "wrap", gap: "14px", padding: "10px" }}
      >
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </Box>
    </>
  );
}
