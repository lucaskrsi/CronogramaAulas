import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { login } from "./usuario/login";
import { getAll } from "./usuario/get-all";
import { get } from "./usuario/get";
import { remove } from "./usuario/remove";
import { update } from "./usuario/update";
import { create } from "./usuario/create";

export function usuarioRoutes(router: Router):void{
    router.post("/usuarios/login", login);
    router.get("/usuarios", [ensureAuthenticated], getAll);
    router.get("/usuarios/:id", [ensureAuthenticated], get);
    router.delete("/usuarios/:id", [ensureAuthenticated], remove);
    router.put("/usuarios/:id", [ensureAuthenticated], update);
    router.post("/usuarios", [ensureAuthenticated], create);
}