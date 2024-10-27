import  { useEffect } from "react";

import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";

const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    try {
      getOrderDetails();
    } catch (error) {}
  }, []);
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
            Orders Summary
          </h1>
        </div>

        {orders?.map((order: any , index:number) => (
          <div key={index} className="mb-6 ">
          

            {order.cartItems.map((item: any, index:number) => (
              <div key={index} className="mb-4 ">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt="img"
                    className="w-14 h-14 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="ml-4 text-gray-800 font-medium dark:text-gray-200">
                      {item.name}
                    </h2>
                    <p className="text-sm ml-4 font-semibold">Qty : {item.quantity}</p>
                    <p className="ml-4 text-sm text-orange">
                      Status :{" "}
                      <span
                        className={`${
                          order.status === "confirmed"
                            ? "text-green-600"
                            : "text-orange"
                        } text-sm font-semibold`}
                      >
                        {order.status.toUpperCase()}
                      </span>{" "}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-gray-800 dark:text-gray-200 flex items-center">
                    <IndianRupee className="w-4" />
                    <span className="text-lg font-medium">{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
            </div>
            ))
              
            }
            
          </div>
        ))}

        <Link className="" to="/">
          <Button className="bg-orange hover:bg-hoverOrange w-full shadow-lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
