import React from "react";
import { Link } from "react-router-dom";
import Container from "./container/Container";

function CardOrder() {
  return (
    <Container>
      <div className="flex justify-center items-center  flex-col">
        <div className="bg-white md:w-2/5 w-full h-auto rounded-lg overflow-hidden border hover:scale-110 duration-150">
          <Link to="/order">
            <div>
              <div>
                <img
                  src="/images/Online-Food.png"
                  alt="Online-Food"
                  className=" w-full  h-36 pb-2"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl">Order Online</h2>
                <p className="text-gray-500">
                  Stay home and order to your doorstep
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="mt-14 bg-gray-100 w-full px-4 py-6 flex flex-col justify-center items-center rounded-lg">
          <h2 className="md:text-4xl text-lg text-center text-gray-800  mb-8">
            Popular localities in and around Kolkata
          </h2>{" "}
          <div className="bg-white md:w-2/5 w-full h-auto rounded-lg overflow-hidden border hover:scale-110 duration-150">
            <Link to="/order">
              <div>
                <div className="p-4">
                  <h2 className="text-xl">Kolkata Locality</h2>
                  <p className="text-gray-500">169 places</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CardOrder;
