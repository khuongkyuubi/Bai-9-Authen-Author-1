"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = async (req, res, next) => {
    try {
        console.log(req.body);
        let accessToken = req.body["access_token"];
        console.log(accessToken, 'accessToken');
        console.log(req.body, 'body');
        if (accessToken) {
            try {
                const decoded = jsonwebtoken_1.default.verify(accessToken, "123456789");
                req.decoded = decoded;
                next();
            }
            catch (err) {
                return res.status(401).json({
                    message: err.message,
                    code: 401
                });
            }
        }
        else {
            return res.status(401).json({
                message: 'No token provided.',
                status: 401,
            });
        }
    }
    catch (err) {
        return res.status(401).json({
            message: err.message,
            status: 401,
        });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map