import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const LessonCard = ({ lesson, id }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {lesson.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default LessonCard;
