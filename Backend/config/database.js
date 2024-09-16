const mongoose = require('mongoose');

const dbUrl = `${process.env.MONGO_URL}${process.env.DB_NAME}`
console.log("DBURL--->",dbUrl);

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(dbUrl, {
            ssl: true,  // Add this line to enforce SSL
  tlsInsecure: true // If you want to bypass SSL verification temporarily (not recommended for production)
        });
        console.log("MongoDB connected");
    }
    catch(error){
        console.log("Error While connecting to MongoDB");
        process.exit(1);
    }
}

module.exports = connectDB