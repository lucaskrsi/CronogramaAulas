"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turmaGradeRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./turmaGrade/get-all");
const get_1 = require("./turmaGrade/get");
const remove_1 = require("./turmaGrade/remove");
const update_1 = require("./turmaGrade/update");
const create_1 = require("./turmaGrade/create");
function turmaGradeRoutes(router) {
    router.get("/turmas-grades", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/turmas-grades/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/turmas-grades/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/turmas-grades/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/turmas-grades", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.turmaGradeRoutes = turmaGradeRoutes;
