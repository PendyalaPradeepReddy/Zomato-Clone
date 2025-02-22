import React from "react";

function Getapp() {
  return (
    <div className="bg-orange-50 my-20">
      <div className="w-full max-w-7xl md:h-screen mx-auto px-4 py-6">
        <div className="w-full h-auto flex justify-center items-center gap-10 ">
          <div className="w-1/2 md:flex justify-end gap-6 hidden md:visible">
            <img
              src="/images/Iphone.png"
              alt="Iphone Images"
              className="w-2/3"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-center gap-2 md:h-screen bg-green-200 shadow-2xl shadow-green-300 rounded-md pl-10 pt-4 pb-6 md:pt-0 md:pb-0">
            <img
              src="/images/blackLogo.webp"
              alt="Zomato Logo"
              className={`md:w-36 w-20`}
            />{" "}
            
            <h1 className="text-black md:text-2xl text-xl font-semibold md:mb-6 mb-3">
              Get the Zomato app
            </h1>
            <p className="text-gray-600 mb-6">
              We will send you a link, open it on your phone to download the app
            </p>
            <div className="flex flex-col justify-center gap-2">
              <div className="flex gap-8 mb-4">
                <div className="">
                  <input type="radio" name="email" id="email" className="" />
                  <label htmlFor="email" className="ml-2">
                    Email
                  </label>
                </div>

                <div>
                  <input type="radio" name="phone" id="phone" />
                  <label htmlFor="phone" className="ml-2">
                    Phone
                  </label>
                </div>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="h-12 md:w-2/4 border rounded-md px-3 mr-2 outline-none"
                />
                <button className="bg-red-400 text-white px-5 md:py-3 py-2 rounded-lg mt-2">
                  Share App Link
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-gray-500 font-extralight">
                  Download app from
                </p>
                <div className="flex md:w-1/5 w-1/3 gap-3 items-center">
                  <img src="/images/Google-Play.png" alt="Google-Play" />
                  <img src="/images/App-Store.png" alt="App-Store" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Getapp;
