import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import Container from "../../container/Container";

function DocumentsList() {
  const documentsArray = [
    "FSSAI license copy (apply now)",
    "Regular GSTIN (apply now)",
    "Your restaurant menu",
    "PAN card copy",
    "Bank account details",
    "Dish images for top 5 items",
  ];
  return (
    <div className="w-full mx-auto bg-gray-100 ">
      <Container>
        <div className="text-gray-800 bg-green-200 shadow-2xl shadow-green-300 max-w-2xl mx-auto flex flex-col justify-center gap-4  py-7 rounded-md">
          <div className="flex items-center flex-col gap-4 md:px-0 px-6">
            <h2 className="md:text-3xl text-xl font-semibold">
              Get started with online ordering
            </h2>
            <p className="text-gray-600">
              Please keep the documents ready for a smooth signup
            </p>
          </div>
          <div>
            <ul className="grid md:grid-cols-2 grid-cols-1 gap-5 px-7">
              {documentsArray.map((list, index) => (
                <div key={index} className="flex item-center gap-2">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                  <li className="font-semibold"> {list}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default DocumentsList;
