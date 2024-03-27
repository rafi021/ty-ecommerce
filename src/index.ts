import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorMiddleware } from "./middlewares/errors";
const app:Express = express();

// config middleware
app.use(express.json());

app.use('/api/v1',rootRouter)


app.use(errorMiddleware);

app.listen(PORT||3000, () => {
  console.log(`App listening on port ${PORT}`);
});