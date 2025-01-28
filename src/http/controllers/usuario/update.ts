import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { makeUsuarioRepository } from "../../../repositories/factory/makeUsuarioRepository";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            nome: z.optional(z.string().max(80)),
            email: z.optional(z.string().email()),
            senha: z.optional(z.string()),
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { nome, email, senha } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const usuarioRepository = makeUsuarioRepository();
        const usuario = await usuarioRepository.update(id, nome, email, senha);
        res.status(200).json({
            data: { usuarioId: usuario.getId() },
            message: 'Atualizado com sucesso!',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}