import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(201).json({
    success: true,
    data: "Hello from Papertrail!!!",
  });
});

export default app;
