import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { TurmaGrade } from "../../../models/TurmaGrade";
import { GradeCurricular } from "../../../models/GradeCurricular";
import { makeGradeCurricularRepository } from "../../../repositories/factory/makeGradeCurricularRepository";
import { makeTurmaRepository } from "../../../repositories/factory/makeTurmaRepository";
import { makeTurmaGradeCurricularRepository } from "../../../repositories/factory/makeTurmaGradeCurricularRepository";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            ano: z.string(),
            turmaId: z.string().max(36),
            gradeCurricularId: z.string().max(36)
        });

        const { ano, turmaId, gradeCurricularId } = createBody.parse(req.body);

        const turmaGradeRepository = makeTurmaGradeCurricularRepository();
        const gradeCurricularRepository = makeGradeCurricularRepository();
        const turmaRepository = makeTurmaRepository();

        const grade = await gradeCurricularRepository.get(gradeCurricularId);
        const turma = await turmaRepository.get(turmaId);
        const turmaGrade = await turmaGradeRepository.create(new TurmaGrade(ano, turma, grade));

        res.status(201).json({
            data: { 
                turmaGradeId: turmaGrade.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}