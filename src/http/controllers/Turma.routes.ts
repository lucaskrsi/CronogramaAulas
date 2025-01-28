import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./turma/get-all";
import { get } from "./turma/get";
import { remove } from "./turma/remove";
import { update } from "./turma/update";
import { create } from "./turma/create";

export function turmaRoutes(router: Router):void{
    router.get("/turmas", [ensureAuthenticated], getAll);
    router.get("/turmas/:id", [ensureAuthenticated], get);
    router.delete("/turmas/:id", [ensureAuthenticated], remove);
    router.put("/turmas/:id", [ensureAuthenticated], update);
    router.post("/turmas", [ensureAuthenticated], create);
}