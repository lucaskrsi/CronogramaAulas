import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaProfessorRepository } from "../../../repositories/factory/makeDisciplinaProfessorRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const disciplinaProfessorRepository = makeDisciplinaProfessorRepository();
        const disciplinaProfessor = await disciplinaProfessorRepository.get(id);
        res.status(200).json({
            data: {
                id: disciplinaProfessor.getId(),
                disciplinaId: disciplinaProfessor.getDisciplina().getId(),
                professorId: disciplinaProfessor.getProfessor().getId(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}