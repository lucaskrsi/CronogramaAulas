"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disciplinaProfessorRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./disciplina-professor/get-all");
const get_1 = require("./disciplina-professor/get");
const remove_1 = require("./disciplina-professor/remove");
const update_1 = require("./disciplina-professor/update");
const create_1 = require("./disciplina-professor/create");
function disciplinaProfessorRoutes(router) {
    router.get("/disciplinas-professores", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/disciplinas-professores/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/disciplinas-professores/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/disciplinas-professores/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/disciplinas-professores", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.disciplinaProfessorRoutes = disciplinaProfessorRoutes;
