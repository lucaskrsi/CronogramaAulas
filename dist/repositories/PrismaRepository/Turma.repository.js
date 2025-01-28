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
exports.TurmaRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const Turma_1 = require("../../models/Turma");
class TurmaRepository {
    create(turma) {
        return __awaiter(this, void 0, void 0, function* () {
            let turmaPrisma = yield client_1.prisma.turma.create({
                data: {
                    nome: turma.getNome(),
                },
            });
            turma.setId(turmaPrisma.id);
            return turma;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turmaPrisma = yield client_1.prisma.turma.findUnique({
                where: {
                    id: id,
                },
            });
            if (!turmaPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Turma não encontrada");
            }
            const turma = new Turma_1.Turma(turmaPrisma.nome, turmaPrisma.id);
            return turma;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const turmaPrisma = yield client_1.prisma.turma.findMany();
            Turma_1.Turma.turmaList = turmaPrisma.map((turma) => {
                return new Turma_1.Turma(turma.nome, turma.id);
            });
            return Turma_1.Turma.turmaList;
        });
    }
    update(id, nome) {
        return __awaiter(this, void 0, void 0, function* () {
            let turmaPrisma = yield this.get(id);
            if (!turmaPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Turma não encontrada");
            }
            let turma = yield client_1.prisma.turma.update({
                where: {
                    id: turmaPrisma.getId(),
                },
                data: {
                    nome: (typeof nome == "string") ? nome : turmaPrisma.getNome(),
                }
            });
            turmaPrisma.setNome(turma.nome);
            return turmaPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let turmaPrisma = yield this.get(id);
            if (!turmaPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Turma não encontrada");
            }
            let turma = yield client_1.prisma.turma.delete({
                where: {
                    id: turmaPrisma.getId(),
                }
            });
            return turma.id.toString();
        });
    }
}
exports.TurmaRepository = TurmaRepository;
