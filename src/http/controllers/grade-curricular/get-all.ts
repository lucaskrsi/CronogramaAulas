import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeGradeCurricularRepository } from "../../../repositories/factory/makeGradeCurricularRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const gradeCurricularRepository = makeGradeCurricularRepository();
        const gradeCurricularList = await gradeCurricularRepository.getAll();
        let list = gradeCurricularList.map(gradeCurricular => {
            return {
                id: gradeCurricular.getId(),
                nome: gradeCurricular.getNome(),
            };
        });
        res.status(200).json({
            data: {
                gradesCurriculares: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}