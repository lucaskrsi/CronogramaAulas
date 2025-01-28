"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professorRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./professor/get-all");
const get_1 = require("./professor/get");
const remove_1 = require("./professor/remove");
const update_1 = require("./professor/update");
const create_1 = require("./professor/create");
function professorRoutes(router) {
    router.get("/professors", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/professors/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/professors/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/professors/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/professors", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.professorRoutes = professorRoutes;
