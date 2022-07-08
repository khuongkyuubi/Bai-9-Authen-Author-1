import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    // -> lấy token từ header (hoặc body) -> verify -> nếu oke , gán giá trị đã verify vào biến req.decoded. Nếu có lỗi thì catch lỗi
    try {
        console.log(req.body)
        let accessToken = req.body["access_token"]; // token được gửi trong body từ phía request, có thể gửi trong headers Authorization
        console.log(accessToken, 'accessToken')
        console.log(req.body, 'body')
        if (accessToken) {
            // jwt.verify(
            //     accessToken,
            //     "123456789",
            //     (err, decoded) => {
            //         if (err) {
            //             return res.status(401).json({
            //                 message: err.message,
            //                 status: 401,
            //             });
            //         } else {
            //             req.decoded = decoded;
            //             next();
            //         }
            //     },
            // );
            try {
                const decoded = jwt.verify(accessToken, "123456789"); // viết dạng này để thành hàm đồng bộ
                req.decoded = decoded; //gán giá trị token đã decoed vào biến req.decoded
                next()
            } catch (err) {
                return res.status(401).json({
                    message: err.message,
                    code: 401
                })
            }
        } else {
            return res.status(401).json({
                message: 'No token provided.',
                status: 401,
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: err.message,
            status: 401,
        });
    }

}
