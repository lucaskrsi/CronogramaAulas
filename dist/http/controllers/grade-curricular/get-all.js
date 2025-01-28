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
exports.getAll = void 0;
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeGradeCurricularRepository_1 = require("../../../repositories/factory/makeGradeCurricularRepository");
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gradeCurricularRepository = (0, makeGradeCurricularRepository_1.makeGradeCurricularRepository)();
            const gradeCurricularList = yield gradeCurricularRepository.getAll();
            let list = gradeCurricularList.map(gradeCurricular => {
                return {
                    id: gradeCurricular.getId(),
                    nome: gradeCurricular.getNome(),
                };
            });
            res.status(200).json({
                data: {
                    gradesCurriculares: list,
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.getAll = getAll;
