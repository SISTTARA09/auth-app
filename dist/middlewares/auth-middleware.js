import jwt from "jsonwebtoken";
function checkLogin(req, res, next) {
    var _a;
    const token = req.cookies.jwt;
    if (!token)
        return res.redirect(401, "/auth/login");
    const isValid = jwt.verify(token, String(process.env.JWT_SECRET_KEY));
    if (!isValid)
        return res.redirect(401, "/auth/login");
    // if token is valid
    res.authenticated = true;
    res.locals.user = (_a = jwt.decode(token)) === null || _a === void 0 ? void 0 : _a.payload;
    next();
}
export { checkLogin };
