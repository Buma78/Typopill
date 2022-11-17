import { ThemeProvider } from "styled-components";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import TypingBox from "./Components/TypingBox";
import { useTheme } from "./Contexts/ThemeContext";
import { GlobalStyles } from "./Styles/GlobalStyle";

function App() {
  const {Theme} = useTheme();

  return (
    <ThemeProvider theme={Theme}>
    <div className="canvas">
    <GlobalStyles/>
    <Header/>
      <TypingBox/>
      <Footer/>
    </div>
    </ThemeProvider>
  );
}

export default App;
