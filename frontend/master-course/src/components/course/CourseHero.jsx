import { Button, Typography, Box, Stack, Avatar } from "@mui/material";
import React from "react";
import { fetchCourse } from "../../api/course.api.mjs";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../common/Loader";
import { useQuery } from "@tanstack/react-query";

const CourseHero = () => {
  const { cid } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryFn: fetchCourse,
    queryKey: ["course", cid],
    onSuccess: () => {},
    onError: () => {},
  });

  const handleNavigate = () => {
    navigate(`/course/${cid}/lesson/${data.modules[0].lid}`);
  };

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Box
        sx={{
          border: "1px solid #d3dce6",
          borderRadius: "20px",
          minHeight: { xs: "92vh", md: "84vh" },
          backgroundImage: `url(https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
          backgroundSize: "cover",
          my: 4,
          backgroundPosition: "right top",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Stack
          spacing={3}
          sx={{
            p: 2,
            display: "flex",
            my: "auto",
            alignItems: { xs: "left", md: "center" },
            height: "100%",
            color: "rgba(255, 255, 255, 0.87)"
          }}
        >
          <Typography variant="h1">{data?.title}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h5">Instructed By</Typography> <Avatar src="A" />{" "}
            <Typography variant="h5">Peter Smith</Typography>
          </Box>

          {/* <Typography variant="body1">{data?.description}</Typography> */}
          <Typography
            variant="body1"
            sx={{ textAlign: { xs: "left", md: "center" } }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
            asperiores molestias culpa minus voluptatem praesentium quibusdam
            magnam saepe, excepturi provident in est nam incidunt adipisci
            debitis nulla neque, animi impedit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. At asperiores molestias culpa minus
            voluptatem praesentium quibusdam magnam saepe, excepturi provident
            in est nam incidunt adipisci debitis nulla neque, animi impedit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
            asperiores molestias culpa minus voluptatem praesentium quibusdam
            magnam saepe, excepturi provident in est nam incidunt adipisci
            debitis nulla neque, animi impedit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. At
          </Typography>

          <Button
            sx={{ maxWidth: "240px", px: 10, py: 1 }}
            variant="contained"
            onClick={handleNavigate}
          >
            Enroll
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CourseHero;
