import * as React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Card,
  CardContent,
  Stack,
  IconButton,
  Button,
  CardMedia,
} from "@mui/material";
import Typography from "@mui/material/Typography";

const CourseCard = ({ course }) => {
  const handleNavigate = (action) => {
    if (action === "view") {
      window.location.href = `/course/${course?.key}`;
    }
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        border: "1px solid #d3dce6",
        borderRadius: "0.5rem",
      }}
    >
      <Box sx={{ m: 1, borderRadius: "0.4rem", overflow: "hidden" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image="https://images.pexels.com/photos/7135057/pexels-photo-7135057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </Box>

      <CardContent>
        <Stack spacing={2}>
          <Typography
            sx={{ color: "#2E78F0" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {/* {course?.title} */}
            Master the Kubernatee Docker
          </Typography>

          <Typography gutterBottom variant="subtitle2" component="div">
            {/* {course.description} */}
            Coducted by Peter Smith
          </Typography>

          <Typography sx={{}} gutterBottom variant="body1" component="div">
            {/* {course.description} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            temporibus odio blanditiis itaque sit, est doloribus culpa impedit
            libero esse, numquam veritatis ipsa quis et perferendis excepturi
            quod, amet ipsum.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ color: "#2E78F0" }}
              variant="h6"
              color="text.secondary"
            >
              {`$ ${course?.price}.00`}
            </Typography>

            <Typography
              sx={{ color: "#2E78F0" }}
              variant="h6"
              color="text.secondary"
            >
              12 lessons
            </Typography>
          </Box>

          <Box sx={{ display: "flex", pt: 1 }}>
            <IconButton
              color="primary"
              variant="outlined"
              sx={{ borderRadius: "50%", border: "1px solid #2E78F0" }}
              onClick={() => {}}
            >
              <FavoriteBorder />
            </IconButton>
            {/* <Button variant="outlined" onClick={() => handleNavigate("view")}>
              Share
            </Button> */}
            <Button
              sx={{ ml: "auto", px: 8 }}
              variant="contained"
              onClick={() => handleNavigate("view")}
            >
              View
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
