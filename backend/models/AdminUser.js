const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const AdminUserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
}, { timestamps: true });

AdminUserSchema.statics.register = async function (name, email, password) {
    let userExist = await this.findOne({ email });
    if (userExist) {
        throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await this.create({ name, email, password: hashPassword });
    return newUser;
}

AdminUserSchema.statics.login = async function (email, password) {
    let user = await this.findOne({ email });
    if (!user) {
        throw new Error("User not exists");
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
        throw new Error("Invalid password");
    }
    return user;
}


module.exports = mongoose.model("AdminUser", AdminUserSchema);
