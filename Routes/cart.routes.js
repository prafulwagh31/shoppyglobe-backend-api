import { addToCart, deleteCart, getAllCartItem, getCartId, updateCart } from "../Controller/cart.controller.js";
import { verifyToken } from "../Middleware/verifyToken.js";

export function cartRoutes(app){
    app.post("/api/addToCart", verifyToken, addToCart);
    app.put("/api/updateCart/:id", verifyToken, updateCart);
    app.get("/api/getAllCartItem", verifyToken, getAllCartItem);
    app.get("/api/cartId/:id", verifyToken, getCartId);
    app.delete("/api/cartDelete/:id", verifyToken, deleteCart);
}