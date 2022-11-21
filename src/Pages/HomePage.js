import React from 'react'
import { ThemeProvider} from 'styled-components';
import { GlobalStyles } from '../Styles/GlobalStyle';
import Header from "../Components/Header";
import Footer from '../Components/Footer';
import TypingBox from '../Components/TypingBox';
import { useTheme } from '../Contexts/ThemeContext';
const HomePage = () => {
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
  )
}

export default HomePage;