import React, { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogFooter } from "./ui/dialog";
import { DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ReviewOrder = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: "",
  });

  const inputChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input)
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
        <form onSubmit={handleSubmit} className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0">
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
            <Button className="bg-orange hover:bg-hoverOrange w-full mt-2">Proceed To Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewOrder;
