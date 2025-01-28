import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeAulaDisponibilidadeRepository } from "../../../repositories/factory/makeAulaDisponibilidadeRepository";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const aulaDisponibilidadeRepository = makeAulaDisponibilidadeRepository();
        const aulaDisponibilidadeId = await aulaDisponibilidadeRepository.delete(id);
        res.status(200).json({
            data: { aulaDisponibilidadeId: aulaDisponibilidadeId },
            message: 'Deletado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}