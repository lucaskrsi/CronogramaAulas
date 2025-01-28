import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./aula-disponibilidade/get-all";
import { get } from "./aula-disponibilidade/get";
import { remove } from "./aula-disponibilidade/remove";
import { update } from "./aula-disponibilidade/update";
import { create } from "./aula-disponibilidade/create";

export function aulaDisponibilidadeRoutes(router: Router):void{
    router.get("/aulas-disponibilidades", [ensureAuthenticated], getAll);
    router.get("/aulas-disponibilidades/:id", [ensureAuthenticated], get);
    router.delete("/aulas-disponibilidades/:id", [ensureAuthenticated], remove);
    router.put("/aulas-disponibilidades/:id", [ensureAuthenticated], update);
    router.post("/aulas-disponibilidades", [ensureAuthenticated], create);
}