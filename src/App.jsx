import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Faq from "./components/Acordian/Faq";
import CardOrder from "./components/CardOrder";
import Getapp from "./components/Getapp";
import Herosection from "./components/HeroSection/Herosection";
import Login from "./components/Login";
import SignupComp from "./components/SignupComp";
//main rendaring app
function App() {
  return (
    <>
      <>
        <Herosection />
        <Login />
        <SignupComp />
        <CardOrder />
        <Getapp />
        <Faq />
        <ToastContainer />
      </>
    </>
  );
}

export default App;
