import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeTurmaRepository } from "../../../repositories/factory/makeTurmaRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const turmaRepository = makeTurmaRepository();
        const turmaList = await turmaRepository.getAll();
        let list = turmaList.map(turma => {
            return {
                id: turma.getId(),
                nome: turma.getNome(),
            };
        });
        res.status(200).json({
            data: {
                turmas: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}