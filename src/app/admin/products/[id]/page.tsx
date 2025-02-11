"use client";

import CustomTabPanel from "@/components/admin/custom-tab-panel/custom-tab-panel";
import GeneralInfoTab from "./genera-info-tab";
import { useState } from "react";
import { Container, Box, Tabs, Tab } from "@mui/material";
import CategoriesTab from "./categories-tab";

export default function EditProduct({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [tabValue, setTabValue] = useState(0);

  const handleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs value={tabValue} onChange={handleTab}>
          <Tab label="General Info" />
          <Tab label="Categories" />
        </Tabs>
      </Box>

      <CustomTabPanel index={0} value={tabValue}>
        <GeneralInfoTab params={params} />
      </CustomTabPanel>
      <CustomTabPanel index={1} value={tabValue}>
        <CategoriesTab />
      </CustomTabPanel>
    </Container>
  );
}
