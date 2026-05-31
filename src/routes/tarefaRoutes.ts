import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  listarTarefas,
  listarTarefa,
  criarTarefa,
  editarTarefa,
  deletarTarefa,
} from "../controllers/tarefaController";

const router = Router();

router.get("/", auth, listarTarefas);
router.get("/:id", auth, listarTarefa);
router.post("/", auth, criarTarefa);
router.put("/:id", auth, editarTarefa);
router.delete("/:id", auth, deletarTarefa);

export default router;
