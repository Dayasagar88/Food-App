import React, { FormEvent, useState } from "react";
import { Dialog, DialogFooter, DialogHeader } from "./ui/dialog";
import { DialogTitle, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader, Plus } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const AddMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuFormSchema>();
  const [editOpen, setEditOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<MenuFormSchema>>({});
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const {loading , createMenu} = useMenuStore();
  const {restaurant} = useRestaurantStore();
  
  const inputChangeHandler =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error?.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    //API implementation
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if(input.image){
        formData.append("image", input.image);
      }
      await createMenu(formData);
      setOpen(!open)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 min-h-screen px-2">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menu
        </h1>
        <Dialog open={open} onOpenChange={setOpen}  >
          <DialogTrigger>
            <Button className="bg-orange hover:bg-hoverOrange">
              <Plus className="mr-1" />
              Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add details of your menu</DialogTitle>
              <DialogDescription className="text-sm">
                Add new menu to stand out your restaurant
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler}>
              <div>
                <Label>Menu name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter menu name"
                  value={input.name}
                  onChange={inputChangeHandler}
                />
                {errors && (
                  <span className="font-semibold text-sm text-red-700">
                    {errors.name}
                  </span>
                )}
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  placeholder="Add Description"
                  value={input.description}
                  onChange={inputChangeHandler}
                />
                {errors && (
                  <span className="font-semibold text-sm text-red-700">
                    {errors.description}
                  </span>
                )}
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  name="price"
                  placeholder="Enter price in rupee"
                  value={input.price}
                  onChange={inputChangeHandler}
                />
                {errors && (
                  <span className="font-semibold text-sm text-red-700">
                    {errors.price}
                  </span>
                )}
              </div>
              <div>
                <Label>Upload image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                  accept="image/*"
                />
                {errors && (
                  <span className="text-red-600 font-semibold text-sm">
                    {errors.image?.name}
                  </span>
                )}
              </div>
              <DialogFooter>
                <Button
                  disabled={loading}
                  className="bg-orange hover:bg-hoverOrange mt-4 w-full"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin w-5 mr-1" /> Please
                      wait...
                    </>
                  ) : (
                    "Add"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {restaurant?.menus.map((item: any, idx: number) => (
        <div key={idx} className="mt-6 space-y-6">
          <div className="flex flex-col md:flex-row border shadow-lg rounded-lg md:items-center md:space-x-4 md:p-4 p-2">
            <img
              src={item.image}
              alt="img"
              className="md:h-24 md:w-24 w-full h-16 object-cover rounded-md"
            />
            <div className="flex-1 ">
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {item.name}
              </h1>
              <p className="font-medium text-sm text-gray-600  mt-1">
                {item.description}
              </p>
              <h2 className="text-md font-semibold mt-2">
                Price : <span className="text-orange">₹{item.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(item);
                setEditOpen(true);
              }}
              className="bg-orange hover:bg-hoverOrange mt-2"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  );
};

export default AddMenu;
