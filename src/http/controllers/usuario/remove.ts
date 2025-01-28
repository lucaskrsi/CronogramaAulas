import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { makeUsuarioRepository } from "../../../repositories/factory/makeUsuarioRepository";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const usuarioRepository = makeUsuarioRepository();
        const usuarioId = await usuarioRepository.delete(id);
        res.status(200).json({
            data: { usuarioId: usuarioId },
            message: 'Deletado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}