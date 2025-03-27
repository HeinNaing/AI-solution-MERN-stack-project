const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//third party routes
const blogsRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");
const AuthMiddleware = require("./middlewares/AuthMiddleware");

const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json()); // for parsing application/json
app.use("/api/v1/blogs", blogsRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/contacts", AuthMiddleware,  contactRoutes);
app.use("/api/v1/admin", adminRoutes);



app.use("/set-cookies", (req, res) => {
    res.cookie("user", "aungaung", { httpOnly: true, });
    return res.send("cookie set");
});
app.use("/get-cookies", (req, res) => {
    let cookies = req.cookies;
    return res.json({ cookies });
});

app.use("/clear-cookies", (req, res) => {
    res.clearCookie("user", { httpOnly: true, });
    return res.send("cookie cleared");
});

module.exports = app;
