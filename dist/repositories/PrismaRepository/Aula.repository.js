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
exports.AulaRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const Aula_1 = require("../../models/Aula");
const Disciplina_1 = require("../../models/Disciplina");
const Turma_1 = require("../../models/Turma");
class AulaRepository {
    create(aula) {
        return __awaiter(this, void 0, void 0, function* () {
            let aulaPrisma = yield client_1.prisma.aula.create({
                data: {
                    inicioHora: aula.getInicioHora(),
                    fimHora: aula.getFimHora(),
                    diaDaSemana: aula.getDiaDaSemana(),
                    disciplinaId: aula.getDisciplina().getId(),
                    turmaId: aula.getTurma().getId(),
                },
            });
            aula.setId(aulaPrisma.id);
            return aula;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const aulaPrisma = yield client_1.prisma.aula.findUnique({
                where: {
                    id: id,
                },
                include: {
                    disciplina: true,
                    turma: true,
                },
            });
            if (!aulaPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Aula não encontrada");
            }
            const aula = new Aula_1.Aula(aulaPrisma.inicioHora.toString(), aulaPrisma.fimHora.toString(), aulaPrisma.diaDaSemana, new Disciplina_1.Disciplina(aulaPrisma.disciplina.nome, aulaPrisma.disciplina.id), new Turma_1.Turma(aulaPrisma.turma.nome, aulaPrisma.turma.id), aulaPrisma.id);
            return aula;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const aulaPrisma = yield client_1.prisma.aula.findMany({
                include: {
                    disciplina: true,
                    turma: true,
                },
            });
            Aula_1.Aula.aulaList = aulaPrisma.map((aula) => {
                return new Aula_1.Aula(aula.inicioHora.toString(), aula.fimHora.toString(), aula.diaDaSemana, new Disciplina_1.Disciplina(aula.disciplina.nome, aula.disciplina.id), new Turma_1.Turma(aula.turma.nome, aula.turma.id), aula.id);
            });
            return Aula_1.Aula.aulaList;
        });
    }
    update(id, inicioHora, fimHora, diaDaSemana, disciplina, turma) {
        return __awaiter(this, void 0, void 0, function* () {
            let aulaPrisma = yield this.get(id);
            if (!aulaPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Aula não encontrada");
            }
            let aula = yield client_1.prisma.aula.update({
                where: {
                    id: aulaPrisma.getId(),
                },
                data: {
                    inicioHora: (typeof inicioHora == "string") ? inicioHora : aulaPrisma.getInicioHora(),
                    fimHora: (typeof fimHora == "string") ? fimHora : aulaPrisma.getFimHora(),
                    diaDaSemana: (typeof diaDaSemana == "string") ? diaDaSemana : aulaPrisma.getDiaDaSemana(),
                    disciplinaId: (disciplina) ? disciplina.getId() : aulaPrisma.getDisciplina().getId(),
                    turmaId: (turma) ? turma.getId() : aulaPrisma.getTurma().getId(),
                }
            });
            aulaPrisma.setInicioHora(aula.inicioHora.toString());
            aulaPrisma.setFimHora(aula.fimHora.toString());
            aulaPrisma.setDiaDaSemana(aula.diaDaSemana);
            return aulaPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let aulaPrisma = yield this.get(id);
            if (!aulaPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Aula não encontrada");
            }
            let aula = yield client_1.prisma.aula.delete({
                where: {
                    id: aulaPrisma.getId(),
                }
            });
            return aula.id.toString();
        });
    }
}
exports.AulaRepository = AulaRepository;
