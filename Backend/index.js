import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import startupRoute from "./routes/startup.route.js";
import opportunityRoute from "./routes/opportunity.route.js";
import applicationRoute from "./routes/application.route.js";
import chatbotRoute from "./routes/chatbot.route.js";

// Load environment variables first
dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5174"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

//api's
app.use("/api/user", userRoute);
app.use("/api/startup", startupRoute);
app.use("/api/opportunity", opportunityRoute);
app.use("/api/application", applicationRoute);
app.use("/api/chatbot", chatbotRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Startup Connect Server is running on port ${PORT}`);
});