import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchCourse } from "../../api/course.api.mjs";
import Loader from "../../components/common/Loader";
import LessonCard from "../cards/LessonCard";

const ListLessons = ({ course }) => {
  console.log(course);
  const { isLoading, data } = useQuery({
    queryKey: ["course", course],
    queryFn: fetchCourse,
    onSuccess: () => {},
    onError: () => {},
  });


  if (isLoading) return <Loader />;


  const { modules } = data;

  return (
    <Box>
      <Typography variant="h4" sx={{pb: 2}}>Lessons</Typography>
      {modules.map((module, index) => (
        <LessonCard key={index} lesson={module} id={index} />
      ))}
    </Box>
  );
};

export default ListLessons;
