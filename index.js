const express = require("express");
const app = express();

const PORT = 3000;

app.listen( PORT, function(){
    console.log('Your app is listening http://localhost:%s', PORT);
});