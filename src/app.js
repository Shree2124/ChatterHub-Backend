import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    })
);

// ⁡⁢⁣⁢+⁡ configuration of data: -

// if data is comming as a json
app.use(
    express.json({
        // Middleware
        limit: "16kb",
    })
);

// if data is comming from URL
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// if pdf is come or some comming like public accests:-
app.use(express.static("public"));

// to perform CRUD operation on cookies:-
app.use(cookieParser());

// ⁡⁢⁣⁢+⁡ routes import
import userRouter from "./routes/user.routes.js";

// routes declaration
app.use("/v1/api/users", userRouter);
// url: -http://localhost:8000/api/v1/users/${route}

export { app };
