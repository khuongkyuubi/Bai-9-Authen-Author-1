import userModel from "../schemas/user.model";
import express from "express";

const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default router;
// [GET] /auth/login
router.get("/login", ((req, res, next) => {
    return res.render("auth/login")
}));

// [POST] /auth/login
router.post("/login", async (req, res, next) => {
    try {
        // console.log(req.body);
        const user = await userModel.findOne({username: req.body.username});
        if (user) {
            const comparePass = await bcrypt.compare(req.body.password, user.password);
            if (comparePass) {
                // nếu đúng username và password rồi thì tiến hành tạo jwt token
                const payload = {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
                const jwtToken = jwt.sign(payload, process.env.SECRET_JWT, {expiresIn: "2h"}); // expries in 2h
                return res.json({jwtToken});
            } else {
                // reject ra error ném vào catch
                return Promise.reject({
                    code: 404,
                    message: "PASSWORD_NOT_VALID"
                })
            }
        } else {
            return res.json({message: "User not found!"})
        }
    } catch (err) {
        return res.json({error: err.message});
    }


})
// [GET] /auth/register
router.get("/register", ((req, res, next) => {
    res.render("auth/register")
}));

// [POST] /auth/register
router.post("/register", async (req, res, next) => {
    try {
        const userFind = await userModel.findOne({username: req.body.username});
        if (userFind) {
            return res.json({
                code: 400,
                message: "USER_EXISTS"
            });
        } else {
            const hashedPass = await bcrypt.hash(req.body.password, 10)
            const user = {
                username: req.body.username,
                password: hashedPass,
                role: req.body.role
            }
            const newUser = await userModel.create(user);
            return res.redirect("/auth/login");
        }
    } catch (e) {
        res.json({error: e.message})
    }
});
