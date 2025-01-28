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
exports.DisciplinaProfessorRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const DisciplinaProfessor_1 = require("../../models/DisciplinaProfessor");
const Professor_1 = require("../../models/Professor");
const Disciplina_1 = require("../../models/Disciplina");
class DisciplinaProfessorRepository {
    create(disciplinaProfessor) {
        return __awaiter(this, void 0, void 0, function* () {
            let disciplinaProfessorPrisma = yield client_1.prisma.disciplinaProfessor.create({
                data: {
                    disciplinaId: disciplinaProfessor.getDisciplina().getId(),
                    professorId: disciplinaProfessor.getProfessor().getId()
                },
            });
            disciplinaProfessor.setId(disciplinaProfessorPrisma.id);
            return disciplinaProfessor;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const disciplinaProfessorPrisma = yield client_1.prisma.disciplinaProfessor.findUnique({
                where: {
                    id: id,
                },
                include: {
                    disciplina: true,
                    professor: true,
                }
            });
            if (!disciplinaProfessorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disciplina x Professor não encontrada");
            }
            const disciplinaProfessor = new DisciplinaProfessor_1.DisciplinaProfessor(new Disciplina_1.Disciplina(disciplinaProfessorPrisma.disciplina.nome, disciplinaProfessorPrisma.disciplina.id), new Professor_1.Professor(disciplinaProfessorPrisma.professor.cargaHoraria, disciplinaProfessorPrisma.professor.id), disciplinaProfessorPrisma.id);
            return disciplinaProfessor;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const disciplinaProfessorPrisma = yield client_1.prisma.disciplinaProfessor.findMany({
                include: {
                    disciplina: true,
                    professor: true,
                }
            });
            DisciplinaProfessor_1.DisciplinaProfessor.disciplinaProfessorList = disciplinaProfessorPrisma.map((disciplinaProfessor) => {
                return new DisciplinaProfessor_1.DisciplinaProfessor(new Disciplina_1.Disciplina(disciplinaProfessor.disciplina.nome, disciplinaProfessor.disciplina.id), new Professor_1.Professor(disciplinaProfessor.professor.cargaHoraria, disciplinaProfessor.professor.id), disciplinaProfessor.id);
            });
            return DisciplinaProfessor_1.DisciplinaProfessor.disciplinaProfessorList;
        });
    }
    update(id, disciplina, professor) {
        return __awaiter(this, void 0, void 0, function* () {
            let disciplinaProfessorPrisma = yield this.get(id);
            if (!disciplinaProfessorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disciplina x Professor não encontrada");
            }
            let disciplinaProfessor = yield client_1.prisma.disciplinaProfessor.update({
                where: {
                    id: disciplinaProfessorPrisma.getId(),
                },
                data: {
                    disciplinaId: (disciplina && typeof disciplina.getId === "string") ? disciplina.getId() : disciplinaProfessorPrisma.getDisciplina().getId(),
                    professorId: (professor && typeof professor.getId === "string") ? professor.getId() : disciplinaProfessorPrisma.getProfessor().getId(),
                }
            });
            return disciplinaProfessorPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let disciplinaProfessorPrisma = yield this.get(id);
            if (!disciplinaProfessorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disciplina x Professor não encontrada");
            }
            let disciplinaProfessor = yield client_1.prisma.disciplinaProfessor.delete({
                where: {
                    id: disciplinaProfessorPrisma.getId(),
                }
            });
            return disciplinaProfessor.id.toString();
        });
    }
}
exports.DisciplinaProfessorRepository = DisciplinaProfessorRepository;
