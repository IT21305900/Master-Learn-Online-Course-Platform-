import React, { useState } from "react";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import LessonForm from "../forms/LessonForm.jsx";
import { createLesson } from "../../api/lesson.api.mjs";

const CreateLesson = () => {
  const [form, setForm] = useState({
    cid: "357c546c-d674-41b9-a5cd-a2bc2c9f5ac5",
    title: "",
    content: "",
  });

  //mutation
  const mutation = useMutation({
    mutationFn: createLesson,
    onSuccess: () => {},
    onError: () => {},
  });

  //handle send
  const handleSend = () => {
    console.log(form);
    mutation.mutateAsync(form);
  };
  return (
    <Box>
      <LessonForm handleSend={handleSend} setForm={setForm} />
    </Box>
  );
};

export default CreateLesson;
