import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeTurmaRepository } from "../../../repositories/factory/makeTurmaRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            nome: z.optional(z.string().max(100)),
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { nome } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const turmaRepository = makeTurmaRepository();

        const turma = await turmaRepository.update(id, nome);
        res.status(200).json({
            data: { turmaId: turma.getId() },
            message: 'Atualizado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}