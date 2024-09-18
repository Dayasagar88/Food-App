import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";

const EditMenu = ({
  editOpen,
  setEditOpen,
  selectedMenu,
}: {
  selectedMenu: any;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const loading = false;
  const [errors, setErrors] = useState<Partial<MenuFormSchema>>({});

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error?.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<MenuFormSchema>);
      return;
    }

    console.log(input);
  };
  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
    console.log(selectedMenu);
  }, [selectedMenu]);

  return (
    input && (
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu</DialogTitle>
            <DialogDescription>
              Update your menu for being updated in the market.
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
              )}{" "}
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
                  {errors.image?.name || "Image file required"}
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
                    <Loader className="animate-spin w-5 mr-1" /> Please wait...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
};

export default EditMenu;
