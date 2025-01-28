"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disciplinaRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./disciplina/get-all");
const get_1 = require("./disciplina/get");
const remove_1 = require("./disciplina/remove");
const update_1 = require("./disciplina/update");
const create_1 = require("./disciplina/create");
function disciplinaRoutes(router) {
    router.get("/disciplinas", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/disciplinas/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/disciplinas/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/disciplinas/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/disciplinas", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.disciplinaRoutes = disciplinaRoutes;
