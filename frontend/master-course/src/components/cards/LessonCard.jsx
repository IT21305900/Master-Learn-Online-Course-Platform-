import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Stack,
} from "@mui/material";

const LessonCard = ({ lesson, id }) => {
  return (
    <Card
      sx={{
        boxShadow: "none",
        border: "1px solid #d3dce6",
        borderRadius: "0.5rem",
        maxWidth: "1000px",
        mb: 1
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" , gap: 3}}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ mb: 1 }} variant="subtitle2">
              lesson
            </Typography>
            <IconButton
              sx={{
                backgroundColor: "hsl(210, 100%, 96%)",
                border: "1px solid #2E78F0",
                borderRadius: "500px",
                p: 2,
                px: 3,
              }}
            >
              <Typography>{id + 1}</Typography>
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Stack>
              <Typography variant="h4" component="h2">
                {lesson.title}
              </Typography>

              <Typography variant="subtitle1" component="h2">
                Time 40 min
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default LessonCard;
