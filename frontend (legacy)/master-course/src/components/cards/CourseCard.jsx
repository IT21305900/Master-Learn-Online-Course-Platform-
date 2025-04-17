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

const CourseCard = ({ course, type }) => {
  const handleNavigate = (action) => {
    if (action === "view") {
      window.location.href = `/course/${course?.key}`;
    }
    if (action === "edit") {
      window.location.href = `/instructor/course/lesson?course=${course.key}`;
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
            {course?.title}
          </Typography>

          <Typography gutterBottom variant="subtitle2" component="div">
            {/* {course.description} */}
            {course?.instructor ? course.instructor : "Peter David"}
          </Typography>

          <Typography sx={{}} gutterBottom variant="body1" component="div">
            {course.description}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ color: "#2E78F0" }}
              variant="h6"
              color="text.secondary"
            >
              {`$ ${course?.price}.00`}
            </Typography>

            {/* <Typography
              sx={{ color: "#2E78F0" }}
              variant="h6"
              color="text.secondary"
            >
              12 lessons
            </Typography> */}
          </Box>

          <Box sx={{ display: "flex", pt: 1, justifyContent: "space-between" }}>
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
            <Box>
              {type === "instructor" && (
                <Button
                  sx={{ mr: 1, px: 8 }}
                  variant="outlined"
                  onClick={() => handleNavigate("edit")}
                >
                  Edit
                </Button>
              )}
              <Button
                sx={{ ml: "auto", px: 8 }}
                variant="contained"
                onClick={() => handleNavigate("view")}
              >
                View
              </Button>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
