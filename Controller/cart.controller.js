import userModel from "../Model/user.model.js";
import cartModel from "../Model/cart.model.js";
import productModel from "../Model/product.model.js";

// Add to cart - (POST)
export const addToCart = async (req, res) => {
    const { user, product, quantity } = req.body;
    try {
        const isProductMatch = await productModel.findById(product);
        const isUserMatch = await userModel.findById(user);

        if (!isUserMatch) {
            return res.status(404).send({message: "User not found" });
        }

        if (!isProductMatch) {
            return res.status(404).send({message: "Product not found" });
        }

        const cartResult = await cartModel.create({ quantity, product, user });
        res.status(201).send({message: "Product added to cart successfully", cartResult });
    } catch (err) {
        return res.status(500).send({message: "Server Error", error: err.message });
    }
}


// Update Cart - (PUT)
export const updateCart = async (req, res) => {
    const cartId = req.params.id; 
    const userId = req.user;

    try {
        const cartItem = await cartModel.findById(cartId);
        if (!cartItem) {
            return res.status(404).send({ message: "Cart item not found" });
        }

        if (cartItem.user.toString() !== userId) {
            return res.status(403).send({ message: "Unauthorized Access" });
        }

        // Update the cart item
        const updatedCartData = await cartModel.findByIdAndUpdate(cartId, req.body, { new: true });
        res.status(200).send({
            message: "Cart item updated successfully",
            updatedCartData,
        });
    } catch (err) {
        res.status(500).send({ message: "Server Error", error: err.message });
    }
};


// Get all cart item - (GET)
export const getAllCartItem = async (req, res) => {
    try {
        const allCartItem = await cartModel.find();
        res.status(200).send({messge: "All Cart Item List", allCartItem })

    } catch (err) {
        return res.status(500).send({message: "Server Error", error: err.message});
    }
}


// Get cart item using specific id - (GET)
export const getCartId = async (req, res) => {
    const id = req.params.id;
    try {
        const cartId = await cartModel.findById(id);
        if (!cartId) {
            return res.status(404).send({message: "Cart Item not found" });
        }
        res.status(200).send({messge: "Cart Item Found", cartId })

    }   catch (err) {
        return res.status(500).send({message: "Server Error", error: err.message});
    }
}


// Delete cart item using specific id - (DELETE)
export const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    const userId = req.user; 

    try {
        const cartItem = await cartModel.findById(cartId);
        if (!cartItem) {
            return res.status(404).send({ message: "Cart item not found" });
        }

        if (cartItem.user.toString() !== userId) {
            return res.status(403).send({ message: "Unauthorized Access" });
        }

        // Delete the cart item
        await cartModel.findByIdAndDelete(cartId);

        res.status(200).send({message: "Cart item deleted successfully", cartItem});
    } catch (err) {
        res.status(500).send({message: "Server Error", error: err.message});
    }
};


