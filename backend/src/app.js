import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import interviewRoutes from './routes/interview.routes.js'
import profileRoutes from "./routes/profile.routes.js";
import companyRoutes from "./routes/company.routes.js";

const app = express();

// basic configurations
app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))
app.use("/api/v1/auth", authRoutes)
app.use("/api/interview",interviewRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/company", companyRoutes)

// cors configuration
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(",") || "http://localhost:5137",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization",]
}))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app;