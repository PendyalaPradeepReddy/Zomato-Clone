import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createresturant from "../components/Resturant/Components-Resturant/CreateResturant";

function CreateYourRes() {
  useEffect(() => {
    document.title = "Add a zomato -Food";
  }, []);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus === false) {
      toast.warn("Please Login to continue");
    }
  }, []);

  return (
    <>
      <Createresturant />
      <ToastContainer />
    </>
  );
}

export default CreateYourRes;
