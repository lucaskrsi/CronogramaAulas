"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const HttpException_1 = require("../../exceptions/HttpException");
const client_1 = require("../../database/config/client");
const Usuario_1 = require("../../models/Usuario");
const bcrypt_1 = require("bcrypt");
const TokenUsuario_1 = require("../../utils/TokenUsuario");
class UsuarioRepository {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioPrisma = yield client_1.prisma.usuario.findUnique({
                where: {
                    id: id,
                },
            });
            if (!usuarioPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Usuario não encontrado");
            }
            const usuario = new Usuario_1.Usuario(usuarioPrisma.nome, usuarioPrisma.email, usuarioPrisma.senha, usuarioPrisma.id);
            return usuario;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioPrisma = yield client_1.prisma.usuario.findUnique({
                where: {
                    email: email,
                },
            });
            if (!usuarioPrisma) {
                throw HttpException_1.HttpException.UnauthorizedError("Email ou senha incorretos");
            }
            const usuario = new Usuario_1.Usuario(usuarioPrisma.nome, usuarioPrisma.email, usuarioPrisma.senha, usuarioPrisma.id);
            return usuario;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuariosPrisma = yield client_1.prisma.usuario.findMany();
            Usuario_1.Usuario.usuarioList = usuariosPrisma.map((usuario) => {
                return new Usuario_1.Usuario(usuario.nome, usuario.email, usuario.senha, usuario.id);
            });
            return Usuario_1.Usuario.usuarioList;
        });
    }
    create(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarioAlreadyExists = yield client_1.prisma.usuario.findUnique({
                where: {
                    email: usuario.getEmail(),
                },
            });
            if (usuarioAlreadyExists) {
                throw HttpException_1.HttpException.ConflictError("Usuario já existe");
            }
            let usuarioPrisma = yield client_1.prisma.usuario.create({
                data: {
                    nome: usuario.getNome(),
                    email: usuario.getEmail(),
                    senha: (0, bcrypt_1.hashSync)(usuario.getSenha(), 10),
                },
            });
            usuario.setId(usuarioPrisma.id);
            return usuario;
        });
    }
    update(id, nome, email, senha, role) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarioPrisma = yield this.get(id);
            if (!usuarioPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Usuario não encontrado");
            }
            let usuario = yield client_1.prisma.usuario.update({
                where: {
                    id: usuarioPrisma.getId(),
                },
                data: {
                    nome: (typeof nome == "string") ? nome : usuarioPrisma.getNome(),
                    email: (typeof email == "string") ? email : usuarioPrisma.getEmail(),
                    senha: (typeof senha == "string" && senha.trim() != "") ? (0, bcrypt_1.hashSync)(senha, 10) : usuarioPrisma.getSenha(),
                },
            });
            usuarioPrisma.setNome(usuario.nome);
            usuarioPrisma.setEmail(usuario.email);
            usuarioPrisma.setSenha(usuario.senha);
            return usuarioPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarioPrisma = yield this.get(id);
            if (!usuarioPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Usuario não encontrado");
            }
            let usuario = yield client_1.prisma.usuario.delete({
                where: {
                    id: usuarioPrisma.getId(),
                }
            });
            return usuario.id.toString();
        });
    }
    executeAuthentication(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.getByEmail(email);
            if (!usuario) {
                throw HttpException_1.HttpException.UnauthorizedError("Email ou senha incorretos");
            }
            const senhaMatch = (0, bcrypt_1.compareSync)(senha, usuario.getSenha());
            if (!senhaMatch) {
                throw HttpException_1.HttpException.UnauthorizedError("Email ou senha incorretos");
            }
            const token = yield TokenUsuario_1.TokenUsuario.generateToken(usuario.getId());
            return { token, usuario };
        });
    }
}
exports.UsuarioRepository = UsuarioRepository;
