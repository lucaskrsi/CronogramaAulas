import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaProfessorRepository } from "../../../repositories/factory/makeDisciplinaProfessorRepository";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const disciplinaProfessorRepository = makeDisciplinaProfessorRepository();
        const disciplinaProfessorId = await disciplinaProfessorRepository.delete(id);
        res.status(200).json({
            data: { disciplinaProfessorId: disciplinaProfessorId },
            message: 'Deletado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}