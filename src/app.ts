import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import indexRouter from "./routes/index";
import registerRouter from "./routes/register";
import loginRouter from "./routes/login";
import updateTableRouter from "./routes/update-table";
import logsRouter from "./routes/logs";
import deviceRouter from "./routes/device";

const app: Express = express();
const port: number = 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/update-table", updateTableRouter);
app.use("/get-logs", logsRouter);
app.use("/", deviceRouter);

app.listen(port, () => console.log(`Application is running on port ${port}`));

export default app;
