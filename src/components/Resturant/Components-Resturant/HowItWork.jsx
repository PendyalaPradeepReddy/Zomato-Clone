import React from "react";

function HowItWork() {
  const stepArray = [
    {
      img: "/images/Step-1.png",
      step: "Step 1",
      title: "Create your page on Zomato",
      desc: "Help users discover your place by creating a listing on Zomato",
    },
    {
      img: "/images/Step-2.webp",
      step: "Step 2",
      title: "Register for online ordering",
      desc: "And deliver orders to millions of customers with ease",
    },
    {
      img: "/images/Step-3.webp",
      step: "Step 3",
      title: "Start receiving orders online",
      desc: "Manage orders on our partner app, web dashboard or API partners",
    },
  ];

  return (
    <div className="w-full relative">
      <div
        className=" w-full py-36 "
        style={{
          backgroundImage: "url('/images/how-it-work.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-center text-4xl text-gray-800 ">How it works?</h2>
      </div>
      {/* <Container> */}
      <div>
        <div className="w-full flex justify-center md:flex-row flex-col gap-6 items-center bg-transparent absolute top-52 md:px-0 px-4">
          {stepArray.map((step) => (
            <div className="bg-white h-full md:w-1/5 w-full rounded-lg flex flex-col justify-center items-center px-2 py-5 gap-7 shadow-lg" key={step.title}>
              {/* icon */}
              <div className="bg-orange-50 h-36 w-36 rounded-full flex justify-center items-center">
                <img src={step.img} alt={step.title} />
              </div>
              {/* description */}
              <div className="text-center flex flex-col gap-3 justify-center items-center">
                <h2 className="text-xl font-semibold text-gray-600">
                  {step.step}
                </h2>
                <p className="text-gray-500 text-md font-semibold">
                  {step.title}
                </p>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* </Container> */}
      <div className="w-full bg-white md:py-36 py-[500px]"></div>
    </div>
  );
}

export default HowItWork;
