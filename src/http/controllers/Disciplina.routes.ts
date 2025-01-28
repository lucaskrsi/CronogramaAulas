import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./disciplina/get-all";
import { get } from "./disciplina/get";
import { remove } from "./disciplina/remove";
import { update } from "./disciplina/update";
import { create } from "./disciplina/create";

export function disciplinaRoutes(router: Router):void{
    router.get("/disciplinas", [ensureAuthenticated], getAll);
    router.get("/disciplinas/:id", [ensureAuthenticated], get);
    router.delete("/disciplinas/:id", [ensureAuthenticated], remove);
    router.put("/disciplinas/:id", [ensureAuthenticated], update);
    router.post("/disciplinas", [ensureAuthenticated], create);
}