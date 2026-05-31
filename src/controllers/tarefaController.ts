import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

export async function listarTarefas(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const usuarioId = (req as any).usuario.id;

    const tarefas = await prisma.tarefa.findMany({
      where: { usuarioId },
    });
    res.json(tarefas);
  } catch (error) {
    next(error);
  }
}

export async function listarTarefa(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const usuarioId = (req as any).usuario.id;

    const tarefa = await prisma.tarefa.findUnique({ where: { id } });

    if (!tarefa || tarefa.usuarioId !== usuarioId) {
      return res.status(404).json({ erro: "Task not found!" });
    }

    res.json(tarefa);
  } catch (error) {
    next(error);
  }
}

export async function criarTarefa(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const usuarioId = (req as any).usuario.id;
    const { titulo } = req.body;

    if (!titulo) {
      return res.status(400).json({ erro: "Not enough data to create task!" });
    }

    const newTask = await prisma.tarefa.create({
      data: { titulo, usuarioId },
    });

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
}

export async function editarTarefa(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const usuarioId = (req as any).usuario.id;
    const { titulo, feito } = req.body;

    const tarefa = await prisma.tarefa.findUnique({ where: { id } });

    if (!tarefa || tarefa.usuarioId !== usuarioId) {
      return res.status(404).json({ erro: "Task not found!" });
    }

    const task = await prisma.tarefa.update({
      where: { id },
      data: { titulo, feito },
    });

    res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function deletarTarefa(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);
    const usuarioId = (req as any).usuario.id;

    const tarefa = await prisma.tarefa.findUnique({ where: { id } });

    if (!tarefa || tarefa.usuarioId !== usuarioId) {
      return res.status(404).json({ erro: "Task not found!" });
    }

    await prisma.tarefa.delete({ where: { id } });

    return res.json({ message: "Task deleted successfully!" });
  } catch (error) {
    next(error);
  }
}
