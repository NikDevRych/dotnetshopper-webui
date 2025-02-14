import { API, CATEGORY, PRODUCT } from "@/constants/api-constants";
import { Category } from "@/interfaces/category";
import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

interface Option {
  label: string;
  id: number;
}

export default function CategoriesTab({
  productId,
  productCategories,
  categories,
}: {
  productId: number;
  productCategories: Category[];
  categories: Category[];
}) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [pageCategories, setPageCategories] = useState(productCategories);

  const onDelete = (id: number) => {
    setPageCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const onSubmit = async () => {
    if (!selectedOption) return;
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/${API}/${PRODUCT}/${productId}/${CATEGORY}`;
    const data = [selectedOption];

    try {
      await axios.post(url, data);

      const addedCategory = categories.find(
        (category) => category.id == selectedOption,
      );

      if (addedCategory) {
        setPageCategories((prev) => [...prev, addedCategory]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          {pageCategories &&
            pageCategories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                onDelete={() => onDelete(category.id)}
              />
            ))}
          {!pageCategories ||
            (pageCategories.length === 0 && (
              <Typography color="primary" variant="subtitle1">
                Product not have any category
              </Typography>
            ))}
        </Stack>

        <Divider />

        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
          <Autocomplete
            onChange={(event: React.SyntheticEvent, value: Option | null) => {
              setSelectedOption(value && value.id);
            }}
            size="small"
            disablePortal
            sx={{ width: 200 }}
            options={categories.map((category) => ({
              label: category.name,
              id: category.id,
            }))}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <Button variant="contained" size="small" onClick={onSubmit}>
            Add category
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
