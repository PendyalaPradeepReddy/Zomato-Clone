import { CheckCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const orderDate = `${day}/${month}/${year}`;

  const cartItems = useSelector((state) => state.cart.cartItem);
  console.log(cartItems);
  const totalPrice = cartItems.reduce(
    (total, data) => total + parseFloat(data.totalPrice),
    0
  );
  const totalAmountPay = totalPrice + 20 - 10; //totalPrice+delivery charge-extra discount
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center">
          {/* Use the filled icon */}
          <CheckCircle color="success" fontSize="large" className="h-16 w-16" />
          <h2 className="text-2xl font-semibold mt-4">
            Order Placed Successfully!
          </h2>
          <p className="mt-2 text-gray-600">Thank you for your purchase.</p>
        </div>
        {/* order details */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium">Order Details</h3>
          <p className="mt-1 text-sm text-gray-600">Order ID: ZMT2024985</p>
          <p className="mt-1 text-sm text-gray-600">Order Date: {orderDate}</p>
          <p className="mt-1 text-sm text-gray-600">
            Approx Delivery Time: 30 min
          </p>
          <div className="mt-4">
            <h4 className="text-md font-medium">Items:</h4>
            <ul className="mt-2 space-y-2">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} x ${item.price}
                    {/*  */}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex justify-between text-lg font-medium">
            <span>Total:</span>
            <span>${totalAmountPay}</span>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = "/order")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
