import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Minus, Plus } from "lucide-react";
import ReviewOrder from "./ReviewOrder";

const Cart = () => {
    const [open , setOpen ] = useState<boolean>(false);

  return (
    <div className="min-h-[100vh] px-2 flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant="link">Clear all</Button>
      </div>
      <div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Items</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right hover:underline text-black cursor-pointer">
                Remove
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage src="" alt="img" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>Chownmin</TableCell>
              <TableCell>10$</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border-gray-100 dark:border-gray-800 shadow-md">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-gray-200"
                  >
                    <Minus />
                  </Button>
                  <Button
                    disabled
                    size={"icon"}
                    variant={"outline"}
                    className="font-bold border-none"
                  >
                    {" "}
                    1
                  </Button>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="rounded-full bg-orange hover:bg-hoverOrange"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell>10$</TableCell>
              <TableCell className="text-right">
                <Button size={"sm"} className="bg-orange hover:bg-hoverOrange">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow className="text-2xl">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">10$</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex justify-end my-5">
            <Button onClick={() => setOpen(true)} className="bg-orange hover:bg-hoverOrange">Proceed to checkout</Button>
        </div>
      </div>
      <ReviewOrder open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Cart;
