import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaRepository } from "../../../repositories/factory/makeAulaRepository";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const aulaRepository = makeAulaRepository();
        const aulaId = await aulaRepository.delete(id);
        res.status(200).json({
            data: { aulaId: aulaId },
            message: 'Deletado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}