import React from "react";
import SearchInputResturant from "../../common/SearchInputResturant";
import Container from "../../container/Container";

function SearchResturat() {
  return (
    <div className="w-full bg-gray-100">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col justify-center items-center gap-4 py-14">
          <h2 className="md:text-4xl text-2xl text-gray-800 font-normal md:text-left text-center">
            Already have your restaurant listed?
          </h2>
          <p className="md:text-lg text-sm text-gray-500">
            Search here and claim the ownership of your restaurant
          </p>
          <SearchInputResturant />
        </div>
      </Container>
    </div>
  );
}

export default SearchResturat;
