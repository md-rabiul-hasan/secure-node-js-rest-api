const express = require("express");
const app = express();
const UserRouter = require('./router/user.route');
// const authRouter = require('./auth/auth.routes');

const PORT = 3000;

app.use(express.json());
app.use(UserRouter);
// app.use(authRouter);

app.listen( PORT, function(){
    console.log('Your app is listening http://localhost:%s', PORT);
});