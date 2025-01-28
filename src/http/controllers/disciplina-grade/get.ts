import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaGradeCurricularRepository } from "../../../repositories/factory/makeDisciplinaGradeCurricularRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const disciplinaGradeRepository = makeDisciplinaGradeCurricularRepository();
        const disciplinaGrade = await disciplinaGradeRepository.get(id);
        res.status(200).json({
            data: {
                id: disciplinaGrade.getId(),
                cargaHoraria: disciplinaGrade.getCargaHoraria(),
                disciplina: {
                    id: disciplinaGrade.getDisciplina().getId(),
                    nome: disciplinaGrade.getDisciplina().getNome(),
                },
                gradeCurricular: {
                    id: disciplinaGrade.getGradeCurricular().getId(),
                    nome: disciplinaGrade.getGradeCurricular().getNome(),
                }
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}