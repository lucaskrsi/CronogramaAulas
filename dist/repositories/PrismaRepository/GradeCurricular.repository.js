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
exports.GradeCurricularRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const GradeCurricular_1 = require("../../models/GradeCurricular");
class GradeCurricularRepository {
    create(gradeCurricular) {
        return __awaiter(this, void 0, void 0, function* () {
            let gradeCurricularPrisma = yield client_1.prisma.gradeCurricular.create({
                data: {
                    nome: gradeCurricular.getNome(),
                },
            });
            gradeCurricular.setId(gradeCurricularPrisma.id);
            return gradeCurricular;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const gradeCurricularPrisma = yield client_1.prisma.gradeCurricular.findUnique({
                where: {
                    id: id,
                },
            });
            if (!gradeCurricularPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Grade curricular não encontrada");
            }
            const gradeCurricular = new GradeCurricular_1.GradeCurricular(gradeCurricularPrisma.nome, gradeCurricularPrisma.id);
            return gradeCurricular;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const gradeCurricularPrisma = yield client_1.prisma.gradeCurricular.findMany();
            GradeCurricular_1.GradeCurricular.gradeCurricularList = gradeCurricularPrisma.map((gradeCurricular) => {
                return new GradeCurricular_1.GradeCurricular(gradeCurricular.nome, gradeCurricular.id);
            });
            return GradeCurricular_1.GradeCurricular.gradeCurricularList;
        });
    }
    update(id, nome) {
        return __awaiter(this, void 0, void 0, function* () {
            let gradeCurricularPrisma = yield this.get(id);
            if (!gradeCurricularPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Grade curricular não encontrada");
            }
            let gradeCurricular = yield client_1.prisma.gradeCurricular.update({
                where: {
                    id: gradeCurricularPrisma.getId(),
                },
                data: {
                    nome: (typeof nome == "string") ? nome : gradeCurricularPrisma.getNome(),
                }
            });
            gradeCurricularPrisma.setNome(gradeCurricular.nome);
            return gradeCurricularPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let gradeCurricularPrisma = yield this.get(id);
            if (!gradeCurricularPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Grade curricular não encontrada");
            }
            let gradeCurricular = yield client_1.prisma.gradeCurricular.delete({
                where: {
                    id: gradeCurricularPrisma.getId(),
                }
            });
            return gradeCurricular.id.toString();
        });
    }
}
exports.GradeCurricularRepository = GradeCurricularRepository;
