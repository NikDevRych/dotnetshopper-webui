"use client";

import {
  Button,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Checkbox,
  Paper,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ProductInput from "@/interfaces/product-input";
import { useState } from "react";
import axios from "axios";

export default function CreateProduct() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductInput>({
    defaultValues: {
      name: "",
      price: 0,
      imageUrl: undefined,
      isActive: false,
    },
  });

  const [file, setFile] = useState<File | null>(null);
  const [createError, setCreateError] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const onSubmit: SubmitHandler<ProductInput> = (data: ProductInput) => {
    setCreateError(false);
    setCreateSuccess(false);

    const url = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/api/product`;
    axios
      .post(url, data)
      .then(() => setCreateSuccess(true))
      .catch(() => setCreateError(true));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <Stack
          direction="column"
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.name != null}
                helperText={errors.name && "Product name is required"}
                label="Product name"
                variant="standard"
                type="text"
                {...field}
              />
            )}
          />

          <Controller
            name="price"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.price != null}
                helperText={errors.price && "Product price is required"}
                label="Product price"
                variant="standard"
                type="number"
                {...field}
              />
            )}
          />

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                label="Active"
                control={<Checkbox />}
                {...field}
              />
            )}
          />

          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <input
              type="file"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              hidden
            />
          </Button>

          <Button color="warning" variant="contained" type="submit">
            Create product
          </Button>

          {createSuccess && (
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Product create successful!
            </Alert>
          )}

          {createError && (
            <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
              Error while create product, please try leter...
            </Alert>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
