import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UpdateAddress from "../UserProfile/UpdateAddress";
import dbServices from "../appwrite/DBconfig";
import Button from "../components/common/Button";
import Container from "../components/container/Container";
import { removeFromCart } from "../store/cartSlice";

function Cart() {
  const cartData = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = cartData.reduce(
    (total, data) => total + parseFloat(data.totalPrice),
    0
  );

  const totalAmountPay = totalPrice + 20 - 10; //totalPrice+delivery charge-extra discount
  const authStatus = useSelector((state) => state.auth.status);
  const [isAddress, setIsAddress] = useState(false);

  const handleUserAddress = () => {
    setIsAddress(!isAddress);
  };

  useEffect(() => {
    if (authStatus === false) {
      toast.warn("Please Login to continue");
    }
  }, []);

  const handleRemoveFromCart = (itemId) => {
    const confirmUser = confirm("Do you want to Delete?");
    if (confirmUser) {
      dispatch(removeFromCart(itemId));
      toast.warn("Item Deleted!");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-red-800 py-3 pb-14"></div>
      <div className="bg-white">
        <Container>
          <div className="max-w-5xl mx-auto px-5 py-6">
            {cartData.length <= 0 ? (
              <div className="flex flex-col items-center justify-center h-screen">
                <ShoppingCartIcon className="h-16 w-16 text-orange-500" />
                <p className="text-2xl font-bold">Your cart is empty</p>
                <Button
                  bgColor="bg-orange-500"
                  onClick={() => navigate("/order")}
                >
                  Browse Products
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto overflow-y-auto">
                <p className="text-2xl font-bold text-center text-orange-500 underline">
                  Your cart Item
                </p>

                <table className="min-w-full bg-white shadow-md rounded my-6">
                  <thead>
                    <tr className="bg-orange-400 text-white">
                      <th className="py-3 px-4 font-semibold text-sm">Sl.</th>
                      <th className="py-3 px-4 font-semibold text-sm">
                        Item Name
                      </th>
                      <th className="py-3 px-4 font-semibold text-sm">Image</th>
                      <th className="py-3 px-4 font-semibold text-sm text-right">
                        Price
                      </th>
                      <th className="py-3 px-4 font-semibold text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100  text-center"
                      >
                        <td className="py-3 px-4 text-center">{index + 1}</td>
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4 flex justify-center items-center">
                          <img
                            src={dbServices.getFoodImgPreview(
                              item.featuredImageId
                            )}
                            alt={item.name}
                            className="h-12 w-12 object-cover rounded-full"
                          />
                        </td>
                        <td className="py-3 px-4 text-right">{item.price}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 focus:outline-none"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Cart Total price show end */}

                <div className="flex w-full justify-center items-center md:flex-row flex-col-reverse">
                  <div className={`${isAddress ? "md:w-1/2 w-full" : ""}`}>
                    {isAddress && <UpdateAddress />}
                  </div>
                  {/* summary invoice */}
                  <div
                    className={`bg-gray-100 rounded-lg p-4 ${
                      isAddress ? "" : "w-full"
                    }`}
                  >
                    <p className="text-lg font-semibold mb-4">Order Summary</p>
                    <div className="flex justify-between mb-2">
                      <p>
                        Total Price{" "}
                        <span className="text-green-600">20% off</span>
                      </p>
                      <p>₹{totalPrice}.00</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p>Delivery Charge</p>
                      <p>₹20</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p>
                        Extra Discount{" "}
                        <span className="text-green-600">Flat 10% off</span>
                      </p>
                      <p>₹10</p>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <p className="font-semibold">Total amount Payable</p>
                      <p className="font-semibold">
                        <span className="text-green-600 line-through">
                          ₹{totalPrice + 20 + 10}
                        </span>{" "}
                        <span className="text-green-600">10% off </span>₹
                        {totalAmountPay}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <Button
                    bgColor="bg-orange-500"
                    className={`py-1 mt-2 mb-2 ${isAddress ? "hidden" : ""}`}
                    onClick={handleUserAddress}
                  >
                    Procced to buy
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Cart;
