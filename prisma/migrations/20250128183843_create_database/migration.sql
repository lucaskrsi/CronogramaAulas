-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'PROFESSOR');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "cargaHoraria" INTEGER NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" TEXT NOT NULL,
    "inicioHora" TIMESTAMP(3) NOT NULL,
    "fimHora" TIMESTAMP(3) NOT NULL,
    "diaDaSemana" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisponibilidadeProfessor" (
    "id" TEXT NOT NULL,
    "diaDaSemana" TEXT NOT NULL,
    "turno" TEXT NOT NULL,

    CONSTRAINT "DisponibilidadeProfessor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AulaDisponibilidade" (
    "id" TEXT NOT NULL,
    "aulaId" TEXT NOT NULL,
    "disponibilidadeProfessorId" TEXT NOT NULL,

    CONSTRAINT "AulaDisponibilidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplinaProfessor" (
    "id" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,

    CONSTRAINT "DisciplinaProfessor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeCurricular" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "GradeCurricular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplinaGrade" (
    "id" TEXT NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "cargaHoraria" INTEGER NOT NULL,

    CONSTRAINT "DisciplinaGrade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TurmaGrade" (
    "id" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "gradeId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "TurmaGrade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_cargaHoraria_key" ON "Professor"("cargaHoraria");

-- CreateIndex
CREATE INDEX "Aula_turmaId_idx" ON "Aula"("turmaId");

-- CreateIndex
CREATE INDEX "Aula_disciplinaId_idx" ON "Aula"("disciplinaId");

-- CreateIndex
CREATE INDEX "AulaDisponibilidade_aulaId_idx" ON "AulaDisponibilidade"("aulaId");

-- CreateIndex
CREATE INDEX "AulaDisponibilidade_disponibilidadeProfessorId_idx" ON "AulaDisponibilidade"("disponibilidadeProfessorId");

-- CreateIndex
CREATE INDEX "DisciplinaProfessor_disciplinaId_idx" ON "DisciplinaProfessor"("disciplinaId");

-- CreateIndex
CREATE INDEX "DisciplinaGrade_gradeId_idx" ON "DisciplinaGrade"("gradeId");

-- CreateIndex
CREATE INDEX "DisciplinaGrade_disciplinaId_idx" ON "DisciplinaGrade"("disciplinaId");

-- CreateIndex
CREATE INDEX "TurmaGrade_turmaId_idx" ON "TurmaGrade"("turmaId");

-- CreateIndex
CREATE INDEX "TurmaGrade_gradeId_idx" ON "TurmaGrade"("gradeId");
