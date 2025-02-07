"use client";

import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/interfaces/product";
import {
  API,
  IMAGE_FORM_DATA_KEY,
  PRODUCT,
  UPLOAD_IMAGE_URL,
} from "@/constants/api-constants";
import axios from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ProductInput from "@/interfaces/product-input";

export default function EditProduct({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [product, setProduct] = useState<Product>();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductInput>({
    defaultValues: {
      name: "",
      price: 0,
      imageUrl: undefined,
      isActive: false,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        isActive: product.isActive,
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<ProductInput> = async (data: ProductInput) => {
    if (file) {
      const awsS3Url = process.env.NEXT_PUBLIC_AWS_S3_URL;
      const awS3Bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

      const formData = new FormData();
      formData.append(IMAGE_FORM_DATA_KEY, file);

      try {
        await axios.post(UPLOAD_IMAGE_URL, formData);
        data.imageUrl = `${awsS3Url}/${awS3Bucket}/${file.name}`;
      } catch {
        console.log("error img");
        return;
      }
    }

    const url = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/${API}/${PRODUCT}/${product?.id}`;

    try {
      await axios.put(url, data);
    } catch {
      console.log("error product");
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const id = (await params).id;
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/${API}/${PRODUCT}/${id}`;

      axios
        .get<Product>(url)
        .then((res) => setProduct(res.data))
        .catch(() => setLoadError(true))
        .finally(() => setLoading(false));
    };

    getProduct();
  }, [params]);

  if (loadError) {
    return (
      <Alert
        sx={{ margin: 2 }}
        icon={<CloseIcon fontSize="inherit" />}
        severity="error"
      >
        Error while get product, please try leter...
      </Alert>
    );
  }

  if (!product) {
    return (
      <Backdrop open={loading}>
        <CircularProgress size={100} />;
      </Backdrop>
    );
  } else {
    return (
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Paper elevation={2} sx={{ padding: 2 }}>
          <Stack
            direction="column"
            spacing={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              disabled
              label="Product ID"
              variant="standard"
              type="text"
              defaultValue={product.id}
            />

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

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {product?.imageUrl && (
                <Image
                  src={product.imageUrl}
                  width={100}
                  height={100}
                  alt="product-image"
                />
              )}
            </Box>

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
              Update product
            </Button>

            <Divider>
              <Chip size="small" label="Dungeon zone" />
            </Divider>

            <Button color="error" variant="contained">
              Remove product
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }
}
