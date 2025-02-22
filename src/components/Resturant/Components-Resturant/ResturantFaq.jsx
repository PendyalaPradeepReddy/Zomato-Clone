import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Container from "../../container/Container";

function ResturantFaq() {
  const FaqArray = [
    {
      faqQuestion:
        "What will Zomato charge me for creating a page on its platform?",
      faqAnswer:
        "Creating a restaurant page on Zomato is free of cost. You can maintain your page by replying to reviews and do a lot more without any charges. ",
    },
    {
      faqQuestion:
        "What all documents are required for registering on online ordering?",
      faqAnswer: `Registration for online ordering requires:

        a: FSSAI certificate (application no. if FSSAI is not present)
        
        b: PAN Card
        
        c: GST certificate (if applicable)`,
    },
    {
      faqQuestion:
        "I have a large fleet of delivery boys, why should I use Zomato’s delivery service?",
      faqAnswer:
        "You can use your and Zomato's delivery fleet simultaneously to increase the network of your delivery radius. Also, our delivery fleet delivers orders in minimum possible time, a key factor leading to increased customer satisfaction.",
    },
    {
      faqQuestion:
        "What happens if the average order value of Zomato orders is very low",
      faqAnswer:
        "Average order value from our platform is generally more than Rs 250. However, in some cases, users want to try out your place by ordering for lesser amount. But we have observed that they eventually come back with higher value orders if they like your food. ",
    },
  ];

  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const toggleFaq = (id) => {
    setIsFaqOpen(isFaqOpen === id ? false : id);
  };
  return (
    <div className="w-full bg-white">
      <Container>
        <div className="max-w-4xl mx-auto py-6 px-2">
          <h2 className="md:text-4xl text-2xl font-semibold text-gray-700 text-center mb-12">
            Frequently asked questions
          </h2>
          {FaqArray.map((faq, index) => (
            <div className="mt-2 bg-white rounded-md" key={index}>
              <div
                className="md:h-10 h-full w-full border md:px-4 md:py-8 py-4 px-2 flex items-center justify-between shadow border-gray-100 rounded-md  cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <h2 className="text-gray-600 md:text-xl text-sm">
                  {faq.faqQuestion}
                </h2>
                {isFaqOpen === index ? (
                  <MinusCircleIcon className="h-6 w-6" />
                ) : (
                  <PlusCircleIcon className="h-6 w-6" />
                )}
              </div>
              {isFaqOpen === index && (
                <div className="w-3xl mx-auto bg-white px-3 py-3 rounded border shadow mt-0 transition-all ease-out duration-300">
                  {faq.faqAnswer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default ResturantFaq;
