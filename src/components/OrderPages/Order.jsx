import React from "react";
import { Link } from "react-router-dom";
import SearchInputResturant from "../common/SearchInputResturant";
import Container from "../container/Container";

function Order() {
  return (
    <>
      <div className="w-full bg-red-800 py-3 pb-14"></div>
      <div className="w-full bg-white">
        <Container>
          <div className="max-w-5xl mx-auto px-6 py-3 flex flex-col gap-6">
            <p className="flex gap-2 text-gray-400 text-sm">
              <Link to="/" className="hover:text-red-500">
                Home
              </Link>
              /
              <Link className="hover:text-red-500" to="#">
                India
              </Link>
              /
              <Link to="#" className="hover:text-red-500">
                Kolkata
              </Link>
              /
              <Link to="#" className="pointer-events-none text-gray-200">
                Restaurants Name
              </Link>
            </p>
            <div className=" max-w-3xl">
              <SearchInputResturant />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Order;
