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
exports.DisponibilidadeProfessorRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const DisponibilidadeProfessor_1 = require("../../models/DisponibilidadeProfessor");
const Professor_1 = require("../../models/Professor");
class DisponibilidadeProfessorRepository {
    create(disponibilidadeProfessor) {
        return __awaiter(this, void 0, void 0, function* () {
            let disponibilidadeProfessorPrisma = yield client_1.prisma.disponibilidadeProfessor.create({
                data: {
                    diaDaSemana: disponibilidadeProfessor.getDiaDaSemana(),
                    inicioHora: disponibilidadeProfessor.getInicioHora(),
                    fimHora: disponibilidadeProfessor.getFimHora(),
                    professorId: disponibilidadeProfessor.getProfessor().getId()
                },
            });
            disponibilidadeProfessor.setId(disponibilidadeProfessorPrisma.id);
            return disponibilidadeProfessor;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const disponibilidadeProfessorPrisma = yield client_1.prisma.disponibilidadeProfessor.findUnique({
                where: {
                    id: id,
                },
                include: {
                    professor: true,
                }
            });
            if (!disponibilidadeProfessorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disponibilidade x Professor não encontrada");
            }
            const disponibilidadeProfessor = new DisponibilidadeProfessor_1.DisponibilidadeProfessor(disponibilidadeProfessorPrisma.diaDaSemana, disponibilidadeProfessorPrisma.inicioHora, disponibilidadeProfessorPrisma.fimHora, new Professor_1.Professor(disponibilidadeProfessorPrisma.professor.cargaHoraria, disponibilidadeProfessorPrisma.professor.nome, disponibilidadeProfessorPrisma.professor.matricula, disponibilidadeProfessorPrisma.professor.id), disponibilidadeProfessorPrisma.id);
            return disponibilidadeProfessor;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const disponibilidadeProfessorPrisma = yield client_1.prisma.disponibilidadeProfessor.findMany({
                include: {
                    professor: true,
                }
            });
            DisponibilidadeProfessor_1.DisponibilidadeProfessor.disponibilidadeProfessorList = disponibilidadeProfessorPrisma.map((disponibilidadeProfessor) => {
                return new DisponibilidadeProfessor_1.DisponibilidadeProfessor(disponibilidadeProfessor.diaDaSemana, disponibilidadeProfessor.inicioHora, disponibilidadeProfessor.fimHora, new Professor_1.Professor(disponibilidadeProfessor.professor.cargaHoraria, disponibilidadeProfessor.professor.nome, disponibilidadeProfessor.professor.matricula, disponibilidadeProfessor.professor.id), disponibilidadeProfessor.id);
            });
            return DisponibilidadeProfessor_1.DisponibilidadeProfessor.disponibilidadeProfessorList;
        });
    }
    update(id, diaDaSemana, inicioHora, fimHora, professor) {
        return __awaiter(this, void 0, void 0, function* () {
            let disponibilidadeProfessorPrisma = yield this.get(id);
            if (!disponibilidadeProfessorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disponibilidade x Professor não encontrada");
            }
            let disponibilidadeProfessor = yield client_1.prisma.disponibilidadeProfessor.update({
                where: {
                    id: disponibilidadeProfessorPrisma.getId(),
                },
                data: {
                    diaDaSemana: (typeof diaDaSemana == "string") ? diaDaSemana : disponibilidadeProfessorPrisma.getDiaDaSemana(),
                    inicioHora: (typeof inicioHora == "string") ? inicioHora : disponibilidadeProfessorPrisma.getInicioHora(),
                    fimHora: (typeof fimHora == "string") ? fimHora : disponibilidadeProfessorPrisma.getFimHora(),
                    professorId: (typeof professor == "string") ? professor : disponibilidadeProfessorPrisma.getProfessor().getId(),
                }
            });
            disponibilidadeProfessorPrisma.setDiaDaSemana(disponibilidadeProfessor.diaDaSemana);
            disponibilidadeProfessorPrisma.setInicioHora(disponibilidadeProfessor.inicioHora);
            disponibilidadeProfessorPrisma.setFimHora(disponibilidadeProfessor.fimHora);
            return disponibilidadeProfessorPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let disponibilidadeProfessorPrisma = yield this.get(id);
            if (!disponibilidadeProfessorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disponibilidade x Professor não encontrada");
            }
            let disponibilidadeProfessor = yield client_1.prisma.disponibilidadeProfessor.delete({
                where: {
                    id: disponibilidadeProfessorPrisma.getId(),
                }
            });
            return disponibilidadeProfessor.id.toString();
        });
    }
}
exports.DisponibilidadeProfessorRepository = DisponibilidadeProfessorRepository;
