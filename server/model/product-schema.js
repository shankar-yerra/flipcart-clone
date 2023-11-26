import mongoose from "mongoose";

// before inserting data into database we need to validate the data.so this file validates the data with the help of mongoose schema by creating a schema.

const productSchema = new mongoose.Schema({
  id: {
     type: String,
     required: true,
     unique: true
  },
  url: String,
  detailUrl: String,
  title: Object,
  price: Object,
  quantity: Number,
  description: String,
  discount: String,
  tagline: String
});

// in id we created an object because to remove duplicates from database by adding unique without any deletemany function in default.js

const Product = mongoose.model('product', productSchema);
// collection name product.

export default Product;