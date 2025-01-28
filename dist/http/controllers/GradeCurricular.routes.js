"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeCurricularRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./grade-curricular/get-all");
const get_1 = require("./grade-curricular/get");
const remove_1 = require("./grade-curricular/remove");
const update_1 = require("./grade-curricular/update");
const create_1 = require("./grade-curricular/create");
function gradeCurricularRoutes(router) {
    router.get("/grades", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/grades/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/grades/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/grades/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/grades", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.gradeCurricularRoutes = gradeCurricularRoutes;
