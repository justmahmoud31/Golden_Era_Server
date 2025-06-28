import Product from "../../../models/product.js";

export const getProductPrice = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        const productPrice = product.price;
        res.status(200).json({
            Message: "Product Price",
            price: productPrice
        })
    } catch (error) {
        res.status(500).json({
            Error: error
        })
    }
}