import React from "react";
import Container from "../../container/Container";
import FormAddRes from "../AddResturantForm/FormAddRes";

function Createresturant() {


  return (
    <>
      <div className="w-full bg-red-800 py-3 pb-14"></div>
      <div className="w-full bg-white">
        <Container>
          <div className="max-w-4xl mx-auto py-2 md:px-5 px-0 flex md:flex-row flex-col gap-3 justify-center">
            <div className="w-72 h-full shadow-lg rounded-md shadow-blue-100 py-4 bg-green-50">
              <h2 className="text-gray-900 font-semibold text-sm px-2">
                1. Create your resturant page
              </h2>
              <hr className="mx-2 my-4" />
              <div className="flex flex-col gap-4 px-1">
                <div className="border-l-2 border-red-500 pl-2">
                  <h2 className="text-sm font-semibold">
                    resturant Information
                  </h2>
                  <p className="text-sm text-gray-500">
                    resturant name, address, contact no., owner details
                  </p>
                </div>
                <div className="border-l-2 border-red-500 pl-2">
                  <h2 className="text-sm font-semibold">
                    resturant Type & Timings
                  </h2>
                  <p className="text-sm text-gray-500">
                    Establishment & cuisine type, opening hours
                  </p>
                </div>
                <div className="border-l-2 border-red-500 pl-2">
                  <h2 className="text-sm font-semibold">Upload Images</h2>
                  <p className="text-sm text-gray-500">
                    Menu, resturant, food images
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full">
              <h2 className="md:text-4xl text-2xl md:font-light font-semibold text-center md:text-left">
                resturant Information
              </h2>
              {/* do form */}
              <FormAddRes />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Createresturant;
