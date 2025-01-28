import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeGradeCurricularRepository } from "../../../repositories/factory/makeGradeCurricularRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const gradeCurricularRepository = makeGradeCurricularRepository();
        const gradeCurricular = await gradeCurricularRepository.get(id);
        res.status(200).json({
            data: {
                id: gradeCurricular.getId(),
                nome: gradeCurricular.getNome(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}