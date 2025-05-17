import React, { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCourse, fetchCourse } from "../../api/course.api.mjs";
import Loader from "../common/Loader";
import UpdateCourse from "./UpdateCourse";

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
      <Button variant="contained" onClick={handleDelete}>
        Delete Course
      </Button>

      <Divider sx={{ my: 2 }} />

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">
            Update Course
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <UpdateCourse cid={course} />
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

export default CourseData;
