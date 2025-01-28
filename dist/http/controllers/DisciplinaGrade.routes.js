"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disciplinaGradeRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./disciplina-grade/get-all");
const get_1 = require("./disciplina-grade/get");
const remove_1 = require("./disciplina-grade/remove");
const update_1 = require("./disciplina-grade/update");
const create_1 = require("./disciplina-grade/create");
function disciplinaGradeRoutes(router) {
    router.get("/disciplinas-grades", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/disciplinas-grades/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/disciplinas-grades/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/disciplinas-grades/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/disciplinas-grades", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.disciplinaGradeRoutes = disciplinaGradeRoutes;
