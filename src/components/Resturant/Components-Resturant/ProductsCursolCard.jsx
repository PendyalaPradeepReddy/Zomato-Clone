import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick"; //imprt for slider npm install react-slick slick-carousel
import "slick-carousel/slick/slick-theme.css"; //need to import for slider
import "slick-carousel/slick/slick.css"; //need to import for slider
import Container from "../../container/Container";

function ProductsCursolCard() {
  const ProductCardArray = [
    {
      img: "/images/productsCard-1.avif",
      title: "Listings",
      desc: "A free app that allows you to manage your Zomato listing directly from your smartphone",
      slug: "#",
    },
    {
      img: "/images/productsCard-2.avif",
      title: "Online Ordering",
      desc: "Start taking orders online from millions of users near you and deliver with Zomato...",
      slug: "#",
    },
    {
      img: "/images/productsCard-3.svg",
      title: "Advertise",
      desc: "For every marketing dollar spent, Zomato returns over 8x the investment...",
      slug: "#",
    },
    {
      img: "/images/productsCard-4.svg",
      title: "Events",
      desc: "Partner with us for India’s grandest food & entertainment carnival - “Zomaland”...",
      slug: "#",
    },
    {
      img: "/images/productsCard-5.svg",
      title: "Hyperpure",
      desc: "Supplies fresh and high quality ingredients to restaurant for serving delicious meals...",
      slug: "#",
    },
  ];

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Set autoplay speed to 5 seconds (5000 milliseconds)
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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

  return (
    <div className="w-full bg-green-100">
      <Container>
        <div className="max-w-4xl mx-auto py-8 px-5">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Our products
          </h2>

          {/* Slider */}
          <Slider {...settings}>
            {ProductCardArray.map((product, index) => (
              <div
                className="bg-white rounded-lg border shadow-md overflow-hidden"
                key={index}
              >
                <div>
                  <img
                    src={product.img}
                    alt={product.title}
                    className="object-cover w-full h-48"
                  />
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-md mb-4">{product.desc}</p>
                  <p className="text-blue-600 text-lg">
                    <Link to={product.slug}>Learn more</Link>
                  </p>
                </div>
              </div>
            ))}
          </Slider>
          {/* End Slider */}
        </div>
      </Container>
    </div>
  );
}

export default ProductsCursolCard;
