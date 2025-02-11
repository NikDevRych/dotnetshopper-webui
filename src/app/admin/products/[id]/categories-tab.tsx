import {
  Autocomplete,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";

export default function CategoriesTab() {
  const handleDelete = () => {
    // TODO: add remove category functional
  };

  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" spacing={2}>
          <Chip label="Phone" onDelete={handleDelete} />
          <Chip label="Laptop" onDelete={handleDelete} />
        </Stack>

        <Divider />

        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
          <Autocomplete
            size="small"
            disablePortal
            sx={{ width: 200 }}
            options={[{ label: "Phone" }, { label: "Laptop" }]}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <Button variant="contained" size="small">
            Add category
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
