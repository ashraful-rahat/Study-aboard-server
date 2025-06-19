"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found - please check your email');
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Incorrect password - please try again');
    }
    const token = jsonwebtoken_1.default.sign({
        id: user._id,
        role: user.role,
    }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    return {
        accessToken: token,
        user: {
            id: user._id,
            name: user.name,
            role: user.role,
        },
    };
});
const registerUser = (name, email, password, age, photo) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.UserModel.findOne({ email });
    if (existingUser) {
        throw new Error('Email already registered');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = yield user_model_1.UserModel.create({
        name,
        email,
        password: hashedPassword,
        age,
        photo,
        role: 'user',
    });
    const token = jsonwebtoken_1.default.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return {
        accessToken: token,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
    };
});
exports.authService = {
    loginUser,
    registerUser,
};
