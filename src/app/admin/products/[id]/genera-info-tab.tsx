import {
  Paper,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Divider,
  Chip,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Product } from "@/interfaces/product";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  IMAGE_FORM_DATA_KEY,
  UPLOAD_IMAGE_URL,
  API,
  PRODUCT,
} from "@/constants/api-constants";
import ProductInput from "@/interfaces/product-input";
import Image from "next/image";

export default function GeneralInfoTab({ product }: { product: Product }) {
  const [file, setFile] = useState<File | null>(null);
  const [updateError, setUpdateError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [removeError, setRemoveError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const router = useRouter();

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
    setUpdateError(false);
    setImageError(false);
    setUpdateSuccess(false);

    if (file) {
      const awsS3Url = process.env.NEXT_PUBLIC_AWS_S3_URL;
      const awS3Bucket = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

      const formData = new FormData();
      formData.append(IMAGE_FORM_DATA_KEY, file);

      try {
        await axios.post(UPLOAD_IMAGE_URL, formData);
        data.imageUrl = `${awsS3Url}/${awS3Bucket}/${file.name}`;
      } catch {
        setImageError(true);
        setUpdateError(true);
        return;
      }
    }

    const url = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/${API}/${PRODUCT}/${product?.id}`;

    try {
      await axios.put(url, data);
      setUpdateSuccess(true);
    } catch {
      setUpdateError(true);
    }
  };

  const onRemove = async () => {
    setRemoveError(false);
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_API_URL}/${API}/${PRODUCT}/${product?.id}`;

    try {
      await axios.delete(url);
      router.replace("/admin/products");
    } catch {
      setRemoveError(true);
    }
  };

  return (
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
              control={<Checkbox defaultChecked={product.isActive} />}
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

        <Button color="error" variant="contained" onClick={onRemove}>
          Remove product
        </Button>

        {updateSuccess && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Product update successful!
          </Alert>
        )}

        {imageError && (
          <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
            Error while upload image, please try leter...
          </Alert>
        )}

        {updateError && (
          <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
            Error while update product, please try leter...
          </Alert>
        )}

        {removeError && (
          <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
            Error while remove product, please try leter...
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
