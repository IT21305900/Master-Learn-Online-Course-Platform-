import { Button, TextField, Box, Divider } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "500px",
  },
});

const SearchCourse = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearch(value);
  };

  const handleSearch = () => {};

  return (
    <Box  sx={{mt: 4}}>
      <Box
        sx={{
          m: "auto",
          display: "flex",
          gap: 2,
          maxWidth: "700px",
          border: "1px solid #d3dce6",
          p: 2,
          my: 1,
          borderRadius: "500px",
        }}
      >
        <StyledTextField
          fullWidth
          label="Search Course"
          size="small"
          sx={{ borderRadius: "500px" }}
          name="search"
          value={search}
          onChange={handleChange}
        />
        <Button
          sx={{ borderRadius: "500px", px: 4 }}
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      <Divider sx={{ py: 1 }} />
    </Box>
  );
};

export default SearchCourse;
