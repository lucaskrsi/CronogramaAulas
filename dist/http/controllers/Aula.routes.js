"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aulaRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./aula/get-all");
const get_1 = require("./aula/get");
const remove_1 = require("./aula/remove");
const update_1 = require("./aula/update");
const create_1 = require("./aula/create");
function aulaRoutes(router) {
    router.get("/aulas", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/aulas/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/aulas/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/aulas/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/aulas", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.aulaRoutes = aulaRoutes;
