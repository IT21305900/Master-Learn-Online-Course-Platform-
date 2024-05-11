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

const LessonForm = ({ handleSend, setForm }) => {
  //reference
  const editor = useRef(null);

  //state management
  const [content, setContent] = useState({
    title: "",
    content: "",
  });

  //handle the changes
  const handleChange = (e) => {
    const { name, value } = e;

    setContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //save the changes
  const handleSave = (e) => {
    e.preventDefault();

    //save the change
    setForm((prev) => ({
      ...prev,
      ...content,
    }));

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
      <Typography variant="h4">Lesson Form</Typography>

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
          value={content.description}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) =>
            handleChange({ name: "content", value: newContent })
          } // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) =>
            handleChange({ name: "content", value: newContent })
          }
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

export default LessonForm;
