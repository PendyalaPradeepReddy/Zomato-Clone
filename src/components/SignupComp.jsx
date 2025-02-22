import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authServiceAppwrite from "../appwrite/auth";
import { toggleModal } from "../store/LoginSlice";
import { toggleSignupModal } from "../store/signupSlice";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Logo from "../components/common/Logo";

function SignupComp() {
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const signUpModalOpen = useSelector((state) => state.signup.signUpModalOpen);

  const signup = async (data) => {
    setIsLoading(true);
    try {
      const accountData = await authServiceAppwrite.createAccount(data);
      if (accountData) {
        toast.success("Signup Successfully");
        reset();
        navigator(dispatch(toggleSignupModal()));
        navigator(dispatch(toggleModal()));
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        {signUpModalOpen && (
          <div className="fixed  inset-0 overflow-y-auto z-[1] md:z-[999] mt-10 md:mt-0  ">
            <div className="flex items-center justify-center min-h-screen text-center sm:block gap-10">
              {/* Background overlay */}
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-800 opacity-85"></div>
              </div>
              {/* Modal content */}
              <div className="inline-block  bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-14 sm:align-middle w-full md:max-w-xl">
                <div className="bg-white px-4 pt-5 pb-8">
                  <div className="flex justify-between items-center px-2">
                    <h3 className="text-3xl text-left leading-6 font-medium text-gray-900 pl-6 pt-6">
                      <span className="text-red-800">
                        {" "}
                        <Logo />
                      </span>
                    </h3>

                    <div
                      className="inline text-xl text-black text-center font-semibold pr-4 cursor-pointer"
                      onClick={() => dispatch(toggleSignupModal())}
                    >
                      ✖
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="mt-3 r sm:text-left w-full">
                      {errors && (
                        <p className="text-red-500 text-center">
                          Please fill out all fields correctly.
                        </p>
                      )}
                      <form
                        onSubmit={handleSubmit(signup)}
                        className="flex flex-col gap-4 w-full mt-8 md:px-10"
                      >
                        <Input
                          label="Name"
                          type="text"
                          className=" h-11"
                          {...register("name", { required: true })}
                        />
                        <Input
                          label="Email"
                          type="email"
                          className=" h-11"
                          {...register("email", {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          })}
                        />
                        <Input
                          label="Mobile Number"
                          type="tel"
                          className=" h-11"
                          {...register("phone", { required: true })}
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="male"
                            value="male"
                            {...register("gender")}
                          />
                          <label htmlFor="male" className="text-lg">
                            Male
                          </label>
                          <input
                            type="radio"
                            id="female"
                            value="female"
                            {...register("gender")}
                          />
                          <label htmlFor="female" className="text-lg">
                            Female
                          </label>
                        </div>
                        <Input
                          label="Password"
                          type="password"
                          className=" h-11"
                          {...register("password", { required: true })}
                        />
                        <p className="text-sm text-gray-600">
                          By clicking Sign Up, you agree to the{" "}
                          <Link to="/terms" className="text-blue-500 underline">
                            Terms and Conditions
                          </Link>
                        </p>
                        <Button
                          type="submit"
                          bgColor="bg-red-800"
                          className={`w-full ${
                            isLoading
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-red-700 duration-200"
                          }`}
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating..." : "SIGN UP"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SignupComp;
