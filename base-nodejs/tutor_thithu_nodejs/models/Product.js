import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {type: String, require: true},
    price: {type: Number},
    description: {type: String},
    category: {type: String},
    image: {type:String}
},
{
    timestamps:true, versionKey: false
})

const Product = mongoose.model("Product", productSchema);

export default Product;