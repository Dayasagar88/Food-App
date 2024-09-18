import React, { FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { restaurantFormSchema, RestaurantFormSchema } from "@/schema/restaurantSchema";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    resName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    image: undefined,
  });
  const loading = false;
  const restaurant = true;
  const [errors , setErrors] = useState<Partial<RestaurantFormSchema>>({})

  const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name , value , type } = e.target;
    setInput({...input , [name] : type === "number" ? Number(value) : value});
  }

  const submitRestaurantHandler = (e : FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        const result = restaurantFormSchema.safeParse(input);
        if(!result.success){
            const filedError = result.error.formErrors.fieldErrors;
            setErrors(filedError as Partial<RestaurantFormSchema>);
            return ;
        }
        setErrors({});
        console.log(input)
  }

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
                {errors && <span className="text-red-600 font-semibold text-sm" >{errors.resName}</span>}
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
                {errors && <span className="text-red-600 font-semibold text-sm" >{errors.city}</span>}

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
                {errors && <span className="text-red-600 font-semibold text-sm" >{errors.country}</span>}

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
                {errors && <span className="text-red-600 font-semibold text-sm" >{errors.deliveryTime}</span>}

              </div>
              <div className="">
                <Label>Cuisines</Label>
                <Input
                value={input.cuisines}
                  type="text"
                  name="cuisines"
                  onChange={(e) => setInput({...input , cuisines : e.target.value.split(",")})}
                  placeholder="e.g. Italian , Chinese, Indian"
                />
                {errors && <span className="text-red-600 font-semibold text-sm" >{errors.cuisines}</span>}

              </div>
              <div className="">
                <Label>Upload image</Label>
                <Input
                accept="image/*"
                  type="file"
                  name="image"
                onChange={(e) => setInput({...input , image : e.target.files?.[0]})}
                  placeholder="Enter your restaurant name"
                />
                {errors && <span className="text-red-600 font-semibold text-sm" >{errors.image?.name || "Image file required"}</span>}
              </div>
            </div>
            <div className="w-full">
              <Button disabled={loading} className="bg-orange hover:bg-hoverOrange mt-4 w-full">
                {loading ? <><Loader className="animate-spin mr-1 w-5"/> Please wait...</> : (restaurant ?  "Update restaurant" : "Add restaurant")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
