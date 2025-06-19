"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_validation_1 = require("../validations/user.validation");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post('/create-user', (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.userController.createUser);
router.get('/', user_controller_1.userController.allUser);
router.get('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.getUserValidationSchema), user_controller_1.userController.getSingleUser);
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserValidationSchema), user_controller_1.userController.updateUser);
router.delete('/:id', (0, validateRequest_1.default)(user_validation_1.UserValidation.getUserValidationSchema), user_controller_1.userController.deleteUser);
exports.userRoutes = router;
