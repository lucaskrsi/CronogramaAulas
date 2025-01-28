"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aulaDisponibilidadeRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./aula-disponibilidade/get-all");
const get_1 = require("./aula-disponibilidade/get");
const remove_1 = require("./aula-disponibilidade/remove");
const update_1 = require("./aula-disponibilidade/update");
const create_1 = require("./aula-disponibilidade/create");
function aulaDisponibilidadeRoutes(router) {
    router.get("/aulas-disponibilidades", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/aulas-disponibilidades/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/aulas-disponibilidades/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/aulas-disponibilidades/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/aulas-disponibilidades", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.aulaDisponibilidadeRoutes = aulaDisponibilidadeRoutes;
