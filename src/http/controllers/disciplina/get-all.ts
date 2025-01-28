import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeDisciplinaRepository } from "../../../repositories/factory/makeDisciplinaRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const disciplinaRepository = makeDisciplinaRepository();
        const disciplinaList = await disciplinaRepository.getAll();
        let list = disciplinaList.map(disciplina => {
            return {
                id: disciplina.getId(),
                nome: disciplina.getNome(),
            };
        });
        res.status(200).json({
            data: {
                disciplinas: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}