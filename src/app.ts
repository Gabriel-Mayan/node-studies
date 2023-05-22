import cors from "cors";
import express from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);
app.use(cors({
	origin: true,
	methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"]
}));

export { app }
