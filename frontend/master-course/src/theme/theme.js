import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E78F0",
    },
    secondary: {
      main: "#424242",
    },
    black: {
      main: "#212121",
      secondary: "#424242",
      shade: "#616161",
    },
  
    typography: {
      fontFamily: "Poppins",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
