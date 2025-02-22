import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dbServices from "../appwrite/DBconfig";
import OrderViewComponents from "../components/OrderPages/OrderViewProfile/OrderViewComponents";
import Loading from "../components/common/Loading";

function OrderView() {
  const [order, setOrder] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) {
      toast.warn("Please Login to Continue");
      return;
    }
    const userId = userData.$id; //user data under unique of is to get store authSlice under userData
    dbServices
      .getOrder(userId)
      .then((order) => {
        if (order) {
          setOrder(order.documents);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(order)

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="bg-red-800 py-3 pb-14"></div>
      <div className="bg-white w-full">
        {loading ? <Loading /> : <OrderViewComponents order={order} />}
      </div>
    </div>
  );
}

export default OrderView;
