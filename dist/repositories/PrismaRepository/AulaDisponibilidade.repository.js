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
exports.AulaDisponibilidadeRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const AulaDisponibilidade_1 = require("../../models/AulaDisponibilidade");
const DisponibilidadeProfessor_1 = require("../../models/DisponibilidadeProfessor");
const Aula_1 = require("../../models/Aula");
const Disciplina_1 = require("../../models/Disciplina");
const Turma_1 = require("../../models/Turma");
const Professor_1 = require("../../models/Professor");
class AulaDisponibilidadeRepository {
    create(aulaDisponibilidade) {
        return __awaiter(this, void 0, void 0, function* () {
            let aulaDisponibilidadePrisma = yield client_1.prisma.aulaDisponibilidade.create({
                data: {
                    aulaId: aulaDisponibilidade.getAula().getId(),
                    disponibilidadeProfessorId: aulaDisponibilidade.getDisponibilidadeProfessor().getId(),
                },
            });
            aulaDisponibilidade.setId(aulaDisponibilidadePrisma.id);
            return aulaDisponibilidade;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const aulaDisponibilidadePrisma = yield client_1.prisma.aulaDisponibilidade.findUnique({
                where: {
                    id: id,
                },
                include: {
                    aula: {
                        include: {
                            disciplina: true,
                            turma: true,
                        },
                    },
                    disponibilidadeProfessor: {
                        include: {
                            professor: true,
                        },
                    },
                }
            });
            if (!aulaDisponibilidadePrisma) {
                throw HttpException_1.HttpException.NotFoundError("Aula x Disponibilidade do Professor não encontrada");
            }
            const aulaDisponibilidade = new AulaDisponibilidade_1.AulaDisponibilidade(new Aula_1.Aula(aulaDisponibilidadePrisma.aula.inicioHora.toString(), aulaDisponibilidadePrisma.aula.fimHora.toString(), aulaDisponibilidadePrisma.aula.diaDaSemana, new Disciplina_1.Disciplina(aulaDisponibilidadePrisma.aula.disciplina.nome, aulaDisponibilidadePrisma.aula.disciplina.id), new Turma_1.Turma(aulaDisponibilidadePrisma.aula.turma.nome, aulaDisponibilidadePrisma.aula.turma.id)), new DisponibilidadeProfessor_1.DisponibilidadeProfessor(aulaDisponibilidadePrisma.disponibilidadeProfessor.diaDaSemana, aulaDisponibilidadePrisma.disponibilidadeProfessor.inicioHora, aulaDisponibilidadePrisma.disponibilidadeProfessor.fimHora, new Professor_1.Professor(aulaDisponibilidadePrisma.disponibilidadeProfessor.professor.cargaHoraria, aulaDisponibilidadePrisma.disponibilidadeProfessor.professor.nome, aulaDisponibilidadePrisma.disponibilidadeProfessor.professor.matricula, aulaDisponibilidadePrisma.disponibilidadeProfessor.professor.id)), aulaDisponibilidadePrisma.id);
            return aulaDisponibilidade;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const aulaDisponibilidadePrisma = yield client_1.prisma.aulaDisponibilidade.findMany({
                include: {
                    aula: {
                        include: {
                            disciplina: true,
                            turma: true,
                        },
                    },
                    disponibilidadeProfessor: {
                        include: {
                            professor: true,
                        },
                    },
                }
            });
            AulaDisponibilidade_1.AulaDisponibilidade.aulaDisponibilidadeList = aulaDisponibilidadePrisma.map((aulaDisponibilidade) => {
                return new AulaDisponibilidade_1.AulaDisponibilidade(new Aula_1.Aula(aulaDisponibilidade.aula.inicioHora.toString(), aulaDisponibilidade.aula.fimHora.toString(), aulaDisponibilidade.aula.diaDaSemana, new Disciplina_1.Disciplina(aulaDisponibilidade.aula.disciplina.nome, aulaDisponibilidade.aula.disciplina.id), new Turma_1.Turma(aulaDisponibilidade.aula.turma.nome, aulaDisponibilidade.aula.turma.id)), new DisponibilidadeProfessor_1.DisponibilidadeProfessor(aulaDisponibilidade.disponibilidadeProfessor.diaDaSemana, aulaDisponibilidade.disponibilidadeProfessor.inicioHora, aulaDisponibilidade.disponibilidadeProfessor.fimHora, new Professor_1.Professor(aulaDisponibilidade.disponibilidadeProfessor.professor.cargaHoraria, aulaDisponibilidade.disponibilidadeProfessor.professor.nome, aulaDisponibilidade.disponibilidadeProfessor.professor.matricula, aulaDisponibilidade.disponibilidadeProfessor.professor.id)), aulaDisponibilidade.id);
            });
            return AulaDisponibilidade_1.AulaDisponibilidade.aulaDisponibilidadeList;
        });
    }
    update(id, aula, disponibilidadeProfessor) {
        return __awaiter(this, void 0, void 0, function* () {
            let aulaDisponibilidadePrisma = yield this.get(id);
            if (!aulaDisponibilidadePrisma) {
                throw HttpException_1.HttpException.NotFoundError("Aula x Disponibilidade do Professor não encontrada");
            }
            let aulaDisponibilidade = yield client_1.prisma.aulaDisponibilidade.update({
                where: {
                    id: aulaDisponibilidadePrisma.getId(),
                },
                data: {
                    aulaId: (aula && typeof aula.getId === "string") ? aula.getId() : aulaDisponibilidadePrisma.getAula().getId(),
                    disponibilidadeProfessorId: (disponibilidadeProfessor && typeof disponibilidadeProfessor.getId === "string") ? disponibilidadeProfessor.getId() : aulaDisponibilidadePrisma.getDisponibilidadeProfessor().getId(),
                }
            });
            return aulaDisponibilidadePrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let aulaDisponibilidadePrisma = yield this.get(id);
            if (!aulaDisponibilidadePrisma) {
                throw HttpException_1.HttpException.NotFoundError("Aula x Disponibilidade do Professor não encontrada");
            }
            let aulaDisponibilidade = yield client_1.prisma.aulaDisponibilidade.delete({
                where: {
                    id: aulaDisponibilidadePrisma.getId(),
                }
            });
            return aulaDisponibilidade.id.toString();
        });
    }
}
exports.AulaDisponibilidadeRepository = AulaDisponibilidadeRepository;
