import jwt from "jsonwebtoken";
function generateToken(payload) {
    return jwt.sign({ payload }, String(process.env.JWT_SECRET_KEY), {
        expiresIn: "1h",
    });
}
export { generateToken };
