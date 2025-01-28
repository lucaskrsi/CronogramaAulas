"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turmaRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./turma/get-all");
const get_1 = require("./turma/get");
const remove_1 = require("./turma/remove");
const update_1 = require("./turma/update");
const create_1 = require("./turma/create");
function turmaRoutes(router) {
    router.get("/turmas", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/turmas/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/turmas/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/turmas/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/turmas", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.turmaRoutes = turmaRoutes;
