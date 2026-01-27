import express, { Application, Request, Response } from "express";
import { sendResponse } from "./utils/response";
import { postRouter } from "./modules/post/post.router";
import morgan from "morgan";
import { accessLogStream } from "./middleware/logger";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { config } from "./config/config";
import { commentRoute } from "./modules/comment/comment.router";

const app: Application = express();
app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(
  cors({
    origin: config.appUrl,
    credentials: true,
  }),
);
//better auth
app.all("/api/auth/*splat", toNodeHandler(auth));

//post
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comment", commentRoute);

app.get("/", (req: Request, res: Response) => {
  return sendResponse(res, 200, true, "Hello from Papertrail");
});

export default app;
