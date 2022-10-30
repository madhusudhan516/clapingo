const mongoose = require("mongoose");

//Establish connection with Mongo Db
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to mongoose...`);
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.connection.on('connected', () => {
    console.log("Mongoose connected to db...");
});

mongoose.connection.on("error", (error) => {
    console.log(error.message);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

