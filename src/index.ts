import express, { json, urlencoded } from "express";
import config from "./config";
import AuthRouter from "./routes/authentication";

const app = express();

const port = config.port;

app.use(urlencoded({ extended: false }));
app.use(json({ limit: "10mb" }));

app.use('/api/v1/auth', AuthRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Application running at port: ${port}`);
});
