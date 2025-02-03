/*
  Warnings:

  - You are about to drop the column `turno` on the `DisponibilidadeProfessor` table. All the data in the column will be lost.
  - Added the required column `fimHora` to the `DisponibilidadeProfessor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicioHora` to the `DisponibilidadeProfessor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aula" ALTER COLUMN "inicioHora" SET DATA TYPE TEXT,
ALTER COLUMN "fimHora" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "DisponibilidadeProfessor" DROP COLUMN "turno",
ADD COLUMN     "fimHora" TEXT NOT NULL,
ADD COLUMN     "inicioHora" TEXT NOT NULL;
