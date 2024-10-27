import React, { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogFooter } from "./ui/dialog";
import { DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import { CheckoutSessionRequest } from "@/types/orderType";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Loader } from "lucide-react";

const ReviewOrder = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: (user?.contact || "").toString(),
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  const { cart } = useCartStore();
  const { restaurant } = useRestaurantStore();
  const { loading, createCheckoutSession } = useOrderStore();
  const {clearCart} = useCartStore()

  const inputChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // api implementation start from here
    try {
      const checkoutData: CheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          menuId: cartItem._id,
          name: cartItem.name,
          image: cartItem.image,
          price: cartItem.price.toString(),
          quantity: cartItem.quantity.toString(),
        })),
        deliveryDetails: input,
        restaurantId: restaurant?._id as string,
      };
      await createCheckoutSession(checkoutData);
      clearCart()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="font-bold">Review your order</DialogTitle>
        <DialogDescription>
          Double check your delivery details and ensure everything in order is
          correct. When you are ready, hit confirm button to finalize your
          order.
        </DialogDescription>
        <form
          onSubmit={handleSubmit}
          className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0"
        >
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              value={input.name}
              name="name"
              onChange={inputChangehandler}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              disabled
              type="text"
              value={input.email}
              name="email"
              onChange={inputChangehandler}
            />
          </div>
          <div>
            <Label>Contact</Label>
            <Input
              type="text"
              value={input.contact}
              name="contact"
              onChange={inputChangehandler}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              type="text"
              value={input.address}
              name="address"
              onChange={inputChangehandler}
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              type="text"
              value={input.city}
              name="city"
              onChange={inputChangehandler}
            />
          </div>
          <div>
            <Label>Country</Label>
            <Input
              type="text"
              value={input.country}
              name="country"
              onChange={inputChangehandler}
            />
          </div>
          <DialogFooter className="w-full">
            <div className="text-cente w-full mt-2">
              <Button
                disabled={loading}
                className="bg-orange hover:bg-hoverOrange w-full"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-1" /> Please wait...
                  </>
                ) : (
                  "Proceed To Payment"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewOrder;
