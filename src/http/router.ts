import { Router } from "express";
import { usuarioRoutes } from "./controllers/Usuario.routes";
import { disciplinaRoutes } from "./controllers/Disciplina.routes";
import { aulaRoutes } from "./controllers/Aula.routes";
import { aulaDisponibilidadeRoutes } from "./controllers/AulaDisponibilidade.routes";
import { disciplinaGradeRoutes } from "./controllers/DisciplinaGrade.routes";
import { disciplinaProfessorRoutes } from "./controllers/DisciplinaProfessor.routes";
import { disponibilidadeProfessorRoutes } from "./controllers/DisponibilidadeProfessor.routes";
import { gradeCurricularRoutes } from "./controllers/GradeCurricular.routes";
import { professorRoutes } from "./controllers/Professor.routes";
import { turmaRoutes } from "./controllers/Turma.routes";
import { turmaGradeRoutes } from "./controllers/TurmaGrade.routes";

const router: Router = Router();

usuarioRoutes(router);
disciplinaRoutes(router);
aulaRoutes(router);
aulaDisponibilidadeRoutes(router);
disciplinaGradeRoutes(router);
disciplinaProfessorRoutes(router);
disponibilidadeProfessorRoutes(router);
gradeCurricularRoutes(router);
professorRoutes(router);
turmaRoutes(router);
turmaGradeRoutes(router);

export { router };