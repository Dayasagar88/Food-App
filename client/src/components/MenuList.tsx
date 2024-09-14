import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";

const MenuList = () => {
  return (
    <div className="">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">
        Available menu
      </h1>
      <div className="grid md:grid-cols-3 gap-1 justify-between space-y-4 md:space-y-0">

        {
            [1,2,3].map((item, index) => (
                <Card className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <div>
            <img
              src="https://plus.unsplash.com/premium_photo-1670601440146-3b33dfcd7e17?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="img"
              className="w-full h-full object-cover"
            />
          </div>

          <CardContent className="mt-2">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Noodles</h1>
            <p className="text-sm text-gray-600 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium excepturi ipsam?</p>
            <h3 className="text-lg font-semibold mt-2">Price : <span className="text-orange">10$</span></h3>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="bg-orange hover:bg-hoverOrange w-full">Add to cart</Button>
          </CardFooter>
        </Card>
            ))
        }
        
      </div>
    </div>
  );
};

export default MenuList;
