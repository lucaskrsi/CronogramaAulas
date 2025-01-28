"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disponibilidadeProfessorRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./disponibilidade-professor/get-all");
const get_1 = require("./disponibilidade-professor/get");
const remove_1 = require("./disponibilidade-professor/remove");
const update_1 = require("./disponibilidade-professor/update");
const create_1 = require("./disponibilidade-professor/create");
function disponibilidadeProfessorRoutes(router) {
    router.get("/disponibilidades-professores", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/disponibilidades-professores/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/disponibilidades-professores/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/disponibilidades-professores/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/disponibilidades-professores", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.disponibilidadeProfessorRoutes = disponibilidadeProfessorRoutes;
