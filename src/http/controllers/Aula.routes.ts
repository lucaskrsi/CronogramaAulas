import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./aula/get-all";
import { get } from "./aula/get";
import { remove } from "./aula/remove";
import { update } from "./aula/update";
import { create } from "./aula/create";

export function aulaRoutes(router: Router):void{
    router.get("/aulas", [ensureAuthenticated], getAll);
    router.get("/aulas/:id", [ensureAuthenticated], get);
    router.delete("/aulas/:id", [ensureAuthenticated], remove);
    router.put("/aulas/:id", [ensureAuthenticated], update);
    router.post("/aulas", [ensureAuthenticated], create);
}