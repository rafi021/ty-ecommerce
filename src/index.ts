import express, { Express, Request, Response } from "express";
const app:Express = express();

app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});