import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./disciplina-grade/get-all";
import { get } from "./disciplina-grade/get";
import { remove } from "./disciplina-grade/remove";
import { update } from "./disciplina-grade/update";
import { create } from "./disciplina-grade/create";

export function disciplinaGradeRoutes(router: Router):void{
    router.get("/disciplinas-grades", [ensureAuthenticated], getAll);
    router.get("/disciplinas-grades/:id", [ensureAuthenticated], get);
    router.delete("/disciplinas-grades/:id", [ensureAuthenticated], remove);
    router.put("/disciplinas-grades/:id", [ensureAuthenticated], update);
    router.post("/disciplinas-grades", [ensureAuthenticated], create);
}