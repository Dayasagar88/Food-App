import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";



export const addMenu = async (req:Request, res:Response) => {
    try {
        const {name , description, price} = req.body;
        const file = req.file;
        if(!file){
            return res.status(400).json({
                success: false,
                message : "Image is required"
            })
        }
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        const menu : any = await Menu.create({
            name,
            description,
            price,
            image:imageUrl
        })

        const restaurant = await Restaurant.findOne({user:req.id});
        if(restaurant){
           (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id); 
           await restaurant.save()
        }

        return res.status(200).json({
            success : true ,
            message :"Menu Added",
            menu
        }) 
    } catch (error) {
        console.log(error) 
        return res.status(500).json({message : "Internal server error"})
    }
}



export const editMenu = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const {name , description, price} = req.body;
        const file = req.file;
        const menu = await Menu.findById(id);
        if(!menu){
            return res.status(404).json({
                success : false,
                message: "Menu Not Found"
            })
        }

        if(name) menu.name = name;
        if(description) menu.description = description;
        if(price) menu.price = price;

        if(file){
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            menu.image = imageUrl;
        }
        await menu.save();


        return res.status(200).json({
            success : true,
            message : "Menu Updated",
            menu
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal server error"})
    }
}


export const deleteMenu = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const menu : any = await Menu.findById(id);

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: "Menu Not Found",
            });
        }

        // Remove the menu
        await menu.deleteOne();

        // Find the restaurant associated with the user
        const restaurant = await Restaurant.findOne({ user: req.id });

        if (restaurant) {
            // Update the restaurant's menus by filtering out the deleted menu
            restaurant.menus = restaurant.menus.filter((menu:any) => menu._id.toString() !== id);
            await restaurant.save(); // Save the updated restaurant only if it exists
        }

        return res.status(200).json({
            success: true,
            message: "Menu Deleted",
            menu
        });
    } catch (error) {
        console.error("Error deleting menu:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



