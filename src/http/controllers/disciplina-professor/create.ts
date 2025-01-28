import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaProfessorRepository } from "../../../repositories/factory/makeDisciplinaProfessorRepository";
import { DisciplinaProfessor } from "../../../models/DisciplinaProfessor";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            disciplinaId: z.string().max(36),
            professorId: z.string().max(36),
        });

        const { disciplinaId, professorId } = createBody.parse(req.body);

        const disciplinaProfessorRepository = makeDisciplinaProfessorRepository();
        const disciplinaRepository = makeDisciplinaRepository();
        const professorRepository = makeProfessorRepository();

        const disciplina = await disciplinaRepository.get(disciplinaId);
        const professor = await professorRepository.get(professorId);

        const disciplinaProfessor = await disciplinaProfessorRepository.create(new DisciplinaProfessor(disciplina, professor));

        res.status(201).json({
            data: { 
                disciplinaProfessorId: disciplinaProfessor.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}