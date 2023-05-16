import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { router } from "./routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);
app.use(cors({
	origin: true,
	methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"]
}));

const port = process.env.PORT as string || 8080;

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
