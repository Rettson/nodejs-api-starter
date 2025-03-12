import { Router } from "express";
import UserController from '#resources/user/user.controller.js';
import ValidationMiddleware from "#middleware/validation.middleware.js";
import Validate from '#resources/user/user.validation.js';
import Authenticated from "#middleware/authenticated.middleware.js";

const router = Router();

router.post('/users', ValidationMiddleware(Validate.register), UserController.register);

router.post('/users/login', ValidationMiddleware(Validate.login), UserController.login);

router.get('/auth/user', Authenticated, UserController.user);

export default router;