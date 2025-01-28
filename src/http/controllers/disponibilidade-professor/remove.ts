import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisponibilidadeProfessorRepository } from "../../../repositories/factory/makeDisponibilidadeProfessorRepository.ts";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const disponibilidadeProfessorRepository = makeDisponibilidadeProfessorRepository();
        const disponibilidadeProfessorId = await disponibilidadeProfessorRepository.delete(id);
        res.status(200).json({
            data: { disponibilidadeProfessorId: disponibilidadeProfessorId },
            message: 'Deletado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}