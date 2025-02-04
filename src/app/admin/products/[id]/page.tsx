"use client";

import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";

export default function EditProduct({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  //const id = (await params).id;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <Stack direction="column" spacing={2}>
          <TextField
            disabled
            label="Product ID"
            variant="standard"
            type="text"
            defaultValue={1}
          />
          <TextField
            label="Product name"
            variant="standard"
            type="text"
            defaultValue="Product name may be long	"
          />
          <TextField
            label="Product price $"
            variant="standard"
            type="number"
            defaultValue="300"
          />
          <FormControlLabel
            label="Active"
            control={<Checkbox defaultChecked />}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/laptop.webp"
              width={100}
              height={100}
              alt="product-image"
            />
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
              onChange={(event) => console.log(event.target.files?.[0])}
              hidden
            />
          </Button>
          <Button color="warning" variant="contained">
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
