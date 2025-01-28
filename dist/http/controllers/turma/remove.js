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
exports.remove = void 0;
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeTurmaRepository_1 = require("../../../repositories/factory/makeTurmaRepository");
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { id } = createParam.parse(req.params);
            const turmaRepository = (0, makeTurmaRepository_1.makeTurmaRepository)();
            const turmaId = yield turmaRepository.delete(id);
            res.status(200).json({
                data: { turmaId: turmaId },
                message: 'Deletado com sucesso!',
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.remove = remove;
