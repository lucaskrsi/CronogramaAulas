import { HttpException } from "../../exceptions/HttpException";
import { prisma } from "../../database/config/client";
import { Usuario } from "../../models/Usuario";
import { compareSync, hashSync } from "bcrypt";
import { IUsuarioRepository } from "../../repositories/interfaces/User.repository.interface";
import { TokenUsuario } from "../../utils/TokenUsuario";
import { IUsuario } from "../../models/interfaces/User.interface";

export class UsuarioRepository implements IUsuarioRepository {

    async get(id: string): Promise<IUsuario> {
        const usuarioPrisma = await prisma.usuario.findUnique({
            where: {
                id: id,
            },
        })

        if (!usuarioPrisma) {
            throw HttpException.NotFoundError("Usuario não encontrado");
        }

        const usuario = new Usuario(
            usuarioPrisma.nome,
            usuarioPrisma.email,
            usuarioPrisma.senha,
            usuarioPrisma.id
        );

        return usuario;
    }

    async getByEmail(email: string): Promise<IUsuario> {
        const usuarioPrisma = await prisma.usuario.findUnique({
            where: {
                email: email,
            },
        })

        if (!usuarioPrisma) {
            throw HttpException.UnauthorizedError("Email ou senha incorretos");
        }

        const usuario = new Usuario(
            usuarioPrisma.nome,
            usuarioPrisma.email,
            usuarioPrisma.senha,
            usuarioPrisma.id
        );

        return usuario;
    }

    async getAll(): Promise<IUsuario[]> {
        const usuariosPrisma = await prisma.usuario.findMany();
        Usuario.usuarioList = usuariosPrisma.map((usuario) => {
            return new Usuario(
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.id
            )
        });

        return Usuario.usuarioList;
    }

    async create(usuario: IUsuario): Promise<IUsuario> {
        let usuarioAlreadyExists = await prisma.usuario.findUnique({
            where: {
                email: usuario.getEmail(),
            },
        })

        if (usuarioAlreadyExists) {
            throw HttpException.ConflictError("Usuario já existe");
        }

        let usuarioPrisma = await prisma.usuario.create({
            data: {
                nome: usuario.getNome(),
                email: usuario.getEmail(),
                senha: hashSync(usuario.getSenha(), 10),
            },
        })

        usuario.setId(usuarioPrisma.id);
        return usuario;
    }

    async update(id: string, nome?: string, email?: string, senha?: string, role?: string): Promise<IUsuario> {
        let usuarioPrisma = await this.get(id);

        if (!usuarioPrisma) {
            throw HttpException.NotFoundError("Usuario não encontrado");
        }

        let usuario = await prisma.usuario.update({
            where: {
                id: usuarioPrisma.getId(),
            },
            data: {
                nome: (typeof nome == "string") ? nome : usuarioPrisma.getNome(),
                email: (typeof email == "string") ? email : usuarioPrisma.getEmail(),
                senha: (typeof senha == "string" && senha.trim() != "") ? hashSync(senha, 10) : usuarioPrisma.getSenha(),
            },
        })

        usuarioPrisma.setNome(usuario.nome);
        usuarioPrisma.setEmail(usuario.email);
        usuarioPrisma.setSenha(usuario.senha);
        return usuarioPrisma;
    }

    async delete(id: string): Promise<string> {
        let usuarioPrisma = await this.get(id);

        if (!usuarioPrisma) {
            throw HttpException.NotFoundError("Usuario não encontrado");
        }

        let usuario = await prisma.usuario.delete({
            where: {
                id: usuarioPrisma.getId(),
            }
        })

        return usuario.id.toString();
    }

    async executeAuthentication(email: string, senha: string) {
        const usuario = await this.getByEmail(email);

        if (!usuario) {
            throw HttpException.UnauthorizedError("Email ou senha incorretos");
        }

        const senhaMatch = compareSync(senha, usuario.getSenha());

        if (!senhaMatch) {
            throw HttpException.UnauthorizedError("Email ou senha incorretos");
        }

        const token = await TokenUsuario.generateToken(usuario.getId());

        return { token, usuario };
    }
}