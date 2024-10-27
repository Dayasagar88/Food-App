import { useEffect } from "react";
import { Label } from "./ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const Orders = () => {
  const { getRestaurantOrders, restaurantOrders, updateRestaurantOrder} = useRestaurantStore();

  useEffect(()=> {
    getRestaurantOrders();
  },[])
   const handleStatusChange =  async (id : string, status : string) => {
      await updateRestaurantOrder(id , status)
   }

  return (
    <div className="max-w-6xl min-h-screen px-6 mx-auto py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">
        Orders Overview
      </h1>

      { restaurantOrders.map((order) => (
          <div key={order._id} className="my-4">
          <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            {order.cartItems.map((item : any , index: number) => (
              <div key={index} className="flex-1 mb-6 sm:mb-0">
              <h1 className="text-gray-600  dark:text-gray-400">
               <span className="font-semibold"> Customer name :</span> {order.deliveryDetails.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {" "}
                <span className="font-semibold">Customer Address : </span> {order?.deliveryDetails.address}
              </p>
              <p className=" text-gray-600 dark:text-gray-400">
               <span className="font-semibold"> Item :</span> <span>{item.name}</span>
              </p>
              <p className="text-gray-600  dark:text-gray-400 "> <span className="font-semibold">Qty :</span> {item.quantity} </p>
              <p className="text-gray-600 dark:text-gray-400 ">
                {" "}
                <span className="font-semibold">Total Amount : </span>{order.totalAmount/100}₹</p>
            </div>
            ))
              }
            <div className="w-full sm:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Status
              </Label>
              <Select onValueChange={(newStatus) => handleStatusChange(order._id, newStatus)} defaultValue={order.status} >
                <SelectTrigger>
                  <SelectValue placeholder={order.status} />
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
                      <SelectItem key={index} value={(status).toLowerCase()}>{status}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))  }

    </div>
  );
};

export default Orders;
