import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./turma-grade/get-all";
import { get } from "./turma-grade/get";
import { remove } from "./turma-grade/remove";
import { update } from "./turma-grade/update";
import { create } from "./turma-grade/create";

export function turmaGradeRoutes(router: Router):void{
    router.get("/turmas-grades", [ensureAuthenticated], getAll);
    router.get("/turmas-grades/:id", [ensureAuthenticated], get);
    router.delete("/turmas-grades/:id", [ensureAuthenticated], remove);
    router.put("/turmas-grades/:id", [ensureAuthenticated], update);
    router.post("/turmas-grades", [ensureAuthenticated], create);
}