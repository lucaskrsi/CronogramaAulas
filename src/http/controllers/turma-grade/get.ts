import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeTurmaGradeCurricularRepository } from "../../../repositories/factory/makeTurmaGradeCurricularRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const turmaGradeRepository = makeTurmaGradeCurricularRepository();
        const turmaGrade = await turmaGradeRepository.get(id);
        res.status(200).json({
            data: {
                id: turmaGrade.getId(),
                ano: turmaGrade.getAno(),
                turma: {
                    id: turmaGrade.getTurma().getId(),
                    nome: turmaGrade.getTurma().getNome(),
                },
                gradeCurricular: {
                    id: turmaGrade.getGradeCurricular().getId(),
                    nome: turmaGrade.getGradeCurricular().getNome(),
                },
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}