import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
    try {
        // console.log(req.body);
        const token = req.body["access_token"];
        // console.log("token1", token);
        const decoded = jwt.verify(token, process.env["SECRET_JWT"]);
        if (decoded) {
            req.decoded = decoded;
            // console.log("decoded",decoded)
            // console.log("body authen", req.body);

            next();
            return;
        } else {
            return res.status(401).json({
                code: 401,
                message: "UNAUTHENTICATED"
            })
        }
    } catch (e) {
        return res.status(500).json({error: e.message});
    }


}