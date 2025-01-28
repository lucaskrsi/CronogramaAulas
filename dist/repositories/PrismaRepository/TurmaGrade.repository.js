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
exports.TurmaGradeRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const TurmaGrade_1 = require("../../models/TurmaGrade");
const Turma_1 = require("../../models/Turma");
const GradeCurricular_1 = require("../../models/GradeCurricular");
class TurmaGradeRepository {
    create(turmaGrade) {
        return __awaiter(this, void 0, void 0, function* () {
            let turmaGradePrisma = yield client_1.prisma.turmaGrade.create({
                data: {
                    ano: turmaGrade.getAno(),
                    turmaId: turmaGrade.getTurma().getId(),
                    gradeId: turmaGrade.getGradeCurricular().getId(),
                },
            });
            turmaGrade.setId(turmaGradePrisma.id);
            return turmaGrade;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const turmaGradePrisma = yield client_1.prisma.turmaGrade.findUnique({
                where: {
                    id: id,
                },
                include: {
                    turma: true,
                    gradeCurricular: true,
                }
            });
            if (!turmaGradePrisma) {
                throw HttpException_1.HttpException.NotFoundError("Turma x Grade curricular não encontrada");
            }
            const turmaGrade = new TurmaGrade_1.TurmaGrade(turmaGradePrisma.ano, new Turma_1.Turma(turmaGradePrisma.turma.nome, turmaGradePrisma.turma.id), new GradeCurricular_1.GradeCurricular(turmaGradePrisma.gradeCurricular.nome, turmaGradePrisma.gradeCurricular.id), turmaGradePrisma.id);
            return turmaGrade;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const turmaGradePrisma = yield client_1.prisma.turmaGrade.findMany({
                include: {
                    turma: true,
                    gradeCurricular: true,
                }
            });
            TurmaGrade_1.TurmaGrade.turmaGradeList = turmaGradePrisma.map((turmaGrade) => {
                return new TurmaGrade_1.TurmaGrade(turmaGrade.ano, new Turma_1.Turma(turmaGrade.turma.nome, turmaGrade.turma.id), new GradeCurricular_1.GradeCurricular(turmaGrade.gradeCurricular.nome, turmaGrade.gradeCurricular.id), turmaGrade.id);
            });
            return TurmaGrade_1.TurmaGrade.turmaGradeList;
        });
    }
    update(id, ano, turma, grade) {
        return __awaiter(this, void 0, void 0, function* () {
            let turmaGradePrisma = yield this.get(id);
            if (!turmaGradePrisma) {
                throw HttpException_1.HttpException.NotFoundError("Turma x Grade curricular não encontrada");
            }
            let turmaGrade = yield client_1.prisma.turmaGrade.update({
                where: {
                    id: turmaGradePrisma.getId(),
                },
                data: {
                    ano: (typeof ano == "string") ? ano : turmaGradePrisma.getAno(),
                    turmaId: (turma && typeof turma.getId === "string") ? turma.getId() : turmaGradePrisma.getTurma().getId(),
                    gradeId: (grade && typeof grade.getId === "string") ? grade.getId() : turmaGradePrisma.getGradeCurricular().getId(),
                }
            });
            turmaGradePrisma.setAno(turmaGrade.ano);
            return turmaGradePrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let turmaGradePrisma = yield this.get(id);
            if (!turmaGradePrisma) {
                throw HttpException_1.HttpException.NotFoundError("Turma x Grade curricular não encontrada");
            }
            let turmaGrade = yield client_1.prisma.turmaGrade.delete({
                where: {
                    id: turmaGradePrisma.getId(),
                }
            });
            return turmaGrade.id.toString();
        });
    }
}
exports.TurmaGradeRepository = TurmaGradeRepository;
