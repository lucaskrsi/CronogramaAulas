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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const disciplinasIniciais = [
    { nome: "Matemática" },
    { nome: "Português" },
    { nome: "Inglês" },
    { nome: "Espanhol" },
    { nome: "Geografia" },
    { nome: "História" },
    { nome: "Física" },
    { nome: "Química" },
    { nome: "Biologia" },
    { nome: "Artes" },
    { nome: "Educação Física" },
    { nome: "Ciências" },
    { nome: "Sociologia" },
    { nome: "Filosofia" },
    { nome: "Literatura" },
    { nome: "Música" },
    { nome: "Economia" },
];
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const disciplinaInicial of disciplinasIniciais) {
            const disciplinaPrisma = yield prisma.disciplina.findUnique({
                where: {
                    nome: disciplinaInicial.nome,
                },
            });
            if (!disciplinaPrisma) {
                yield prisma.disciplina.create({
                    data: disciplinaInicial,
                });
            }
        }
    });
}
seed()
    .then(() => console.log('Seed executada com sucesso!'))
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
