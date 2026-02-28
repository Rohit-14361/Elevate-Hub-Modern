const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const http = require('http');

dotenv.config();
const PORT = process.env.PORT;

//database connect
database.connect();
//middlewares
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://elevate-hub-modern-frontend.onrender.com","http://localhost:5173","http://localhost:3000"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
    limits: { 
      fileSize: 500 * 1024 * 1024, // 500MB limit
      abortOnLimit: false, // Don't abort, just warn
    },
    createParentPath: true,
  })
);
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//def route

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

const server = http.createServer(app);

// Increase timeout for large file uploads
server.timeout = 300000; // 5 minutes timeout

server.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
