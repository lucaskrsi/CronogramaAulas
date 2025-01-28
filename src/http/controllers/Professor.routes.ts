import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./professor/get-all";
import { get } from "./professor/get";
import { remove } from "./professor/remove";
import { update } from "./professor/update";
import { create } from "./professor/create";

export function professorRoutes(router: Router):void{
    router.get("/professors", [ensureAuthenticated], getAll);
    router.get("/professors/:id", [ensureAuthenticated], get);
    router.delete("/professors/:id", [ensureAuthenticated], remove);
    router.put("/professors/:id", [ensureAuthenticated], update);
    router.post("/professors", [ensureAuthenticated], create);
}