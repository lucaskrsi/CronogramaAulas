import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { Usuario } from "../../../models/Usuario";
import { makeUsuarioRepository } from "../../../repositories/factory/makeUsuarioRepository";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            nome: z.string().max(80),
            email: z.string().email(),
            senha: z.string(),
        });

        const { nome, email, senha } = createBody.parse(req.body);
        
        const usuarioRepository = makeUsuarioRepository();

        const usuario = await usuarioRepository.create(new Usuario(nome, email, senha));
        res.status(201).json({
            data: { usuarioId: usuario.getId() },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}