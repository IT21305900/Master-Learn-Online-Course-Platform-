import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Toolbar,
} from "@mui/material";
import Loader from "../common/Loader";
import { fetchCourse } from "../../api/course.api.mjs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const LessonPannel = ({ handleNavigate }) => {
  const { cid } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["course", cid],
    queryFn: fetchCourse,
    onSuccess: () => {},
    onError: () => {},
  });

  if (isLoading) return <Loader />;

  console.log(data);

  return (
    <>
      <List>
        {data?.modules.map((lesson, index) => (
          <ListItem
            onClick={() => handleNavigate(lesson.lid)}
            key={lesson.lid}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <IconButton
                  sx={{
                    backgroundColor: "hsl(210, 100%, 96%)",
                    border: "1px solid #2E78F0",
                    borderRadius: "500px",
                    p: 0.1,
                    px: 1,
                  }}
                >
                  <Typography>{index + 1}</Typography>
                </IconButton>
              </ListItemIcon>
              <ListItemText primary={lesson.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default LessonPannel;
