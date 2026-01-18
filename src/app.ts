import express, { Application, Request, Response } from "express";
import { sendResponse } from "./utils/response";
import { postRouter } from "./modules/post/post.router";
import morgan from "morgan";
import { accessLogStream } from "./middleware/logger";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app: Application = express();
app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));

//better auth
app.all("/api/auth/*splat", toNodeHandler(auth));

//post
app.use("/api/v1/post", postRouter);

app.get("/", (req: Request, res: Response) => {
  return sendResponse(res, 200, true, "Hello from Papertrail");
});

export default app;
