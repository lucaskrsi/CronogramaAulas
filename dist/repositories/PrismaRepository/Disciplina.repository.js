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
exports.DisciplinaRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const Disciplina_1 = require("../../models/Disciplina");
class DisciplinaRepository {
    create(disciplina) {
        return __awaiter(this, void 0, void 0, function* () {
            let disciplinaPrisma = yield client_1.prisma.disciplina.create({
                data: {
                    nome: disciplina.getNome(),
                },
            });
            disciplina.setId(disciplinaPrisma.id);
            return disciplina;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const disciplinaPrisma = yield client_1.prisma.disciplina.findFirst({
                where: {
                    id: id,
                },
            });
            if (!disciplinaPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disciplina não encontrada");
            }
            const disciplina = new Disciplina_1.Disciplina(disciplinaPrisma.nome, disciplinaPrisma.id);
            return disciplina;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const disciplinaPrisma = yield client_1.prisma.disciplina.findMany();
            Disciplina_1.Disciplina.disciplinaList = disciplinaPrisma.map((disciplina) => {
                return new Disciplina_1.Disciplina(disciplina.nome, disciplina.id);
            });
            return Disciplina_1.Disciplina.disciplinaList;
        });
    }
    update(id, nome) {
        return __awaiter(this, void 0, void 0, function* () {
            let disciplinaPrisma = yield this.get(id);
            if (!disciplinaPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disciplina não encontrada");
            }
            let disciplina = yield client_1.prisma.disciplina.update({
                where: {
                    id: disciplinaPrisma.getId(),
                },
                data: {
                    nome: (typeof nome == "string") ? nome : disciplinaPrisma.getNome(),
                }
            });
            disciplinaPrisma.setNome(disciplina.nome);
            return disciplinaPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let disciplinaPrisma = yield this.get(id);
            if (!disciplinaPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disciplina não encontrada");
            }
            let disciplina = yield client_1.prisma.disciplina.delete({
                where: {
                    id: disciplinaPrisma.getId(),
                }
            });
            return disciplina.id.toString();
        });
    }
}
exports.DisciplinaRepository = DisciplinaRepository;
