import  { useState } from "react";
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
import {  Minus, Plus } from "lucide-react";
import ReviewOrder from "./ReviewOrder";
import { useCartStore } from "@/store/useCartStore";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {
    cart,
    removeFromTheCart,
    increamentQuantity,
    decreamentQuantity,
    clearCart,
  } = useCartStore();

  const totalPrice = cart.reduce((acc, item) => {
    return acc += item.price * item.quantity;
  }, 0)



  return (
    <div className="min-h-[100vh] px-2 flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button onClick={clearCart} variant="link">Clear all</Button>
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
              <TableHead className="text-right">
                Remove
              </TableHead>
            </TableRow>
          </TableHeader>
          {cart.map((item) => (
            <TableBody key={item._id}>
              <TableRow>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={item.image} alt="img" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>₹{item.price}</TableCell>
                <TableCell>
                  <div className="w-fit flex items-center rounded-full border-gray-100 dark:border-gray-800 shadow-md">
                    <Button
                    onClick={() => {
                      if (item?.quantity > 1) {
                        decreamentQuantity(item._id);
                      }else{
                          removeFromTheCart(item._id)
                      }
                    }}
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
                      {item.quantity}
                    </Button>
                    <Button
                    onClick={() => increamentQuantity(item._id)}
                      size={"icon"}
                      variant={"outline"}
                      className="rounded-full bg-orange hover:bg-hoverOrange"
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>₹{item.price * item.quantity}</TableCell>
                <TableCell className="text-right">
                  <Button
                  onClick={() => removeFromTheCart(item._id)}
                    size={"sm"}
                    className="bg-orange hover:bg-hoverOrange"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
          <TableFooter>
            <TableRow className="text-2xl">
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className="text-right">₹{totalPrice}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex justify-end my-5">
          <Button
            onClick={() => setOpen(true)}
            className="bg-orange hover:bg-hoverOrange"
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
      <ReviewOrder open={open} setOpen={setOpen} />
    </div>
  );
};

export default Cart;
