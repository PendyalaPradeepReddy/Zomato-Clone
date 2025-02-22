import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; //imprt for slider npm install react-slick slick-carousel
import "slick-carousel/slick/slick-theme.css"; // Import slick theme CSS
import "slick-carousel/slick/slick.css"; // Import slick CSS
import Container from "../container/Container";

function FoodView() {
  const foodArray = [
    {
      name: "Briyani",
      slug: "#",
      images: "/images/Briyani.avif",
    },
    {
      name: "Thali",
      slug: "#",
      images: "/images/Thali.avif",
    },
    {
      name: "Chicken",
      slug: "#",
      images: "/images/Chicken.avif",
    },
    {
      name: "Paneer",
      slug: "#",
      images: "/images/Paneer.avif",
    },
    {
      name: "Burger",
      slug: "#",
      images: "/images/Burger.avif",
    },
    {
      name: "Cake",
      slug: "#",
      images: "/images/Cake.avif",
    },
    {
      name: "North Indian",
      slug: "#",
      images: "/images/North-Indian.avif",
    },
    {
      name: "Rolls",
      slug: "#",
      images: "/images/Rolls.avif",
    },
    {
      name: "Dosa",
      slug: "#",
      images: "/images/Dosa.avif",
    },
    {
      name: "Noodles",
      slug: "#",
      images: "/images/Noodles.avif",
    },
    {
      name: "Momos",
      slug: "#",
      images: "/images/Momos.avif",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Set autoplay speed to 5 seconds (5000 milliseconds)
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full bg-gray-100">
      <Container>
        <div className="max-w-5xl mx-auto px-5 py-5 text-gray-800">
          <h3 className="text-3xl md:text-left text-center">
            Eat what makes you happy
          </h3>
        </div>
        <div className="max-w-5xl mx-auto overflow-x-hidden md:overflow-x-visible">
          <Slider {...settings}>
            {foodArray.map((arr, index) => (
              <div key={index} className="p-2 ">
                <Link to={arr.slug} className="outline-none">
                  <img
                    src={arr.images}
                    alt={arr.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <p className="text-center mt-2 text-lg font-semibold text-gray-800">
                    {arr.name}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
}

export default FoodView;
