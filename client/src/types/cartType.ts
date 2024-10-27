import { MenuItem } from "./restaurantType";

interface CartItem extends MenuItem {
  quantity: number;
}

export type CartState = {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  clearCart: () => void;
  removeFromTheCart: (id: string) => void;
  increamentQuantity: (id: string) => void;
  decreamentQuantity: (id: string) => void;
};
