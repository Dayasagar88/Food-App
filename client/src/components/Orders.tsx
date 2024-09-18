import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Orders = () => {
  return (
    <div className="max-w-6xl min-h-screen px-6 mx-auto py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex-1 mb-6 sm:mb-0">
            <h1 className="text-xl text-gray-800 font-semibold dark:text-gray-100">
              Lorem
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {" "}
              <span className="font-semibold">Address : </span> Lorem, ipsum
              dolor.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {" "}
              <span className="font-semibold">Total Amount : </span>160
            </p>
          </div>
          <div className="w-full sm:w-1/3">
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Order Status
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    "Pending",
                    "Confirmed",
                    "Preparing",
                    "Out For Delivery",
                    "Delivered",
                  ].map((status: string, index: number) => (
                    <SelectItem key={index} value={status.toLowerCase()}>{status}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
