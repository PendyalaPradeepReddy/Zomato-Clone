import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CancelOrder from "./CancelOrder";
import OrderStatus from "./OrderStatus";

const OrderViewComponents = ({ order }) => {
  const navigate = useNavigate();

  return (
    <>
      {order.length === 0 ? (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            No Orders Yet
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Place your first order and enjoy our services!
          </p>
          <Button
            variant="contained"
            color="primary"
            className="px-6 py-3 text-lg"
            onClick={() => navigate("/order")}
          >
            Shop Now
          </Button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Orders
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {order.map((order, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <div className="p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.name}
                    </h3>
                    <OrderStatus status={order.orderStatus} />
                  </div>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Order ID:</span>{" "}
                    {order.orderId}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium">Order Date:</span>{" "}
                    {new Date(order.$updatedAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Price:</span> ₹{order.price}/-
                  </p>
                  <div className="flex justify-between items-center mt-6">
                    <CancelOrder orderId={order.userId} />
                    <Button
                      variant="outlined"
                      color="primary"
                      className="text-sm"
                      // onClick={() => navigate(`/order/${order.orderId}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderViewComponents;
