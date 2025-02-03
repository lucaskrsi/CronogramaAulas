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
exports.ProfessorRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const Professor_1 = require("../../models/Professor");
class ProfessorRepository {
    create(professor) {
        return __awaiter(this, void 0, void 0, function* () {
            let professorPrisma = yield client_1.prisma.professor.create({
                data: {
                    cargaHoraria: professor.getCargaHoraria(),
                    nome: professor.getNome(),
                    matricula: professor.getMatricula(),
                },
            });
            professor.setId(professorPrisma.id);
            return professor;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const professorPrisma = yield client_1.prisma.professor.findUnique({
                where: {
                    id: id,
                },
            });
            if (!professorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Professor não encontrada");
            }
            const professor = new Professor_1.Professor(professorPrisma.cargaHoraria, professorPrisma.nome, professorPrisma.matricula, professorPrisma.id);
            return professor;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const professorPrisma = yield client_1.prisma.professor.findMany();
            Professor_1.Professor.professorList = professorPrisma.map((professor) => {
                return new Professor_1.Professor(professor.cargaHoraria, professor.nome, professor.matricula, professor.id);
            });
            return Professor_1.Professor.professorList;
        });
    }
    update(id, cargaHoraria, nome, matricula) {
        return __awaiter(this, void 0, void 0, function* () {
            let professorPrisma = yield this.get(id);
            if (!professorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Professor não encontrada");
            }
            let professor = yield client_1.prisma.professor.update({
                where: {
                    id: professorPrisma.getId(),
                },
                data: {
                    cargaHoraria: (typeof cargaHoraria == "number") ? cargaHoraria : professorPrisma.getCargaHoraria(),
                    nome: (nome && typeof nome === "string") ? nome : professorPrisma.getNome(),
                    matricula: (typeof matricula === "number") ? matricula : professorPrisma.getMatricula(),
                }
            });
            professorPrisma.setCargaHoraria(professor.cargaHoraria);
            return professorPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let professorPrisma = yield this.get(id);
            if (!professorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Professor não encontrada");
            }
            let professor = yield client_1.prisma.professor.delete({
                where: {
                    id: professorPrisma.getId(),
                }
            });
            return professor.id.toString();
        });
    }
}
exports.ProfessorRepository = ProfessorRepository;
