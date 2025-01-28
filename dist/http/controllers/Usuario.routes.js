"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoutes = void 0;
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const login_1 = require("./usuario/login");
const get_all_1 = require("./usuario/get-all");
const get_1 = require("./usuario/get");
const remove_1 = require("./usuario/remove");
const update_1 = require("./usuario/update");
const create_1 = require("./usuario/create");
function usuarioRoutes(router) {
    router.post("/usuarios/login", login_1.login);
    router.get("/usuarios", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/usuarios/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/usuarios/:id", [ensureAuthenticated_1.ensureAuthenticated], remove_1.remove);
    router.put("/usuarios/:id", [ensureAuthenticated_1.ensureAuthenticated], update_1.update);
    router.post("/usuarios", [ensureAuthenticated_1.ensureAuthenticated], create_1.create);
}
exports.usuarioRoutes = usuarioRoutes;
