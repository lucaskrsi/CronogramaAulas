import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./grade-curricular/get-all";
import { get } from "./grade-curricular/get";
import { remove } from "./grade-curricular/remove";
import { update } from "./grade-curricular/update";
import { create } from "./grade-curricular/create";

export function gradeCurricularRoutes(router: Router):void{
    router.get("/grades", [ensureAuthenticated], getAll);
    router.get("/grades/:id", [ensureAuthenticated], get);
    router.delete("/grades/:id", [ensureAuthenticated], remove);
    router.put("/grades/:id", [ensureAuthenticated], update);
    router.post("/grades", [ensureAuthenticated], create);
}