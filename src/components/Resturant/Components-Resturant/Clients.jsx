import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Container from "../../container/Container";

function Clients() {
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const clientsArray = [
    {
      img: "/images/client-1.png",
      review:
        "We are immensely satisfied with the marketing push Zomato has provided us. We are now exclusive with Zomato and look forward to more growth in our delivery business through online orders.",
      name: "Pawan Kumar",
      position: "Owner - Chicago BR, Dehradun",
    },
    {
      img: "/images/client-2.png",
      review:
        "Zomato delivery fleet saves considerable effort on our part resulting in more fulfilled orders for us. Also, it has now become much easier for customers to discover our brand on Zomato.",
      name: "Tushar",
      position: "Owner - Concept Shawarma, Delhi NCR",
    },
    {
      img: "/images/client-3.png",
      review:
        "Earlier, we delivered food orders to our known and repeat customers but now we have been able to create a completely new segment of repeat users - all because of the Zomato app.",
      name: "Jasmeet Singh",
      position: "Owner - Pick and Move, Udaipur",
    },
  ];

  return (
    <div className="w-full bg-gray-100">
      <Container>
        <div className="max-w-3xl mx-auto py-8 px-5 relative">
          <h2 className="md:text-3xl text-xl font-semibold text-gray-800 mb-8 text-center">
            Our happy partners
          </h2>
          {/* Background image */}
          <div
            className="absolute inset-0 bg-no-repeat bg-left top-6 left-0 "
            style={{
              backgroundImage: "url('/images/quotesTestimonials.webp')",
            }}
          ></div>
          {/* Slider */}
          <Slider {...settings}>
            {clientsArray.map((client, index) => (
              <div className="bg-transparent" key={index}>
                <div className="relative flex justify-center items-center md:flex-row flex-col gap-8 z-10">
                  <img
                    src={client.img}
                    alt={client.name}
                    className="w-30 z-20 md:mt-32 mt-5 ml-3"
                  />
                  <div className="z-20 flex flex-col justify-center gap-1 md:text-left text-center">
                    <p className="text-gray-500 mb-4">{client.review}</p>
                    <p className="text-blue-600 font-semibold">{client.name}</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {client.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
}

export default Clients;
