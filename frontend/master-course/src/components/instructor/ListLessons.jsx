import React from "react";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchCourse } from "../../api/course.api.mjs";
import Loader from "../../components/common/Loader";
import LessonCard from "../cards/LessonCard";

const ListLessons = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["courses", "357c546c-d674-41b9-a5cd-a2bc2c9f5ac5"],
    queryFn: fetchCourse,
    onSuccess: () => {},
    onError: () => {},
  });

  if (isLoading) return <Loader />;

  const { modules } = data;

  return (
    <Box>
      {modules.map((module, index) => (
        <LessonCard key={index} lesson={module} id={index} />
      ))}
    </Box>
  );
};

export default ListLessons;
