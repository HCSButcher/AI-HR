import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./mongodb";
import userRoutes from "./routes/user";
import applicantRoutes from "./routes/applicant";
import { inngest } from "./lib/inngest";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect().then(() => console.log("MongoDB connected"));

// Inngest endpoint
app.post("/api/events", express.json(), inngest.createNextJsHandler());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/applicants", applicantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
