import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import myNewTheme from "./Styles/theme";

ReactDOM.render(
  <ChakraProvider resetCSS theme={myNewTheme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
