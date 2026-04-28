import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import { products } from './assets/assets.js';
import productModel from "./models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "./config/cloudinary.js";

configDotenv();
connectCloudinary();

const seedDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);

    // Clear existing products
    await productModel.deleteMany();

    // Map assets to match our schema, awaiting all async image uploads
    const formattedData = await Promise.all(
      products.map(async (item) => {
        // Upload all images for this product to Cloudinary
        const uploadedImages = await Promise.all(
          item.image.map(async (img) => {
            const result = await cloudinary.uploader.upload(`./assets/${img}`, {
              resource_type: "image",
            });
            // console.log(result);
            return result.secure_url;
          })
        );

        return {
          name: item.name,
          description: item.description,
          price: Number(item.price),
          image: uploadedImages || [],
          category: item.category,
          subCategory: item.subCategory,
          sizes: item.sizes || [],
          date: Date.now(),
          bestseller: item.bestseller,
        };
      })
    );

    await productModel.insertMany(formattedData);
    console.log("Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();