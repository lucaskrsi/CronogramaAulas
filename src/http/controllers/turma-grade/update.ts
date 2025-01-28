import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeGradeCurricularRepository } from "../../../repositories/factory/makeGradeCurricularRepository";
import { makeTurmaRepository } from "../../../repositories/factory/makeTurmaRepository";
import { makeTurmaGradeCurricularRepository } from "../../../repositories/factory/makeTurmaGradeCurricularRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            ano: z.string(),
            turmaId: z.string().max(36),
            gradeCurricularId: z.string().max(36)
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { ano, turmaId, gradeCurricularId } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const turmaGradeRepository = makeTurmaGradeCurricularRepository();
        const gradeCurricularRepository = makeGradeCurricularRepository();
        const turmaRepository = makeTurmaRepository();

        const grade = await gradeCurricularRepository.get(gradeCurricularId);
        const turma = await turmaRepository.get(turmaId);

        const turmaGrade = await turmaGradeRepository.update(id, ano, turma, grade);
        res.status(200).json({
            data: { turmaGradeId: turmaGrade.getId() },
            message: 'Atualizado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}