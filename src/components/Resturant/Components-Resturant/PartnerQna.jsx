import {
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import Container from "../../container/Container";

function PartnerQna() {
  const businessInfoArray = [
    {
      icon: <GlobeAmericasIcon />,
      title: "1000+ cities ",
      desc: "in India",
    },
    {
      icon: <BuildingStorefrontIcon />,
      title: "3 lakh+",
      desc: "restaurant listings",
    },
    {
      icon: <CalendarDaysIcon />,
      title: "5.0 crore+",
      desc: "monthly orders",
    },
  ];
  return (
    <div className="w-full bg-white py-7">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col justify-center px-5 gap-10">
          <h2 className="md:text-4xl text-2xl text-center text-gray-700 font-semibold">
            Why should you partner with Zomato?
          </h2>
          <p className="text-gray-500 md:text-lg text-sm text-center ">
            Zomato enables you to get 60% more revenue, 10x new customers and
            boost your brand visibility by providing insights to improve your
            business.
          </p>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 my-8">
            {businessInfoArray.map((data) => (
              <div
                className="bg-white shadow-md border border-gray-50 flex items-center  h-24 rounded-lg px-6 py-6 gap-6"
                key={data.title}
              >
                <div className="h-9 w-9 text-blue-900 " aria-hidden="true">
                  {data.icon}
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl text-blue-500">{data.title}</h3>
                  <p className="text-gray-500">{data.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default PartnerQna;
