import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FoodView from "../components/OrderPages/FoodView";
import Order from "../components/OrderPages/Order";
import OrderOnlineCard from "../components/OrderPages/OrderOnlineCard";

function OrderOnline() {
  useEffect(() => {
    document.title = "Order food online in Kolkata | Zomato";
  }, []);

  return (
    <>
      <Order />
      <FoodView />
      <OrderOnlineCard />
      <ToastContainer />
    </>
  );
}

export default OrderOnline;
