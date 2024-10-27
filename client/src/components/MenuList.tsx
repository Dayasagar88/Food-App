
import { Card, CardContent, CardFooter } from "./ui/card";

import { MenuItem } from "@/types/restaurantType";
import { useCartStore } from "@/store/useCartStore";
import AddToCartButton from "./AddToCartButton";

const MenuList = ({ menus }: { menus: MenuItem[] }) => {
  const { addToCart, cart , decreamentQuantity, increamentQuantity , removeFromTheCart} = useCartStore();

  return (
    <div className="">
    <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available menu</h1>
    <div className="grid md:grid-cols-3 gap-1 justify-between space-y-4 md:space-y-0">
      {menus.map((menu: any) => {
        // Find the cart item that corresponds to the current menu item
        const cartItem : any = cart.find((item) => item._id === menu._id);

        return (
          <Card
            key={menu._id}
            className="md:max-w-xs mx-auto max-h-[30rem] flex flex-col justify-between shadow-lg rounded-lg overflow-hidden"
          >
            <div className="h-[50%] overflow-hidden">
              <img
                src={menu.image}
                alt="img"
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="mt-2">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-600 h-20 overflow-auto">
                {menu?.description}
              </p>
              <h3 className="text-lg font-semibold mt-2">
                Price : <span className="text-orange">₹{menu.price}</span>
              </h3>
            </CardContent>

            <CardFooter className="">
              {/* Pass the specific cart item for this menu */}
              <AddToCartButton
                cartItem={cartItem}  // Now cartItem corresponds to the specific menu
                menu={menu}
                addToCart={addToCart}
                decreamentQuantity={decreamentQuantity}
                increamentQuantity={increamentQuantity}
                removeFromTheCart={removeFromTheCart}
              />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  </div>
  );
};

export default MenuList;
