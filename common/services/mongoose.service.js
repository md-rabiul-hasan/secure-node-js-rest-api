const mongoose = require('mongoose');

const options = {
    autoIndex         : false,   // Don't build indexes
    useNewUrlParser   : true,    // all other approaches are now deprecated by MongoDB:
    useUnifiedTopology: true
    
};


const connectWithRetry = () => {
    console.log("Mongo DB connection with retry");
    mongoose.connect("mongodb://localhost:27017/secure-rest-api", options)
        .then( () => {
            console.log("MongoDB is connected");
        })
        .catch( err => {
            console.log(err);
            console.log('MongoDB connection is unsuccessful, retry after 5 seconds');
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry(); // call db connection

exports.mongoose = mongoose;