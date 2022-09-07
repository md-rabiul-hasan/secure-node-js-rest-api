const express = require("express");
const authRouter = express.Router();
const AuthController = require("./controllers/auth.controllers");
const VerifyUserMiddleware = require('./middleware/verify.user.middleware');

authRouter.post('/auth/login', [
    VerifyUserMiddleware.hasAuthValidFields,
    VerifyUserMiddleware.isPasswordAndUserMatch,
    AuthController.login
]);

authRouter.post('/auth/refresh', [
    AuthController.login
]);

module.exports = authRouter;