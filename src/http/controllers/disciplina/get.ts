import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const disciplinaRepository = makeDisciplinaRepository();
        const disciplina = await disciplinaRepository.get(id);
        res.status(200).json({
            data: {
                id: disciplina.getId(),
                nome: disciplina.getNome(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}