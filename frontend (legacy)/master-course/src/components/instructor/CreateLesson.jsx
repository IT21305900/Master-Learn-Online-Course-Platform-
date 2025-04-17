import React, { useState } from "react";
import { Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LessonForm from "../forms/LessonForm.jsx";
import { createLesson } from "../../api/lesson.api.mjs";

const CreateLesson = ({ course }) => {
  const [form, setForm] = useState({
    cid: course,
    title: "",
    content: "",
  });

  const queryClient = useQueryClient();

  //mutation
  const mutation = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries("course");
    },
    onError: () => {},
  });

  //handle send
  const handleSend = () => {
    console.log(form);
    mutation.mutateAsync(form);
  };

  return (
    <Box>
      <LessonForm handleSend={handleSend} form={form} setForm={setForm} />
    </Box>
  );
};

export default CreateLesson;
