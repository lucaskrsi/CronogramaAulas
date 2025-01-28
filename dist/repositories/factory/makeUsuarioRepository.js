"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUsuarioRepository = void 0;
const Usuario_repository_1 = require("../PrismaRepository/Usuario.repository");
function makeUsuarioRepository() {
    return new Usuario_repository_1.UsuarioRepository();
}
exports.makeUsuarioRepository = makeUsuarioRepository;
