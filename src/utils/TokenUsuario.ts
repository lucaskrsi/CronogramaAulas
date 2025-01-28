// @ts-ignore
import { HttpException } from "../exceptions/HttpException";
import { sign, verify } from "jsonwebtoken";
import dayjs from "dayjs";
import { z } from "zod";
import { makeUsuarioRepository } from "../repositories/factory/makeUsuarioRepository";
export class TokenUsuario {

    public static async generateToken(userId: string) : Promise<string> {
        return sign({}, process.env.JWT_KEY, {
            subject: userId,
            expiresIn: "18000000s"
        });
    }

    public static async validateToken(token: string) : Promise<boolean> {
        const jwtPayload = verify(token, process.env.JWT_KEY);

        const createPayload = z.object({
            sub: z.string().max(36),
            exp: z.number()
        });

        const { sub, exp } = createPayload.parse(jwtPayload);

        const userRepository = makeUsuarioRepository();
        const userPrisma = await userRepository.get(sub);

        if (!userPrisma) {
            throw HttpException.UnauthorizedError("Token inválido");
        };

        const tokenExpired = this.checkTokenExpired(exp);

        if (tokenExpired) {
            throw HttpException.UnauthorizedError("Token expirado");
        }

        return true;

    }

    public static checkTokenExpired(expiresIn: number): boolean {
        const tokenExpired = dayjs().isAfter(dayjs.unix(expiresIn));
        if (tokenExpired) {
            return true;
        }
        return false;
    }
}