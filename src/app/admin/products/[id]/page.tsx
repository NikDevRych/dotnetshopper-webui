"use client";

import CustomTabPanel from "@/components/admin/custom-tab-panel/custom-tab-panel";
import GeneralInfoTab from "./genera-info-tab";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Tabs,
  Tab,
  Alert,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CategoriesTab from "./categories-tab";
import { Product } from "@/interfaces/product";
import axios from "axios";
import { API, PRODUCT } from "@/constants/api-constants";

export default function EditProduct({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs value={tabValue} onChange={handleTab}>
          <Tab label="General Info" />
          <Tab label="Categories" />
        </Tabs>
      </Box>

      <CustomTabPanel index={0} value={tabValue}>
        <GeneralInfoTab product={product} />
      </CustomTabPanel>
      <CustomTabPanel index={1} value={tabValue}>
        <CategoriesTab />
      </CustomTabPanel>
    </Container>
  );
}
