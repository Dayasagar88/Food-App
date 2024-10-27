import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { triggerAsyncId } from "async_hooks";
import { Order } from "../models/order.model";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, price, deliveryTime, cuisines } =
      req.body;
    const file = req.file;

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      return res.status(400).json({
        success: false,
        message: "You can only create one restaurant",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image required!",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    await Restaurant.create({
      user: req.id,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Restaurant added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id }).populate("menus");
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        restaurant : [],
        message: "Restaurant not found",
      });
    }
    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();
    return res.status(200).json({
      success: true,
      message: "Restaurant Updated successfully",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const {orderId} = req.params;
    const {status} = req.body;
    const order = await Order.findById(orderId);
    if(!order){
      return res.status(404).json({
        success : false,
        message: "Order not found"
      });
    }

    order.status = status;
    order.save();
    return res.status(200).json({
      success : true,
      status : order.status,
      message : "Status Updated"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchRestaurant = async (req:Request, res:Response)=> {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = req.query.searchQuery as string || "";
    const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisines => cuisines);

    const query : any = {};

    //Search on the basis of searchText (city , restaurantName , country)
    if(searchText){
      query.$or = [
        {restaurantName : {$regex: searchText, $options : "i"}},
        {city : {$regex: searchText, $options : "i"}},
        {country : {$regex: searchText, $options : "i"}},
      ]
    }
    //Search on the basis of searchQuery(cuisines)
    if(searchQuery){
      query.$or = [
        {restaurantName : {$regex : searchQuery , $options : "i"}},
        {cuisines : {$regex : searchQuery , $options : "i"}},
      ]
    }

    // console.log(query)

    if(selectedCuisines.length > 0){
      query.cuisines = {$in:selectedCuisines}
    }

    const restaurant = await Restaurant.find(query);
    return res.status(200).json({
      success : true,
      data: restaurant
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const getSingleRestaurant = async (req:Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path : "menus",
      options : {created : -1}
    });
    if(!restaurant){
      return res.status(404).json({
        success : false,
        message : "Restaurant not found"
      });
    }

    return res.status(200).json({
      success : true,
      restaurant
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error...." });
  }
}