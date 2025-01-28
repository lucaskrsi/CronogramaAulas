import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeTurmaGradeCurricularRepository } from "../../../repositories/factory/makeTurmaGradeCurricularRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const turmaGradeRepository = makeTurmaGradeCurricularRepository();
        const turmaGradeList = await turmaGradeRepository.getAll();
        let list = turmaGradeList.map(turmaGrade => {
            return {
                id: turmaGrade.getId(),
                ano: turmaGrade.getAno(),
                turma: {
                    id: turmaGrade.getTurma().getId(),
                    nome: turmaGrade.getTurma().getNome(),
                },
                gradeCurricular: {
                    id: turmaGrade.getGradeCurricular().getId(),
                    nome: turmaGrade.getGradeCurricular().getNome(),
                }
            };
        });
        res.status(200).json({
            data: {
                turmasGrades: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}