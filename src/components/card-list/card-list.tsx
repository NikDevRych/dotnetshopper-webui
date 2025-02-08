import { Box, Pagination } from "@mui/material";
import CardItem from "../card-item/card-item";

export default function CardList() {
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
        <Pagination count={10} size="large" />
      </Box>
    </>
  );
}
