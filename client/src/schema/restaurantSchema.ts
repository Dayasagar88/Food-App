import {z} from "zod";

export const restaurantFormSchema = z.object({
    resName : z.string().nonempty({message: "Restaurant name is required"}),
    city : z.string().nonempty({message : "City is required"}),
    country : z.string().nonempty({message : "Country is required"}),
    deliveryTime : z.number().min(0, {message : "Delivery Time cannot be negative"}),
    cuisines : z.array(z.string()),
    image : z.instanceof(File).optional().refine((file) => file?.size !== 0, {message : "Image file is required"}) 
})

export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>;
