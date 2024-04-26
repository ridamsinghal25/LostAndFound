import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import userRouter from "./routers/user.route.js";
import itemRouter from "./routers/item.route.js";

// route declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/items", itemRouter);

export { app };
