import GlobalCss from "./styles";
import { Provider } from "react-redux";
import Rotas from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { store } from "./store";
const theme = extendTheme({
  colors: {
    primary: {
      50: "#F1F8FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
      800: "#1E40AF",
      900: "#1E3A8A",
    },
    secondary: {
      50: "#FDF5F5",
      100: "#FCE7E7",
      200: "#FBC5C5",
      300: "#F9A8A7",
      400: "#F47272",
      500: "#EC4C47",
      600: "#D92727",
      700: "#B91C1C",
      800: "#991B1B",
      900: "#7F1D1D",
    },
  },
});

function App() {
  return (

      <Provider store={store}>
   
     
      <BrowserRouter>
      <ChakraProvider theme={theme}>
 
        <div className="App">
     
          <GlobalCss />
         
          <Rotas />
        </div>
      
        </ChakraProvider>
      </BrowserRouter>
    
      </Provider>
   
  );
}

export default App;
