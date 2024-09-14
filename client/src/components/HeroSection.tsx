import React, { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "../assets/hero_pizza.png"
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if(searchText){
        navigate(`search/${searchText}`)
    }
  }

  return (
    <div className="flex flex-col  md:flex-row max-w-7xl mx-auto md:mt-20  p-6 items-center rounded-lg justify-center m-4 gap-20">
      <div className="flex flex-col gap-10 md:w-[45%]">
        <div className="flex flex-col gap-5">
          <h1 className="font-extrabold md:text-5xl text-4xl">
            Order food anywhere & anytime
          </h1>
          <p className="text-gray-500 font-semibold">
            Hey! What do you want to order today?
          </p>
        </div>
        <div className="flex w-full gap-2">
          <div className=" relative w-full flex items-center">
            <Input
              type="text"
              placeholder="Search restaurant by name, city and country"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10  shadow-lg focus-visible:ring-transparent"
            />
            <Search className=" absolute  text-gray-500 left-2" />
          </div>
          <Button onClick={handleSearch} className="bg-orange shadow-lg hover:bg-hoverOrange">Search</Button>
        </div>
      </div>
      <div>
        <img src={heroImage} alt="image" className="object-cover w-full max-h-[700px]"/>
      </div>
    </div>
  );
};

export default HeroSection;
