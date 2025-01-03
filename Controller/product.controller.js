import productModel from "../Model/product.model.js";

// Add product - (POST)
export function addNewProduct(req, res){
    const {name, price, description, stockQty} = req.body;

    try{
        const newProduct = new productModel({
            name: name,
            price: price,
            description: description,
            stockQty: stockQty
        });
        newProduct.save();
        res.status(201).send({
            message: "Product added successfully",
            data: newProduct
        });
    }
    catch(err){
        res.status(500).send({message: "Server Error", error: err.message});
    }
}

// Get All Product - (GET)
export function getAllProduct(req, res){
    productModel.find().then((data) => {
        if(!data){
            res.status(404).send({message: "No product found"});
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send({message: "Server Error", error: err.message});
    });
}


// Get specific product using ObjectId - (GET)
export function getProductId(req, res){
    const id = req.params.id;
    productModel.findById(id).then((data) => {
        if(!data){
            res.status(404).send({message: "Product not found"});
        }
        res.send(data);
    }).catch((err) => {
        res.status(500).send({message: "Server Error", error: err.message});
    });
}


//Update Product Details by using ObjectId - (PUT)
export const updateProductDetails = async (req, res) => {
    const id = req.params.id;
    try{
        const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedProduct){
            return res.status(404).send({ message: 'Product not update successfully' });
        }   
        res.status(200).send({message: "Product update successfully", updatedProduct});
    }
    catch(err){
        res.status(500).send({message: "Server Error", error: err.message});
    }
}

//Delete Product using ObjectId - (DELETE)
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try{
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).send({ message: 'Product not found' });
        }
        return res.status(200).send({message: "Product Deleted Successfully", deletedProduct});
    }
    catch(err){
        res.status(500).send({message: "Server Error", error: err.message});
    }
}