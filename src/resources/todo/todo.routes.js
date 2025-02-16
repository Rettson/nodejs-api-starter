import { Router } from "express";
import TodoController from "#resources/todo/todo.controller.js";
import ValidationMiddleware from "#middleware/validation.middleware.js";
import Validate from '#resources/todo/todo.validation.js';
import Authenticated from "#middleware/authenticated.middleware.js";

const router = Router();

router.get('/todos', Authenticated, TodoController.index);

router.post('/todos', ValidationMiddleware(Validate.create), TodoController.store);

export default router;