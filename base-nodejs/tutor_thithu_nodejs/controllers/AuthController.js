import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
    async signup (req,res) {
        try {
            const {username, email, password } = req.body;
            //kiểm tra đã tồn tại chưa
            const exisredEmail = await User.findOne({email});
            if (exisredEmail) {
                return res.status(409).json({ message: "Email đã được sử dụng" });
            }
            //mã háo password 
            const hashedPassword = await bcryptjs.hash(password, 10);
            //luu du lieu
            const user = await User.create({
                username,
                email,
                password: hashedPassword
            });

            res.status(201).json({ message: "Thêm mới thành công", data: user.toObject() });

        } catch (error) {
            res.status(400).json({message:error.message});
        }
    }

    async signin(req, res) {
        const { email, password } = req.body;
        //check email có trong db không
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "email không tồn tại " });
        };
        //check pass có đúng không
        const checkedPassword = await bcryptjs.compare(password, user.password);
        if (!checkedPassword) {
            return res.status(404).json({ message: "thong tin khong chinh xac" })
        };
        const token = jwt.sign({ id: user.id }, 'wd18411', { expiresIn: '1d' })
        res.status(200).json({ message: "dang nhap thanh cong", data: user, token })
    }
}

export default AuthController;
