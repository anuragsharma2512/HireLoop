import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"

const app = express();
// const server = createServer(app);

// basic configurations
app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use("/api/v1/auth", authRoutes)

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