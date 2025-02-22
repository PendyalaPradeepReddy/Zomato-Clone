import React, { useEffect } from "react";
import "../../../App.css";
import BugIssueForm from "./BugIssueForm";
import Clients from "./Clients";
import DocumentsList from "./DocumentsList";
import HowItWork from "./HowItWork";
import PartnerQna from "./PartnerQna";
import ProductsCursolCard from "./ProductsCursolCard";
import ResturantFaq from "./ResturantFaq";
import ResturantHeroSection from "./ResturantHeroSection";
import SearchResturat from "./SearchResturat";
import SignupStep from "./SignupStep";
import StartJurney from "./StartJurney";
function AddResturant() {
  useEffect(() => {
    document.title = "Add a resturant - Zomato";
  }, []);


  return (
    <div>
      <ResturantHeroSection />
      <DocumentsList />
      <PartnerQna />
      <HowItWork />
      <SearchResturat />
      <ProductsCursolCard />
      <Clients />
      <SignupStep />
      <StartJurney />
      <ResturantFaq />
      <BugIssueForm />
    </div>
  );
}

export default AddResturant;
