import express from "express";
import cartController from "../controller/cartController";
import authUser from "../middleware/auth";
const cartRouter = express.Router();
// here we are converting the token into token id
cartRouter.post("/get", authUser ,cartController.getUserCart);
cartRouter.post("/add",authUser , cartController.addToCart);
cartRouter.post("/update", authUser ,cartController.updateCart);

export default cartRouter