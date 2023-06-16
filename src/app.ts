import cors from "cors";
import express from "express";
import router from "routes";

const app = express();

app.use(express.json());
app.use(router);
app.use(cors({
  origin: true,
  methods: ["GET", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

export default app;
