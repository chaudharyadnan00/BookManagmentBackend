import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).json({
                success: false,
                error: {
                    httpErrorCode: 403,
                    message: "Access denied: Token missing or invalid"
                }
            });
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            error: {
                httpErrorCode: 500,
                message: err.message
            }
        });
    }
};
