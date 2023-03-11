import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./config/style/theme";
import Nav from "./config/route";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
    </ThemeProvider>
  );
}

export default App;
