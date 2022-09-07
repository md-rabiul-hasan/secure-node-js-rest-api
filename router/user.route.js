const express = require("express");
const userRouter = express.Router();
const UserController = require('../controllers/user.controller');
const AuthRouter = require('./../auth/auth.routes');
const ValidationMiddleware = require("./../common/middleware/auth.validation.middleware");
const PermissionMiddleware = require("./../common/middleware/auth.permission.middleware");

const ADMIN = 2048;
const PAID  = 4;
const FREE  = 1;


userRouter.use(AuthRouter);

userRouter.post('/users', [
    UserController.insert
]);

userRouter.get('/users', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequire(PAID),
    UserController.list
]);

userRouter.get('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequire(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UserController.getById
]);

userRouter.patch('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequire(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UserController.patchById
]);

userRouter.delete('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequire(ADMIN),
    UserController.removeById
]);

module.exports = userRouter;