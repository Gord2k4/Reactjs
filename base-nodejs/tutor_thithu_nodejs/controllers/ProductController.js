import Product from "../models/Product.js";

class ProductController {
    //lay danh sach
    async getList(req,res){
        try {
            const products = await Product.find();
            res.status(200).json({message:"lay danh sach thanh cong",data: products})
        } catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    //thong tin chi tiet
    async getDetail(req,res){
        try {
            //lay id
            const id = req.params.id
            const product = await Product.findById(id);
            if(!product){
                return res.status(404).json({message:"khong tim thay san pham"})
            }
            res.status(200).json({message:"thanh cong", data:product})
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    }

    //them san pham
    async create(req,res){
        try {
            const data = req.body;
            const newProduct = await Product.create(data);
            res.status(201).json({message:"thanh cong", data:newProduct})
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    //update
    async update(req,res){
        try {
            const data = req.body; //lay du lieu nguoi dung gui len
            const id = req.params.id;
            const updatedProduct = await Product.findByIdAndUpdate(id, data);
            if(!updatedProduct){
                res.status(404).json({message:"khong tim thay id"})
            }
            res.status(201).json({message:"thanh cong", data:updatedProduct})
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }
    
    //xoa
    async delete(req,res){
        try {
            const id = req.params.id;
            const product = await Product.findByIdAndDelete(id);
            if(!product){
                res.status(404).json({message:"khong tim thay id "})
            }
            res.status(200).json({message:"xoa thanh cong"})
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }
}

export default ProductController;