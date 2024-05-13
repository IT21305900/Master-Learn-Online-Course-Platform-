import React, { useState, useRef, useMemo } from "react";
import {
  TextField,
  Box,
  Stack,
  InputAdornment,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import JoditEditor from "jodit-react";

const CourseForm = ({ setForm, handleSend, form }) => {
  //reference
  const editor = useRef(null);
  //handle the changes
  const handleChange = (e) => {
    const { name, value } = e;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //save the changes
  const handleSave = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        maxWidth: "1000px",
        border: "1px solid #d3dce6",
        p: 1,
        borderRadius: 1,
      }}
      autoComplete="off"
    >
      <Typography variant="h4">Course Form</Typography>

      <Stack spacing={3}>
        <Divider />

        <TextField
          name="title"
          onChange={(e) => handleChange(e.target)}
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />

        {/* <TextField id="outlined-basic" label="Description" variant="outlined" /> */}
        <JoditEditor
          ref={editor}
          value={form?.description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) =>
            handleChange({ name: "description", value: newContent })
          } // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) =>
            handleChange({ name: "description", value: newContent })
          }
        />

        <TextField
          name="price"
          type="number"
          onChange={(e) => handleChange(e.target)}
          label="Price"
          id="outlined-start-adornment"
          sx={{ m: 1 }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <TextField
          name="status"
          onChange={(e) => handleChange(e)}
          label="Status"
          id="outlined-start-adornment"
        />

        <Divider />

        <Box>
          <Button variant="outlined">Cancel</Button>
          <Button
            sx={{ pl: 5, pr: 5, ml: 2 }}
            onClick={handleSave}
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default CourseForm;
