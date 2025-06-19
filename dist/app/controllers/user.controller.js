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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const http_status_codes_1 = require("http-status-codes");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.createUser(req.body);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            status: 'success',
            message: 'User created successfully',
            data: result,
        });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                status: 'fail',
                message: 'Email already exists',
            });
            return;
        }
        next(error);
    }
});
const allUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.allUser();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: 'success',
            results: result.length,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_service_1.userServices.getSingleUser(id);
        if (!result) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'User not found',
            });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: 'success',
            data: result,
        });
    }
    catch (error) {
        if (error.name === 'CastError') {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                status: 'fail',
                message: 'Invalid user ID format',
            });
            return;
        }
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userData = req.body;
        const result = yield user_service_1.userServices.updateUser(id, userData);
        if (!result) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'User not found',
            });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: 'success',
            message: 'User updated successfully',
            data: result,
        });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
                status: 'fail',
                message: 'Email already exists',
            });
            return;
        }
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_service_1.userServices.deleteUser(id);
        if (!result) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                status: 'fail',
                message: 'User not found',
            });
            return;
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: 'success',
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
});
exports.userController = {
    createUser,
    allUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
