import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaGradeCurricularRepository } from "../../../repositories/factory/makeDisciplinaGradeCurricularRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const disciplinaGradeRepository = makeDisciplinaGradeCurricularRepository();
        const disciplinaGradeList = await disciplinaGradeRepository.getAll();
        let list = disciplinaGradeList.map(disciplinaGrade => {
            return {
                id: disciplinaGrade.getId(),
                cargaHoraria: disciplinaGrade.getCargaHoraria(),
                disciplina: {
                    id: disciplinaGrade.getDisciplina().getId(),
                    nome: disciplinaGrade.getDisciplina().getNome(),
                },
                gradeCurricular: {
                    id: disciplinaGrade.getGradeCurricular().getId(),
                    nome: disciplinaGrade.getGradeCurricular().getNome(),
                },
            };
        });
        res.status(200).json({
            data: {
                disciplinasGrades: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}