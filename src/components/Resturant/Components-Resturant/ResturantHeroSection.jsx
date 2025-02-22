import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../common/Button";
import Container from "../../container/Container";

function ResturantHeroSection() {
  const navigate = useNavigate();
  return (
    <div
      className="py-20 w-full"
      style={{
        backgroundImage: "url('/images/resturantBg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        <div className=" text-white text-center md:text-left max-w-4xl mx-auto flex flex-col justify-center gap-7 px-5">
          <h2 className="md:text-4xl text-xl">
            Partner with Zomato <br /> at 0% commission for the 1st month!
          </h2>
          <p>
            And get ads worth INR 1500. Valid for new restaurant partners in
            select cities.
          </p>
          <div className="flex gap-4 md:flex-row flex-col">
            <Link
              className="px-4 py-3 rounded-md bg-blue-500 text-white"
              to="/add-resturant/create-your-res"
            >
              Register your restaurant
            </Link>
            <Button bgColor="bg-white" textColor="text-gray-800">
              View your existing restaurant
            </Button>
          </div>
          <p className="md:text-md text-sm">
            Need help? Contact +91 97-38-38-38-38
          </p>
        </div>
      </Container>
    </div>
  );
}

export default ResturantHeroSection;
