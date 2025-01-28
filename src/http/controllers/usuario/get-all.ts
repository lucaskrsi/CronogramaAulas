import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { makeUsuarioRepository } from "../../../repositories/factory/makeUsuarioRepository";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const usuarioRepository = makeUsuarioRepository();
        const usuarioList = await usuarioRepository.getAll();
        let list = usuarioList.map(usuario => {
            return {
                id: usuario.getId(),
                nome: usuario.getNome(),
                email: usuario.getEmail(),
            };
        });
        res.status(200).json({
            data: {
                users: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}