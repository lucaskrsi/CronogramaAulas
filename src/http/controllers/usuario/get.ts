import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { makeUsuarioRepository } from "../../../repositories/factory/makeUsuarioRepository";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const usuarioRepository = makeUsuarioRepository();
        const usuario = await usuarioRepository.get(id);
        res.status(200).json({
            data: {
                id: usuario.getId(),
                nome: usuario.getNome(),
                email: usuario.getEmail(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}