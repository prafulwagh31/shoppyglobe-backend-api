import { addNewProduct, deleteProduct, getAllProduct, getProductId, updateProductDetails } from "../Controller/product.controller.js";

export function productRoute(app){
    app.post("/api/addProduct", addNewProduct);
    app.get("/api/getAllProduct", getAllProduct);
    app.get("/api/getProductId/:id", getProductId);
    app.put("/api/updateProduct/:id", updateProductDetails);
    app.delete("/api/deleteProduct/:id", deleteProduct);
}