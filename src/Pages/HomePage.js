import React from 'react';
import Header from "../Components/Header";
import Footer from '../Components/Footer';
import TypingBox from '../Components/TypingBox';
const HomePage = () => {
  return (
    <div className="canvas">
       <Header/>
      <TypingBox/>
      <Footer/>
    </div>
  )
}

export default HomePage;