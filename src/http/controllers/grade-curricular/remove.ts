import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeGradeCurricularRepository } from "../../../repositories/factory/makeGradeCurricularRepository";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const gradeCurricularRepository = makeGradeCurricularRepository();
        const gradeCurricularId = await gradeCurricularRepository.delete(id);
        res.status(200).json({
            data: { gradeCurricularId: gradeCurricularId },
            message: 'Deletado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}