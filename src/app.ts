import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://front-tarefas-chi.vercel.app"],
  }),
);
app.use(express.json());
app.use("/tarefas", tarefaRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

export default app;
