import { useQuery } from "@tanstack/react-query";
import React from "react";
import { authInstructor } from "../api/auth.api.mjs";
import Loader from "../components/common/Loader";

const InstructorProvider = ({ children }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["autorization"],
    queryFn: authInstructor,
    onSuccess: () => {},
    onError: () => {
      if (error.message === "Not authorized as instructor") {
        history.push("/some-other-page");
      }
    },
  });

  if (isLoading) return <Loader></Loader>;

  console.log(data)

  return children;
};

export default InstructorProvider;
