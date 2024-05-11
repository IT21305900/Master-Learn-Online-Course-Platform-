import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

const CourseCard = ({ course }) => {
  const handleNavigate = (action) => {
    if (action === "view") {
      window.location.href = `/course/${course?.key}`;
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course?.title}
        </Typography>
        <Box
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: course.content }}
        />

        <Typography variant="body1" color="text.secondary">
          {`$ ${course?.price}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          Share
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => handleNavigate("view")}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
