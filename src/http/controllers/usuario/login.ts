import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { makeUsuarioRepository } from "../../../repositories/factory/makeUsuarioRepository";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            email: z.string().email(),
            senha: z.string()
        });

        const { email, senha } = createBody.parse(req.body);
        const usuarioRepository = makeUsuarioRepository();
        const { token, usuario } = await usuarioRepository.executeAuthentication(email, senha);
        res.status(200).json({
            data: {
                token,
                usuario: {
                    id: usuario.getId(),
                    nome: usuario.getNome(),
                    email: usuario.getEmail(),
                }
            }
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}