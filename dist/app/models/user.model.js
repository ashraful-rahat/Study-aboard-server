"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    photo: {
        type: String,
        default: null,
    },
    phone: {
        type: String,
        default: null,
    },
    address: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
