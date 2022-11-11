import TypingBox from "./Components/TypingBox";
import { GlobalStyles } from "./Styles/GlobalStyle";

var randomWords = require('random-words');

function App() {
  const words = randomWords(100);
  return (
    <div className="canvas">
    <GlobalStyles/>
    <h1 style={{textAlign:'center'}}>typing test</h1>
      <TypingBox words={words}/>
      <h1 style={{textAlign:'center'}}>footer</h1>
    </div>
  );
}

export default App;
