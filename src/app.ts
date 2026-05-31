import express from "express";
import tarefaRoutes from "./routes/tarefaRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/tarefas", tarefaRoutes);
app.use(errorHandler);

export default app;
