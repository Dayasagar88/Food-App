import React from "react";
import image from "../assets/hero_pizza.png"
import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Success = () => {
  const orders = [1];
  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );
  }
  return (
    <div className="flex items-center bg-gray-50 dark:bg-gray-900 px-4 justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 max-w-lg w-full">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Order Status : <span className="">{"confirm".toUpperCase()}</span>
          </h1>
        </div>
        <div className="mb-6 ">
          <h1 className="text-gray-700 text-lg font-semibold dark:text-gray-300">
            Order Summary
          </h1>
          <div className="mb-4 ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src={image} alt="img"  className="w-14 h-14 rounded-md object-cover"/>
                <h2 className="ml-4 text-gray-800 font-medium dark:text-gray-200">Paneer Pizza</h2>
              </div>
              <div className="text-right">
                <div className="text-gray-800 dark:text-gray-200 flex items-center">
                    <IndianRupee/>
                    <span className="text-lg font-medium">20</span>
                </div>
              </div>
            </div>
            <Separator className="my-4"/>
          </div>
          <div className="mb-4 ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img src={image} alt="img"  className="w-14 h-14 rounded-md object-cover"/>
                <h2 className="ml-4 text-gray-800 font-medium dark:text-gray-200">Paneer Pizza</h2>
              </div>
              <div className="text-right">
                <div className="text-gray-800 dark:text-gray-200 flex items-center">
                    <IndianRupee/>
                    <span className="text-lg font-medium">20</span>
                </div>
              </div>
            </div>
            <Separator className="my-4"/>
          </div>
        </div>
        <Link className="" to="/">
            <Button className="bg-orange hover:bg-hoverOrange w-full shadow-lg">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
