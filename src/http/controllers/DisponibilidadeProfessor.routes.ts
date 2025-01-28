import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./disponibilidade-professor/get-all";
import { get } from "./disponibilidade-professor/get";
import { remove } from "./disponibilidade-professor/remove";
import { update } from "./disponibilidade-professor/update";
import { create } from "./disponibilidade-professor/create";

export function disponibilidadeProfessorRoutes(router: Router):void{
    router.get("/disponibilidades-professores", [ensureAuthenticated], getAll);
    router.get("/disponibilidades-professores/:id", [ensureAuthenticated], get);
    router.delete("/disponibilidades-professores/:id", [ensureAuthenticated], remove);
    router.put("/disponibilidades-professores/:id", [ensureAuthenticated], update);
    router.post("/disponibilidades-professores", [ensureAuthenticated], create);
}