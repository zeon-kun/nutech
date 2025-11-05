import express from "express";
import cors from "cors";
import "dotenv/config";
import mainRouter from "../routes/route.ts";
import path from "path";

/**
 * PORT option
 */
const PORT = process.env.PORT || 3010;

/**
 * UPLOAD DIR loc
 */
const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

/**
 * CORS options
 */
let allowedOrigins: string[] = ["*"];
let corsOptions: cors.CorsOptions = {};

if (process.env.ENVIRONMENT != "dev") {
  allowedOrigins = process.env.ALLOWED_ORIGINS!.split(",");
  corsOptions.origin = allowedOrigins;
}

/**
 * Configure Express Listener
 */

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../..", UPLOAD_DIR)));
app.use(mainRouter);

/**
 * Start
 */
app.listen(PORT, () => {
  console.log(`Rest App is running at port: ${PORT}`);
});
