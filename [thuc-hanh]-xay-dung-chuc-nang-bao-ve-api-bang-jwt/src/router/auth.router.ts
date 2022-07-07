import express from "express";

export const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {userModel} from "../schemas/user.model";
import {productModel} from "../schemas/product.model";
import {auth} from "../middleware/auth.middleware";


router.use("/product", auth); // sử dụng middleware auth để xác thức cho mọi request gửi lên
// middleware auth sẽ verify access_token được đính kèm trong body xem có đúng không, nếu đúng thì cho phép truy cập vào product

//[POST] đăng ký
router.post("/user/register", async (req, res) => {
    try {
        const user = await userModel.findOne({username: req.body.username});
        if (!user) {
            const passwordHash = await bcrypt.hash(req.body.password, 10);
            let userData = {
                username: req.body.username,
                password: passwordHash
            }
            const newUser = await userModel.create(userData);
            res.json({newUser, code: 200});
        } else {
            res.json({err: "User exited"});
        }

    } catch (err) {
        res.json({err});
    }
});
//[POST] login - xác thực đăng nhập để cấp jwt token
router.post("/user/login", async (req, res) => {
    try {
        const user = await userModel.findOne({username: req.body.username});
        console.log(user)
        if (user) {
            const comparePass = await bcrypt.compare(req.body.password, user.password);
            if (!comparePass) {
                return Promise.reject({
                    code: 404,
                    message: "PASSWORD_NOT_VALID"
                })
            }
            // Tạo payload để lưu vào jwt
            let payload = {
                user_id: user["_id"],
                username: user["username"]
            }
            // tạo jwt token
            const secret = "123456789";
            const token = jwt.sign(payload, secret, {expiresIn: 3600}); // synchornus method
            return res.json({
                token,
                code: 200
            });
        } else {
            return res.json({
                message: "User not found!"
            })
        }
    } catch (err) {
        return res.json({err: err.message})
    }
});

// [POST] create product
router.post("/product/create", async (req, res) => {
    try {
        const product = await productModel.findOne({
            name: req.body.name
        });
        if (!product) {
            let productData = {
                name: req.body.name,
                price: req.body.price,
                category: req.body.category
            };
            // create new product in datatbase
            const productNew = await productModel.create(productData);
            res.json({
                productNew,
                code: 200
            })
        } else {
            res.json({
                err: "Product exsited!"
            })
        }
    } catch (err) {
        res.json({
            err
        })
    }
})


