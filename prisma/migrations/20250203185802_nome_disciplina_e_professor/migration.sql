/*
  Warnings:

  - Added the required column `nome` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Professor_cargaHoraria_key";

-- AlterTable
ALTER TABLE "Professor" ADD COLUMN     "nome" TEXT NOT NULL;
