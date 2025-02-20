"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const Usuario_routes_1 = require("./controllers/Usuario.routes");
const Disciplina_routes_1 = require("./controllers/Disciplina.routes");
const Aula_routes_1 = require("./controllers/Aula.routes");
const AulaDisponibilidade_routes_1 = require("./controllers/AulaDisponibilidade.routes");
const DisciplinaGrade_routes_1 = require("./controllers/DisciplinaGrade.routes");
const DisciplinaProfessor_routes_1 = require("./controllers/DisciplinaProfessor.routes");
const DisponibilidadeProfessor_routes_1 = require("./controllers/DisponibilidadeProfessor.routes");
const GradeCurricular_routes_1 = require("./controllers/GradeCurricular.routes");
const Professor_routes_1 = require("./controllers/Professor.routes");
const Turma_routes_1 = require("./controllers/Turma.routes");
const TurmaGrade_routes_1 = require("./controllers/TurmaGrade.routes");
const gradeRoutes_1 = require("./controllers/gradeRoutes");
const router = (0, express_1.Router)();
exports.router = router;
(0, Usuario_routes_1.usuarioRoutes)(router);
(0, Disciplina_routes_1.disciplinaRoutes)(router);
(0, Aula_routes_1.aulaRoutes)(router);
(0, AulaDisponibilidade_routes_1.aulaDisponibilidadeRoutes)(router);
(0, DisciplinaGrade_routes_1.disciplinaGradeRoutes)(router);
(0, DisciplinaProfessor_routes_1.disciplinaProfessorRoutes)(router);
(0, DisponibilidadeProfessor_routes_1.disponibilidadeProfessorRoutes)(router);
(0, GradeCurricular_routes_1.gradeCurricularRoutes)(router);
(0, Professor_routes_1.professorRoutes)(router);
(0, Turma_routes_1.turmaRoutes)(router);
(0, TurmaGrade_routes_1.turmaGradeRoutes)(router);
(0, gradeRoutes_1.gradeRoutes)(router);
