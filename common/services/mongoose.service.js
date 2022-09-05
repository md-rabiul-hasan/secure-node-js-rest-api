const mongoose = require('mongoose');

const options = {
    autoIndex         : false,   // Don't build indexes
    poolSize          : 10,      // Maintain up to 10 socket connections
    bufferMaxEntries  : 0,       // If not connected, return errors immediately rather than waiting for reconnect
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
            console.log('MongoDB connection is unsuccessful, retry after 5 seconds');
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry(); // call db connection

exports.mongoose = mongoose;