import React from "react";
import { useSelector } from "react-redux";

function OrderAmountSummary() {
  const cartItems = useSelector((state) => state.cart.cartItem);
  const totalPrice = cartItems.reduce(
    (total, data) => total + parseFloat(data.totalPrice),
    0
  );
  const totalAmountPay = totalPrice + 20 - 10; //totalPrice+delivery charge-extra discount

  return (
    <>
      {/* summary invoice */}
      <div className={`bg-gray-100 rounded-lg p-4 w-full}`}>
        <p className="text-lg font-semibold mb-4">Order Summary</p>
        <div className="flex justify-between mb-2">
          <p>
            Total Price <span className="text-green-600">20% off</span>
          </p>
          <p>₹{totalPrice}.00</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Delivery Charge</p>
          <p>₹20</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>
            Extra Discount <span className="text-green-600">Flat 10% off</span>
          </p>
          <p>₹10</p>
        </div>
        <div className="flex justify-between border-t pt-2">
          <p className="font-semibold">Total amount Payable</p>
          <p className="font-semibold">
            <span className="text-green-600 line-through">
              ₹{totalPrice + 20 + 10}
            </span>{" "}
            <span className="text-green-600">10% off </span>₹{totalAmountPay}
          </p>
        </div>
      </div>
    </>
  );
}

export default OrderAmountSummary;
