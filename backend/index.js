const express = require("express");
const getDbConnect = require("./configuration/DbConnect");
const app = express();
var cors = require("cors");

const fileUploader = require("express-fileupload");
require("dotenv").config();
const userRoute = require("./routes/User");
const profileRoute = require("./routes/Profile");
const jobRoute = require("./routes/Job");
const applicationRoute=require("./routes/Application")
// before use the cookie-parser we need to import it
const cookieParser = require("cookie-parser");
const getCloudinaryConnect = require("./configuration/cloudinaryConnect");
// connect with db
getDbConnect();

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(` I am running on the port number ${PORT}`);
});


console.log(process.env.ORIGIN);
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// if you donot use this you cannot parse the json data which pass from req.body

app.use(express.json());

/* If we want to get the token from the req.header or req.cookies so 
 we  need to import the app.use(cookieParser());
*/
app.use(cookieParser());

// so finally we upload our profile image job image and resume in cloudinary so make sure we have to import it basic configuration
app.use(
  fileUploader({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// finally stabilished connection with cloudinary
getCloudinaryConnect();

// desire initial path
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// for demo for checking our application
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    Message: "I am running on apply seeker side ",
  });
});
