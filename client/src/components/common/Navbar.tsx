import {
  HandPlatter,
  Icon,
  icons,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Menubar,
  MenubarItem,
  MenubarMenu,
  MenubarContent,
  MenubarTrigger,
} from "../ui/menubar";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const admin = true;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <div className="w-full bg-black z-50 h-16">
      <div className="max-w-7xl lg:px-0 px-6 text-white flex justify-between items-center h-full mx-auto">
        <Link to="/">
          <h1 className="text-white select-none md:text-3xl text-2xl font-bold">
            DayaEats
          </h1>
        </Link>

        {/* For large device */}
        <div className="md:flex hidden z-50 items-center gap-7 font-semibold">
          {/* Navs */}
          <nav className="flex gap-5">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange"
                  : "text-white hover:text-orange transition-text duration-150"
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange"
                  : "text-white hover:text-orange transition-text duration-150"
              }
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-orange"
                  : "text-white hover:text-orange transition-text duration-150"
              }
              to="/orders"
            >
              Orders
            </NavLink>
          </nav>
          {/* Dark mode */}
          <div className="flex gap-5 items-center">
            <div className="cursor-pointer">
              {theme === "light" ? (
                <Sun onClick={() => setTheme("dark")} />
              ) : (
                <Moon onClick={() => setTheme("light")} />
              )}
            </div>
            <Link to="/cart">
              <div className="relative">
                <ShoppingCart />
                <Button
                  size={"icon"}
                  className="bg-red-600 w-4 h-4 absolute -top-1 -right-1"
                >
                  1
                </Button>
              </div>
            </Link>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          {admin && (
            <Menubar className="">
              <MenubarMenu>
                <MenubarTrigger className="">Dashbord</MenubarTrigger>
                <MenubarContent className="">
                  <Link to="/admin/restaurant">
                    <MenubarItem>Restaurant</MenubarItem>
                  </Link>
                  <Link to="/admin/menu">
                    <MenubarItem>Menu</MenubarItem>
                  </Link>
                  <Link to="/admin/orders">
                    <MenubarItem>Orders</MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}

          {/* Logout */}
          <NavLink
            className="hover:text-orange transition-text duration-150"
            to="/login"
          >
            Logout
          </NavLink>
        </div>

        {/*Menu icon  */}
        <div className="flex md:hidden gap-3">
          <Link to="/cart">
            <div className="relative">
              <ShoppingCart />

              <Button
                size={"icon"}
                className="bg-red-600 w-4 h-4 absolute -top-1 -right-1"
              >
                1
              </Button>
            </div>
          </Link>
          <div className=" cursor-pointer">
            {theme === "light" ? (
              <Sun onClick={() => setTheme("dark")} />
            ) : (
              <Moon onClick={() => setTheme("light")} />
            )}
          </div>
          <div onClick={toggleMenu} className="cursor-pointer">
            <div
              className={`transition-transform duration-300 transform ${
                isMenuOpen ? "-rotate-90" : "rotate-0"
              }`}
            >
              {isMenuOpen ? (
                <X className="transition-transform duration-300" />
              ) : (
                <Menu className="transition-transform duration-300" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`bg-[#ffffff] text-black z-40 fixed top-16 left-0 w-full h-[calc(100vh-4rem)] flex items-center justify-center md:hidden transition-all duration-500 ease-in-out transform ${
          isMenuOpen ? "-translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <nav className="flex select-none   flex-col gap-5 font-bold text-lg">
          <NavLink className="flex gap-2" onClick={toggleMenu} to="/profile">
            <User /> Profile
          </NavLink>
          {/* {admin && (
            <Menubar className="">
              <MenubarMenu>
                <MenubarTrigger className="text-lg">Dashbord</MenubarTrigger>
                <MenubarContent className="">
                  <Link onClick={toggleMenu} to="/admin/restaurant">
                    <MenubarItem>Restaurant</MenubarItem>
                  </Link>
                  <Link onClick={toggleMenu} to="/admin/menu">
                    <MenubarItem>Menu</MenubarItem>
                  </Link>
                  <Link onClick={toggleMenu} to="/admin/orders">
                    <MenubarItem>Orders</MenubarItem>
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )} */}
          <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex gap-2" to="/order/status">
            <HandPlatter />
            Orders
          </NavLink>
          <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex gap-2" to="/admin/menu">
            <SquareMenu />
            Menu
          </NavLink>
          <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex gap-2" to="/admin/restaurant">
            <UtensilsCrossed />
            Restaurant
          </NavLink>
          <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex gap-2" to="">
            <PackageCheck /> Restaurant Orders
          </NavLink>
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-orange">Logout</Button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
