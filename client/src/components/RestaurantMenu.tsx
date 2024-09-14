import React from "react";
import heroImage from "@/assets/hero_pizza.png";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import MenuList from "./MenuList";

const RestaurantMenu = () => {
  return (
    <div className="max-w-6xl min-h-screen mx-auto px-2 my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-74">
          <img
            src="https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="res_img"
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">Chinese Chow Chow</h1>
            <div className="flex gap-2 my-2">
              {["Momos", "Samosa"].map((cuisine, index) => (
                <Badge key={index}>{cuisine}</Badge>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery time :{" "}
                  <span className="text-[#D19254]">40 mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <MenuList />
      </div>
      <MenuSkeleton/>
    </div>
  );
};

export default RestaurantMenu;

const MenuSkeleton = () => {
  return (
    <div className="max-w-6xl min-h-screen mx-auto px-2 my-10">
      <div className="w-full">
        <div className="relative w-full h-32 md:h-64 lg:h-74 animate-pulse bg-gray-300 rounded-lg"></div>
        <div className="flex flex-col md:flex-row justify-between animate-pulse">
          <div className="my-5">
            <div className="h-6 w-1/3 bg-gray-300 rounded-md"></div>
            <div className="flex gap-2 my-2">
              {[1, 2].map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-12 bg-gray-300 rounded-md"
                ></div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-2 my-5">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                <div className="h-6 w-48 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="h-6 w-1/4 bg-gray-300 rounded-md mb-6"></div>
          <div className="grid md:grid-cols-3 lg:gap-10 gap-1 justify-between space-y-4 md:space-y-0">
            {[1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="w-[100%] mx-auto shadow-lg rounded-lg overflow-hidden animate-pulse bg-gray-300"
              >
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-4 space-y-2">
                  <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
                  <div className="h-4 bg-gray-400 rounded-md w-full"></div>
                  <div className="h-4 bg-gray-400 rounded-md w-5/6"></div>
                  <div className="h-6 bg-gray-400 rounded-md w-1/2 mt-4"></div>
                </div>
                <div className="p-4">
                  <div className="h-10 bg-gray-400 rounded-md w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
