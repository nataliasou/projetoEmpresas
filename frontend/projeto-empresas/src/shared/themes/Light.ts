import { createTheme } from "@mui/material";
import { grey, orange } from "@mui/material/colors";

export const LightTheme = createTheme({
    palette: {
        primary:{
            main: orange[800],
            dark: orange[900],
            light: orange[500],
            contrastText: '#ffffff',
        },
        secondary:{
            main: grey[500],
            dark: grey[400],
            light: grey[300],
            contrastText: '#ffffff',
        },
        background:{
            paper: '#ffffff',
            default: '#f7f5f3',
        }
    }
})