export default function author(req, res, next) {
    let user = req.decoded;
    // console.log("user", user);
    // console.log("req author",req.body.role)
    if (user.role === "admin") {
        next();
    } else {
        return res.status(403).json({
            code: 403,
            message: "FORBIDDEN"
        })
    }
}