import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const disciplinaRepository = makeDisciplinaRepository();
        const disciplinaId = await disciplinaRepository.delete(id);
        res.status(200).json({
            data: { disciplinaId: disciplinaId },
            message: 'Deletado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}