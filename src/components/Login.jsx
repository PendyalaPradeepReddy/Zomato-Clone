import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import authServiceAppwrite from "../appwrite/auth";
import { toggleModal } from "../store/LoginSlice";
import { login as storeLogin } from "../store/authSlice";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function Login() {
  const modalIsOpen = useSelector((state) => state.login.modalIsOpen);

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    setIsLoading(true);
    try {
      const session = await authServiceAppwrite.createSession(data); //login session
      if (session) {
        const userData = await authServiceAppwrite.getCurrentUser(); //get current user information
        if (userData) {
          dispatch(storeLogin({ userData })); //to call store from auth status change to true and pass userData store
        }
        navigator(dispatch(toggleModal()));
        Swal.fire({
          title: "Good job!",
          text: "Logged in successfully!",
          icon: "success",
        });
        // toast.success("Login Successfully");
        reset();
        navigator("/");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModal = () => {
    dispatch(toggleModal());
    dispatch(toggleSignupModal());
  };

  return (
    <div>
      {modalIsOpen && (
        <div className="fixed  inset-0 overflow-y-auto z-[999]">
          <div className="flex items-center justify-center min-h-screen text-center sm:block gap-10">
            {/* Background overlay */}
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-800 opacity-85"></div>
            </div>
            {/* Modal content */}
            <div className="inline-block  bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-24 sm:align-middle w-full md:max-w-xl">
              <div className="bg-white px-4 pt-5 pb-8">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-3xl text-left leading-6 font-medium text-gray-900 pl-6 pt-6">
                    Login
                  </h3>
                  <div
                    className="inline text-xl text-black text-center font-semibold pr-4 cursor-pointer"
                    onClick={() => dispatch(toggleModal())}
                  >
                    ✖
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="mt-3  sm:text-left w-full">
                    {errors && (
                      <p className="text-red-500 text-center">
                        Please fill out all fields correctly.
                      </p>
                    )}
                    <form
                      onSubmit={handleSubmit(login)}
                      className="mt-8 md:px-10 w-full"
                    >
                      <Input
                        placeholder="Email"
                        type="email"
                        className="mb-2"
                        label="Email"
                        {...register("email", {
                          required: "true",
                          validate: {
                            matchPattern: (value) =>
                              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                              "Email address must be valid address",
                          },
                        })}
                      />
                      <Input
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        {...register("password", {
                          required: true,
                        })}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className={`${
                          isLoading ? "cursor-not-allowed" : ""
                        } mt-2 w-2/6 `}
                        bgColor="bg-red-600"
                      >
                        {" "}
                        {isLoading ? "Logging in..." : "Login"}
                      </Button>

                      <p className="mt-2 text-left text-base text-black/60">
                        {" "}
                        Don&apos;t have any account?&nbsp;
                        <p
                          onClick={handleModal}
                          className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                          {" "}
                          Sign Up
                        </p>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
