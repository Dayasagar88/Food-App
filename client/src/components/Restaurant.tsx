import React, { FormEvent, useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import {
  restaurantFormSchema,
  RestaurantFormSchema,
} from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    resName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    image: undefined,
  });
  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});
  const {
    loading,
    createRestaurant,
    restaurant,
    updateRestaurant,
    getRestaurant,
  } = useRestaurantStore();

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitRestaurantHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = restaurantFormSchema.safeParse(input);
    if (!result.success) {
      const filedError = result.error.formErrors.fieldErrors;
      setErrors(filedError as Partial<RestaurantFormSchema>);
      return;
    }
    //Add restaurant API implementatin starts here
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.resName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.image) {
        formData.append("imageFile", input.image);
      }

      if (restaurant) {
        // update
        await updateRestaurant(formData);
        setErrors({});
      } else {
        // create
        await createRestaurant(formData);
        setErrors({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      setInput({
        resName: restaurant?.restaurantName || "",
        city: restaurant?.city || "",
        country: restaurant?.country || "",
        deliveryTime: restaurant?.deliveryTime || 0,
        cuisines: restaurant?.cuisines
          ? restaurant?.cuisines.map((cuisine: string) => cuisine)
          : [],
        image: undefined,
      });
    };
    fetchRestaurant();
  }, []);

  return (
    <div className="min-h-screen max-w-6xl px-2 mx-auto my-10">
      <div>
        <div>
          <h1 className="font-extrabold text-2xl mb-5">Add restaurant</h1>
          <form onSubmit={submitRestaurantHandler}>
            <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
              {/* Restaurant name */}
              <div className="">
                <Label>Restaurant name</Label>
                <Input
                  value={input.resName}
                  type="text"
                  name="resName"
                  onChange={inputChangeHandler}
                  placeholder="Enter your restaurant name"
                />
                {errors && (
                  <span className="text-red-600 font-semibold text-sm">
                    {errors.resName}
                  </span>
                )}
              </div>
              <div className="">
                <Label>City</Label>
                <Input
                  value={input.city}
                  type="text"
                  name="city"
                  onChange={inputChangeHandler}
                  placeholder="Enter city"
                />
                {errors && (
                  <span className="text-red-600 font-semibold text-sm">
                    {errors.city}
                  </span>
                )}
              </div>
              <div className="">
                <Label>Country</Label>
                <Input
                  value={input.country}
                  type="text"
                  name="country"
                  onChange={inputChangeHandler}
                  placeholder="Enter country"
                />
                {errors && (
                  <span className="text-red-600 font-semibold text-sm">
                    {errors.country}
                  </span>
                )}
              </div>
              <div className="">
                <Label>Estimated delivery time (minutes)</Label>
                <Input
                  value={input.deliveryTime}
                  type="number"
                  name="deliveryTime"
                  onChange={inputChangeHandler}
                  placeholder="Enter delivery time"
                />
                {errors && (
                  <span className="text-red-600 font-semibold text-sm">
                    {errors.deliveryTime}
                  </span>
                )}
              </div>
              <div className="">
                <Label>Cuisines</Label>
                <Input
                  value={input.cuisines}
                  type="text"
                  name="cuisines"
                  onChange={(e) =>
                    setInput({ ...input, cuisines: e.target.value.split(",") })
                  }
                  placeholder="e.g. Italian , Chinese, Indian"
                />
                {errors && (
                  <span className="text-red-600 font-semibold text-sm">
                    {errors.cuisines}
                  </span>
                )}
              </div>
              <div className="">
                <Label>Upload image</Label>
                <Input
                  accept="image/*"
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput({ ...input, image: e.target.files?.[0] })
                  }
                  placeholder="Enter your restaurant name"
                />
                {errors && (
                  <span className="text-red-600 font-semibold text-sm">
                    {errors.image?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <Button
                disabled={loading}
                className="bg-orange hover:bg-hoverOrange mt-4 w-full"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-1 w-5" /> Please wait...
                  </>
                ) : restaurant ? (
                  "Update restaurant"
                ) : (
                  "Add restaurant"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
