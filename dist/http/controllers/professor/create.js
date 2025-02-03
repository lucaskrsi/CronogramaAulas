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
exports.create = void 0;
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeProfessorRepository_1 = require("../../../repositories/factory/makeProfessorRepository");
const Professor_1 = require("../../../models/Professor");
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                cargaHoraria: zod_1.z.coerce.number(),
                nome: zod_1.z.string().max(100),
                matricula: zod_1.z.coerce.number()
            });
            const { cargaHoraria, nome, matricula } = createBody.parse(req.body);
            const professorRepository = (0, makeProfessorRepository_1.makeProfessorRepository)();
            const professor = yield professorRepository.create(new Professor_1.Professor(cargaHoraria, nome, matricula));
            res.status(201).json({
                data: {
                    professorId: professor.getId(),
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.create = create;
