import jwt from "jsonwebtoken";
// middleware authMiddleware dùng để verify jwt gửi từ client, nếu oke thì cho đi tiếp
export const auth= async (req, res, next) => {
    try {
        let accessToken = req.body["access_token"];
        if (accessToken) {
            jwt.verify(accessToken, "123456789", (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: err.message,
                        status: 401
                    })
                } else {
                    req.decoded = decoded; // gán giá trị tokenn đã decoed vào biến req.decoded
                    next();
                }
            })
        }
    } catch (err) {
        return res.status(401).json({
            message: err.message,
            status: 401
        })
    }
}