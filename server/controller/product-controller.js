
import Product from '../model/product-schema.js';

export const getProducts = async (request, response) => {
    try{
        const products = await Product.find({});
        // in find nothing is given to search because we want all products to be returned.
        response.status(200).json(products);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
}

export const getProductById = async (request, response) => {
    try{
        const id = request.params.id;
        const product = await Product.findOne({'id': id})

        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

