const AdminUser = require("../models/AdminUser");
const createToken = require("../helpers/createToken");
const cookieParser = require("cookie-parser");
const adminController = {
    login: async (req, res) => {
        try {
            let { email, password } = req.body;
            let user = await AdminUser.login(email, password);
            let token = createToken(user._id);
            res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 days
            res.status(200).json({ message: "Login successful", status: res.statusCode, user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    register: async (req, res) => {
        try {
            let { name, email, password } = req.body;
            let user = await AdminUser.register(name, email, password);
            let token = createToken(user._id);
            res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 }); // 30 days
            res.status(201).json({ message: "User created successfully", user, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    logout: async (req, res) => {
        try {
            res.cookie("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 0
            });
            return res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = adminController;
