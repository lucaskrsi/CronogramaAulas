/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matricula` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "matricula" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Professor_matricula_key" ON "Professor"("matricula");
