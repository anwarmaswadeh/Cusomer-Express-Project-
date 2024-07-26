import { customErrorHandler, DefaultErrorHandler } from "./Middleware/ErrorHandler.js"
import customerRouter from "./routes/customer.js"
import dataSource from "./db/dbConfig.js"
import { Express } from "express"
import express from 'express'
import 'dotenv/config'

const app: Express = express();
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use("/customers", customerRouter)

dataSource.initialize()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("Failed to connect to DB" + err);
    })

app.use(customErrorHandler)
app.use(DefaultErrorHandler)

app.listen(PORT, () => {
    console.log("Port is running on port: " + PORT);
});

export default app;
