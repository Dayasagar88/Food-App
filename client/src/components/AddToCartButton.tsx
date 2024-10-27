import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { MenuItem } from "@/types/restaurantType";

interface CartItem extends MenuItem {
  quantity: number;
}

interface AddToCartButtonProps {
  cartItem: CartItem;
  addToCart: (item: MenuItem) => void;
  menu : any;
  increamentQuantity: (id: string) => void;
  decreamentQuantity: (id: string) => void;
  removeFromTheCart: (id: string) => void;
}

const AddToCartButton : React.FC<AddToCartButtonProps> = ({
  cartItem,
  addToCart,
  menu,
  increamentQuantity,
  decreamentQuantity,
  removeFromTheCart,
}) => {


  return (
    <div className="w-full">
      {cartItem?.quantity > 0 ? (
        <Button className="bg-orange hover:bg-hoverOrange w-full transition-all duration-300 ease-in-out">
          <span className="flex items-center w-full px-2 justify-between">
            <Minus
              onClick={() => {
                if (cartItem.quantity > 1) {
                  decreamentQuantity(menu._id);
                }else{
                    removeFromTheCart(menu._id)
                }
              }}
            />
            <p>{cartItem?.quantity}</p>
            <Plus onClick={() => increamentQuantity(menu._id)} />
          </span>
        </Button>
      ) : (
        <Button
          onClick={() => addToCart(menu)}
          className="bg-orange hover:bg-hoverOrange w-full transition-all duration-300 ease-in-out"
        >
          {"Add to cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
