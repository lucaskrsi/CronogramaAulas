import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaProfessorRepository } from "../../../repositories/factory/makeDisciplinaProfessorRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const disciplinaProfessorRepository = makeDisciplinaProfessorRepository();
        const disciplinaProfessorList = await disciplinaProfessorRepository.getAll();
        let list = disciplinaProfessorList.map(disciplinaProfessor => {
            return {
                id: disciplinaProfessor.getId(),
                disciplinaId: disciplinaProfessor.getDisciplina().getId(),
                professorId: disciplinaProfessor.getProfessor().getId(),
            };
        });
        res.status(200).json({
            data: {
                disciplinasProfessores: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}