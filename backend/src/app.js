import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const server = createServer(app);

app.set("port", (process.env.PORT || 8080));
app.use(cors());

const start = async () => {
  const connectionDb = await mongoose.connect(process.env.ATLASDB_URL)
  console.log(`Mongo connected DB host: ${connectionDb.connection.host}`)
  server.listen(app.get("port"), () => {
    console.log("Listening to server");
  });
}

start();