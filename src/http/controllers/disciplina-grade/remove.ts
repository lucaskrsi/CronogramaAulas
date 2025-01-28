import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaGradeCurricularRepository } from "../../../repositories/factory/makeDisciplinaGradeCurricularRepository";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const disciplinaGradeRepository = makeDisciplinaGradeCurricularRepository();
        const disciplinaGradeId = await disciplinaGradeRepository.delete(id);
        res.status(200).json({
            data: { disciplinaGradeId: disciplinaGradeId },
            message: 'Deletado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}