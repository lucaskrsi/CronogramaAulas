import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeTurmaRepository } from "../../../repositories/factory/makeTurmaRepository";
import { Turma } from "../../../models/Turma";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            nome: z.string().max(100),
        });

        const { nome } = createBody.parse(req.body);

        const turmaRepository = makeTurmaRepository();

        const turma = await turmaRepository.create(new Turma(nome));

        res.status(201).json({
            data: { 
                turmaId: turma.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}