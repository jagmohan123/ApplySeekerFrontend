const mongoose = require("mongoose");
require("dotenv").config();

function getDbConnect() {
  mongoose
    .connect(process.env.DATABASE_URL, {
      // useNewUrlParser: true,
      //   useUnifiedTopology:true,
    })
    .then(() => {
      console.log("DataBase connection done ");
    })
    .catch((error) => {
      console.log("DB connection failed due to ", error);
      console.log(error.message);
      process.exit(1);
    });
}

module.exports = getDbConnect;
