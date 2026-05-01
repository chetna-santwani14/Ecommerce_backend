import userModel from "../models/userModel.js";

//add product to user carts
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// update cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);

    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;
    // EXAMPLE : HOW QUANTITY COMES
    //     cartData = {
    //   "shirt123": {
    //     "M": 2,
    //     "L": 1
    //   }
    // }

    //
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "cart updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// get cart items
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
   const cartController = { addToCart, updateCart, getUserCart };

export default cartController
