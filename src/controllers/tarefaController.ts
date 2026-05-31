import prisma from "../prisma";
import { Request, Response, NextFunction } from "express";
import {
  atualizarTarefaSchema,
  criarTarefaSchema,
} from "../schemas/tarefaSchema";

export async function listarTarefas(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tarefa = await prisma.tarefa.findMany();
    res.json(tarefa);
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
    const id: number = Number(req.params.id);
    const tarefa = await prisma.tarefa.findUnique({ where: { id } });

    if (!tarefa) {
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
    const result = criarTarefaSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ erro: result.error.flatten().fieldErrors });
    }

    const { titulo } = result.data;

    if (!titulo) {
      return res.status(400).json({ erro: "Not enough data to create task!" });
    }

    const newTask = await prisma.tarefa.create({
      data: { titulo },
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
    const id: number = Number(req.params.id);
    const result = atualizarTarefaSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ erro: result.error.flatten().fieldErrors });
    }

    const { titulo, feito } = result.data;

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
    const id: number = Number(req.params.id);

    await prisma.tarefa.delete({ where: { id } });

    return res.json({ message: "User deleted sucessfully!" });
  } catch (error) {
    next(error);
  }
}
