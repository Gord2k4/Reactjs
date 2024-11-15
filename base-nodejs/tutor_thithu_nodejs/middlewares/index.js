// code base
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkPermission = async(req,res,next) =>{
     try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"user chua dang nhap"})
        }
        //kiem tra token co hop le
        const data = jwt.verify(token, 'wd18411');
         if(!data){
            return res.status(401).json({message:"thong tin user khong hop le"})
         }

        //token hop le
         const user = await User.findById(data.id);
         if(!user){
            return res.status(401).json({message:"user khong hop le"})
         }

         next();
     } catch (error) {
        res.status(400).json({message:error.message})
     }
}

export default checkPermission;