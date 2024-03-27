import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
const app:Express = express();

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});

app.listen(PORT||3000, () => {
  console.log(`App listening on port ${PORT}`);
});