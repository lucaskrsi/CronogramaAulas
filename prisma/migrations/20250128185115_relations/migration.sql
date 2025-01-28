/*
  Warnings:

  - You are about to drop the column `classId` on the `TurmaGrade` table. All the data in the column will be lost.
  - Added the required column `professorId` to the `DisciplinaProfessor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `professorId` to the `DisponibilidadeProfessor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DisciplinaProfessor" ADD COLUMN     "professorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DisponibilidadeProfessor" ADD COLUMN     "professorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TurmaGrade" DROP COLUMN "classId";

-- CreateIndex
CREATE INDEX "DisciplinaProfessor_professorId_idx" ON "DisciplinaProfessor"("professorId");

-- CreateIndex
CREATE INDEX "DisponibilidadeProfessor_professorId_idx" ON "DisponibilidadeProfessor"("professorId");
