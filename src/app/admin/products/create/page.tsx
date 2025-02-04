"use client";

import {
  Button,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Checkbox,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function CreateProduct() {
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Paper elevation={2} sx={{ padding: 2 }}>
        <Stack direction="column" spacing={2}>
          <TextField label="Product name" variant="standard" type="text" />
          <TextField label="Product price" variant="standard" type="number" />
          <FormControlLabel label="Active" control={<Checkbox />} />
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
          <Button color="warning" variant="contained">Create product</Button>
        </Stack>
      </Paper>
    </Container>
  );
}
