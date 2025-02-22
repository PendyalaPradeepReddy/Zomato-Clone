import React, { useEffect, useState } from "react";
import Container from "../../container/Container";
function SignupStep() {
  const stepArray = [
    {
      title: "Restaurant Partner app",
      desc: "Manage all your orders on your smartphone with our Android app",
      img: "/images/api-intragation.avif",
    },
    {
      title: "Restaurant Partner web dashboard",
      desc: "Manage all your orders on your desktop or laptop",
      img: "/images/resturant-webdash.avif",
    },
    {
      title: "API integration",
      desc: "Manage all your orders on your existing Point of Sale (POS) or third party software",
      img: "/images/api-intragation.avif",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHoveredIndex((prevIndex) => (prevIndex + 1) % stepArray.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white">
      <Container>
        <div className="max-w-5xl mx-auto py-5 px-5 flex flex-col justify-center gap-4">
          <h2 className="md:text-4xl text-xl font-semibold text-gray-800">
            What do you get on sign-up
          </h2>
          <p className="md:text-xl text-sm text-gray-500">
            Zomato Partner Platform helps you take your business to new heights
            instantly with no hassle and 100% transparency!
          </p>
          {/* for step container */}
          <div className="flex mt-8 w-full gap-20 flex-col md:flex-row">
            {/* for menu  */}
            <div className="flex flex-col gap-10">
              {/* 1st menu */}
              {stepArray.map((item, index) => (
                <div
                  className=" w-full cursor-pointer "
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() =>
                    setHoveredIndex(
                      (prevIndex) => (prevIndex + 1) % stepArray.length
                    )
                  }
                >
                  <div className="flex gap-4 items-center">
                    <div
                      className={`h-9 w-9 border text-center rounded-full flex justify-center items-center font-semibold ${
                        hoveredIndex === index
                          ? "border-blue-500 text-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </div>
                    <h3
                      className={`md:text-2xl text-xl  font-semibold ${
                        hoveredIndex === index
                          ? "text-blue-500"
                          : "text-gray-600"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-full md:ml-12 ml-6">
                    <p className="text-gray-400 md:text-xl text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* for images */}
            <div className="md:w-3/5 w-full relative ">
              <img
                src="/images/bg-shep.webp"
                alt="Bg shep"
                className="h-[350px] w-full absolute inset-0 md:opacity-100 opacity-0"
              />
              <div className="relative flex justify-center items-center md:flex-row flex-col gap-8 z-10">
                {hoveredIndex !== null && (
                  <img
                    src={stepArray[hoveredIndex].img}
                    alt={stepArray[hoveredIndex].title}
                    className="h-full md:w-96 w-full"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SignupStep;
