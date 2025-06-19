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
exports.userServices = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, 10);
    const newUser = new user_model_1.UserModel(Object.assign(Object.assign({}, payload), { password: hashedPassword }));
    return newUser.save();
});
const allUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.UserModel.find();
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.UserModel.findById(id);
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        payload.password = yield bcryptjs_1.default.hash(payload.password, 10);
    }
    const updatedUser = yield user_model_1.UserModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedUser;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.UserModel.findByIdAndDelete(id);
});
exports.userServices = {
    createUser,
    allUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
