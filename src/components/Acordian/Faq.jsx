import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Container from "../container/Container";

function Acordian() {
  const faqData = [
    {
      id: 1,
      title: "Popular cuisines near me",
      faqAns: [
        "Bengali food near me",
        "Beverages food near me",
        "Biryani food near me",
        "Burger food near me",
        "Chinese food near me",
        "Continental food near me",
        "Desserts food near me",
        "Italian food near me",
        "Kebab food near me",
        "Momos food near me",
        "Mughlai food near me",
        "North Indian food near me",
        "Pasta food near me",
        "Pizza food near me",
        "Rolls food near me",
        "Sandwich food near me",
        "Shake food near me",
        "South Indian food near me",
        "Street food near me",
        "Tea food near me",
      ],
    },
    {
      id: 2,
      title: "Popular restaurant types near me",
      faqAns: [
        "Beverage Shops near me",
        "Cafés near me",
        "Casual Dining near me",
        "Food Courts near me",
        "Quick Bites near me",
      ],
    },
    {
      id: 3,
      title: "Cities We Deliver To",
      faqAns: [
        "Delhi NCR",
        "Kolkata",
        "Mumbai",
        "Bengaluru",
        "Pune",
        "Hyderabad",
        "Chennai",
        "Lucknow",
        "Kochi",
        "Jaipur",
        "Ahmedabad",
        "Chandigarh",
        "Goa",
        "Indore",
        "Gangtok",
        "Nashik",
        "Ooty",
        "Shimla",
        "Ludhiana",
        "Guwahati",
        "Amritsar",
        "Kanpur",
        "Allahabad",
        "Aurangabad",
        "Bhopal",
        "Ranchi",
        "Visakhapatnam",
        "Bhubaneswar",
        "Coimbatore",
        "Mangalore",
        "Vadodara",
        "Nagpur",
        "Agra",
        "Dehradun",
        "Mysore",
        "Puducherry",
        "Surat",
        "Varanasi",
        "Patna",
        "Udaipur",
        "Srinagar",
        "Khajuraho",
        "Neemrana",
        "Cuttack",
        "Trivandrum",
        "Haridwar",
        "Leh",
        "Pushkar",
        "Rajkot",
        "Madurai",
        "Kozhikode",
        "Alappuzha",
        "Thrissur",
        "Manipal",
        "Vijayawada",
        "Jodhpur",
        "Kota",
        "Ajmer",
        "Mussoorie",
        "Rishikesh",
        "Jalandhar",
        "Jammu",
        "Manali",
        "Dharamshala",
      ],
    },
  ];

  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const faqToggle = (id) => {
    setIsFaqOpen(isFaqOpen === id ? false : id);
  };

  return (
    <div className="bg-[#FCFCFC] w-full md:px-16 px-0">
      <Container>
        <div className="">
          <h2 className="text-2xl font-semibold text-gray-700">
            Explore options near me
          </h2>
          {faqData.map((data) => (
            <div className="mt-6" key={data.id}>
              <div
                className="w-full border-b-0  bg-white h-16 rounded-lg rounded-b-none shadow-sm flex items-center px-5 text-gray-600 cursor-pointer justify-between mt-6 "
                onClick={() => faqToggle(data.id)}
              >
                <p className="text-xl">{data.title}</p>
                {isFaqOpen === data.id ? (
                  <MinusCircleIcon className="h-6 w-6" />
                ) : (
                  <PlusCircleIcon className="h-6 w-6" />
                )}
              </div>
              {isFaqOpen === data.id && (
                <div className="w-full bg-white rounded-lg shadow-md px-6 py-5 text-gray-500 rounded-t-none ">
                  <ul className="flex flex-wrap gap-3">
                    {data.faqAns.map((faqItem, index) => (
                      <li key={index} className="list-disc ml-3">
                        <a href="#">{faqItem}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Acordian;
