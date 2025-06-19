"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/routes/user.route");
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routing
app.use('/api/v1/users', user_route_1.userRoutes);
// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: '🎉 Welcome to Study Abroad API!',
    });
});
exports.default = app;
