"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../schemas/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserController = function () { };
UserController.register = async (req, res) => {
    try {
        const user = await user_model_1.UserModel.findOne({ email: req.body.email });
        if (!user) {
            const passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
            let userData = {
                email: req.body.email,
                username: req.body.username,
                password: passwordHash,
                role: "customer"
            };
            const newUser = await user_model_1.UserModel.create(userData);
            return newUser;
        }
        else {
            return { err: 'Email has been used' };
        }
    }
    catch (err) {
        return err;
    }
};
UserController.login = async (req, res) => {
    try {
        const user = await user_model_1.UserModel.findOne({ username: req.body.username });
        if (user) {
            const comparePass = await bcrypt_1.default.compare(req.body.password, user.password);
            if (!comparePass) {
                return Promise.reject({
                    code: 404,
                    message: "PASSWORD_NOT_VALID",
                });
            }
            let payload = {
                user_id: user["id"],
                email: user["email"],
                username: user["username"],
            };
            const token = jsonwebtoken_1.default.sign(payload, 'hungnv', {
                expiresIn: 36000,
            });
            return token;
        }
        else {
            return { err: 'Email has been used' };
        }
    }
    catch (err) {
        return err;
    }
};
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map