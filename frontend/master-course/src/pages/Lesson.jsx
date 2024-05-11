import React from "react";
import { Box, Typography } from "@mui/material";
import LessonLayout from "../components/layout/LessonLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchLesson } from "../api/lesson.api.mjs";
import { useParams } from "react-router-dom";

import Loader from "../components/common/Loader";

const Lesson = () => {
  const { lid } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["lesson", lid],
    queryFn: fetchLesson,
    onSuccess: () => {},
    onError: () => {},
  });

  if (isLoading) {
    return <Loader />;
  }

  console.log(data);

  return (
    <LessonLayout>
      <Box>
        <Typography variant="h2">{data.title}</Typography>
        <Box dangerouslySetInnerHTML={{ __html: data.content }} />
      </Box>
    </LessonLayout>
  );
};

export default Lesson;
