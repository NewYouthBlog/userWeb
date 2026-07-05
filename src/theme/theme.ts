"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#315f8e",
        },
        secondary: {
            main: "#5f8a68",
            contrastText: "#f7fafb",
        },
        text: {
            primary: "#243041",
            secondary: "#687486",
        },
        background: {
            default: "#f7fafb",
            paper: "#fbfcfc",
        },
    },
    shape: {
        borderRadius: 8,
    },
});

export default theme;
