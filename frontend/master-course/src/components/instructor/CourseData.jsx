import React from "react";
import { Box, Button, Divider } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { deleteCourse } from "../../api/course.api.mjs";

const CourseData = ({ course }) => {
  const mutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {},
    onError: () => {},
  });

  const handleDelete = () => {
    mutation.mutateAsync(course);
  };

  return (
    <Box>
      <Divider sx={{ mb: 2 }} />

      <Button variant="contained" onClick={handleDelete}>
        Delete Course
      </Button>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default CourseData;
