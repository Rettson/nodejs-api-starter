import { Router } from "express";
import UserController from '#resources/user/user.controller.js';
import ValidationMiddleware from "#middleware/validation.middleware.js";
import Validate from '#resources/user/user.validation.js';

const router = Router();

router.post('/users', ValidationMiddleware(Validate.register), UserController.register);

router.post('/users/login', ValidationMiddleware(Validate.login), UserController.login);

export default router;