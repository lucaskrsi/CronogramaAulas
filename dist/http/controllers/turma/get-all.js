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
const makeTurmaRepository_1 = require("../../../repositories/factory/makeTurmaRepository");
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const turmaRepository = (0, makeTurmaRepository_1.makeTurmaRepository)();
            const turmaList = yield turmaRepository.getAll();
            let list = turmaList.map(turma => {
                return {
                    id: turma.getId(),
                    nome: turma.getNome(),
                };
            });
            res.status(200).json({
                data: {
                    turmas: list,
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.getAll = getAll;
