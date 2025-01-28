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
exports.DisciplinaGradeRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const DisciplinaGrade_1 = require("../../models/DisciplinaGrade");
const GradeCurricular_1 = require("../../models/GradeCurricular");
const Disciplina_1 = require("../../models/Disciplina");
class DisciplinaGradeRepository {
    create(disciplinaGrade) {
        return __awaiter(this, void 0, void 0, function* () {
            let disciplinaGradePrisma = yield client_1.prisma.disciplinaGrade.create({
                data: {
                    cargaHoraria: disciplinaGrade.getCargaHoraria(),
                    disciplinaId: disciplinaGrade.getDisciplina().getId(),
                    gradeId: disciplinaGrade.getGradeCurricular().getId(),
                },
            });
            disciplinaGrade.setId(disciplinaGradePrisma.id);
            return disciplinaGrade;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const disciplinaGradePrisma = yield client_1.prisma.disciplinaGrade.findUnique({
                where: {
                    id: id,
                },
                include: {
                    disciplina: true,
                    gradeCurricular: true,
                }
            });
            if (!disciplinaGradePrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disciplina x Grade curricular não encontrada");
            }
            const disciplinaGrade = new DisciplinaGrade_1.DisciplinaGrade(disciplinaGradePrisma.cargaHoraria, new Disciplina_1.Disciplina(disciplinaGradePrisma.disciplina.nome, disciplinaGradePrisma.disciplina.id), new GradeCurricular_1.GradeCurricular(disciplinaGradePrisma.gradeCurricular.nome, disciplinaGradePrisma.gradeCurricular.id), disciplinaGradePrisma.id);
            return disciplinaGrade;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const disciplinaGradePrisma = yield client_1.prisma.disciplinaGrade.findMany({
                include: {
                    disciplina: true,
                    gradeCurricular: true,
                }
            });
            DisciplinaGrade_1.DisciplinaGrade.disciplinaGradeList = disciplinaGradePrisma.map((disciplinaGrade) => {
                return new DisciplinaGrade_1.DisciplinaGrade(disciplinaGrade.cargaHoraria, new Disciplina_1.Disciplina(disciplinaGrade.disciplina.nome, disciplinaGrade.disciplina.id), new GradeCurricular_1.GradeCurricular(disciplinaGrade.gradeCurricular.nome, disciplinaGrade.gradeCurricular.id), disciplinaGrade.id);
            });
            return DisciplinaGrade_1.DisciplinaGrade.disciplinaGradeList;
        });
    }
    update(id, cargaHoraria, disciplina, grade) {
        return __awaiter(this, void 0, void 0, function* () {
            let disciplinaGradePrisma = yield this.get(id);
            if (!disciplinaGradePrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disciplina x Grade curricular não encontrada");
            }
            let disciplinaGrade = yield client_1.prisma.disciplinaGrade.update({
                where: {
                    id: disciplinaGradePrisma.getId(),
                },
                data: {
                    cargaHoraria: (typeof cargaHoraria == "number") ? cargaHoraria : disciplinaGradePrisma.getCargaHoraria(),
                    disciplinaId: (disciplina && typeof disciplina.getId === "string") ? disciplina.getId() : disciplinaGradePrisma.getDisciplina().getId(),
                    gradeId: (grade && typeof grade.getId === "string") ? grade.getId() : disciplinaGradePrisma.getGradeCurricular().getId(),
                }
            });
            disciplinaGradePrisma.setCargaHoraria(disciplinaGrade.cargaHoraria);
            return disciplinaGradePrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let disciplinaGradePrisma = yield this.get(id);
            if (!disciplinaGradePrisma) {
                throw HttpException_1.HttpException.NotFoundError("Disciplina x Grade curricular não encontrada");
            }
            let disciplinaGrade = yield client_1.prisma.disciplinaGrade.delete({
                where: {
                    id: disciplinaGradePrisma.getId(),
                }
            });
            return disciplinaGrade.id.toString();
        });
    }
}
exports.DisciplinaGradeRepository = DisciplinaGradeRepository;
