import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Alerts from "./Components/Alert";
import { useTheme } from "./Contexts/ThemeContext";
import DynamicPage from "./Pages/DynamicPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import { GlobalStyles } from "./Styles/GlobalStyle";

function App() {
  const {Theme} = useTheme();
  return (
    <ThemeProvider theme={Theme}>
    <GlobalStyles/>
    <Alerts/>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/user" element={<UserPage/>}></Route>
      <Route path="/user/:Id" element={<DynamicPage/>}></Route>
      <Route path="*" element={<ErrorPage/>}></Route>
    </Routes>
    </ThemeProvider>
  );
}

export default App;
