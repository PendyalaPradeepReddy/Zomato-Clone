import React from "react";
import Button from "../../common/Button";
import Container from "../../container/Container";

function StartJurney() {
  return (
    <div className="w-full bg-white py-7 md:px-7 px-0">
      <Container>
        <div className="max-w-5xl mx-auto flex justify-center items-center">
          <div className="relative">
            <img
              src="/images/startjurney.jpg"
              alt="Start Jurney Image"
              className="w-full md:h-full h-96 object-cover"
            />
            <div className="absolute top-0 text-gray-100 px-8 py-10 mx-auto text-center md:text-left">
              <h3 className="md:text-4xl text-2xl mb-4">
                Start your journey with Zomato
              </h3>
              <p className="text-md mb-4">
                Create your restaurant page and register for online ordering
              </p>
              <Button bgColor="bg-blue-500" className="px-8">
                Start Now
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default StartJurney;
