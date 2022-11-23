import { Route, Routes } from "react-router-dom";
import Alerts from "./Components/Alert";
import DynamicPage from "./Pages/DynamicPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";

function App() {
  
  return (
    <>
    <Alerts/>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/user" element={<UserPage/>}></Route>
      <Route path="/user/:Id" element={<DynamicPage/>}></Route>
      <Route path="*" element={<ErrorPage/>}></Route>
    </Routes>
    </>
  );
}

export default App;
