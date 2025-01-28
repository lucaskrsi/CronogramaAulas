import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./disciplina-professor/get-all";
import { get } from "./disciplina-professor/get";
import { remove } from "./disciplina-professor/remove";
import { update } from "./disciplina-professor/update";
import { create } from "./disciplina-professor/create";

export function disciplinaProfessorRoutes(router: Router):void{
    router.get("/disciplinas-professores", [ensureAuthenticated], getAll);
    router.get("/disciplinas-professores/:id", [ensureAuthenticated], get);
    router.delete("/disciplinas-professores/:id", [ensureAuthenticated], remove);
    router.put("/disciplinas-professores/:id", [ensureAuthenticated], update);
    router.post("/disciplinas-professores", [ensureAuthenticated], create);
}