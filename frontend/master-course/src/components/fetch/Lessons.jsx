import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchCourse } from "../../api/course.api.mjs";
import Loader from "../../components/common/Loader";
import LessonCard from "../cards/LessonCard";
import { useParams } from "react-router-dom";

const Lessons = () => {
  const { cid } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["courses", cid],
    queryFn: fetchCourse,
    onSuccess: () => {},
    onError: () => {},
  });

  if (isLoading) return <Loader />;

  const { modules } = data;

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Lessons
      </Typography>

      {modules.map((module, index) => (
        <LessonCard key={index} lesson={module} id={index} />
      ))}
    </Box>
  );
};

export default Lessons;
