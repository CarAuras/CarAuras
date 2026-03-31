import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ label = "", options, value, onChange }) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      value={value}
      onChange={onChange}
      sx={{
        width: "100%",
        "& .MuiAutocomplete-listbox": {
          fontSize: "2.2rem",
        },
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
