import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeTurmaRepository } from "../../../repositories/factory/makeTurmaRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const turmaRepository = makeTurmaRepository();
        const turma = await turmaRepository.get(id);
        res.status(200).json({
            data: {
                id: turma.getId(),
                nome: turma.getNome(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}