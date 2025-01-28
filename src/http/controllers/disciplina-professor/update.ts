import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaProfessorRepository } from "../../../repositories/factory/makeDisciplinaProfessorRepository";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            disciplinaId: z.optional(z.string().max(36)),
            professorId: z.optional(z.string().max(36)),
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { disciplinaId, professorId } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const disciplinaProfessorRepository = makeDisciplinaProfessorRepository();
        const disciplinaRepository = makeDisciplinaRepository();
        const professorRepository = makeProfessorRepository();

        const disciplina = await disciplinaRepository.get(disciplinaId);
        const professor = await professorRepository.get(professorId);

        const disciplinaProfessor = await disciplinaProfessorRepository.update(id, disciplina, professor);
        res.status(200).json({
            data: { disciplinaProfessorId: disciplinaProfessor.getId() },
            message: 'Atualizado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}