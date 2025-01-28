import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IAulaRepository } from "../interfaces/Aula.repository.interface";
import { IAula } from "../../models/interfaces/Aula.interface";
import { Aula } from "../../models/Aula";
import { ITurma } from "../../models/interfaces/Turma.interface";
import { IDisciplina } from "../../models/interfaces/Disciplina.interface";
import { Disciplina } from "../../models/Disciplina";
import { Turma } from "../../models/Turma";

export class AulaRepository implements IAulaRepository {

    async create(aula: IAula): Promise<IAula> {

        let aulaPrisma = await prisma.aula.create({
            data: {
                inicioHora: aula.getInicioHora(),
                fimHora: aula.getFimHora(),
                diaDaSemana: aula.getDiaDaSemana(),
                disciplinaId: aula.getDisciplina().getId(),
                turmaId: aula.getTurma().getId(),
            },
        })

        aula.setId(aulaPrisma.id);
        return aula;
    }

    async get(id: string): Promise<IAula> {
        const aulaPrisma = await prisma.aula.findUnique({
            where: {
                id: id,
            },
            include: {
                disciplina: true,
                turma: true,
            },
        })

        if (!aulaPrisma) {
            throw HttpException.NotFoundError("Aula não encontrada");
        }

        const aula = new Aula(
            aulaPrisma.inicioHora.toString(),
            aulaPrisma.fimHora.toString(),
            aulaPrisma.diaDaSemana,
            new Disciplina(
                aulaPrisma.disciplina.nome,
                aulaPrisma.disciplina.id
            ),
            new Turma(
                aulaPrisma.turma.nome,
                aulaPrisma.turma.id
            ),
            aulaPrisma.id
        );

        return aula;
    }

    async getAll(): Promise<IAula[]> {
        const aulaPrisma = await prisma.aula.findMany({
            include: {
                disciplina: true,
                turma: true,
            },
        });
        Aula.aulaList = aulaPrisma.map((aula) => {
            return new Aula(
                aula.inicioHora.toString(),
                aula.fimHora.toString(),
                aula.diaDaSemana,
                new Disciplina(
                    aula.disciplina.nome,
                    aula.disciplina.id
                ),
                new Turma(
                    aula.turma.nome,
                    aula.turma.id
                ),
                aula.id
            );
        });

        return Aula.aulaList;
    }

    async update(id: string, inicioHora?: string, fimHora?: string, diaDaSemana?: string, disciplina?: IDisciplina, turma?: ITurma): Promise<IAula> {
        let aulaPrisma = await this.get(id);

        if (!aulaPrisma) {
            throw HttpException.NotFoundError("Aula não encontrada");
        }

        let aula = await prisma.aula.update({
            where: {
                id: aulaPrisma.getId(),
            },
            data: {
                inicioHora: (typeof inicioHora == "string") ? inicioHora : aulaPrisma.getInicioHora(),
                fimHora: (typeof fimHora == "string") ? fimHora : aulaPrisma.getFimHora(),
                diaDaSemana: (typeof diaDaSemana == "string") ? diaDaSemana : aulaPrisma.getDiaDaSemana(),
                disciplinaId: (disciplina) ? disciplina.getId() : aulaPrisma.getDisciplina().getId(),
                turmaId: (turma) ? turma.getId() : aulaPrisma.getTurma().getId(),
            }
        })

        aulaPrisma.setInicioHora(aula.inicioHora.toString());
        aulaPrisma.setFimHora(aula.fimHora.toString());
        aulaPrisma.setDiaDaSemana(aula.diaDaSemana);
        return aulaPrisma;
    }

    async delete(id: string): Promise<string> {
        let aulaPrisma = await this.get(id);

        if (!aulaPrisma) {
            throw HttpException.NotFoundError("Aula não encontrada");
        }

        let aula = await prisma.aula.delete({
            where: {
                id: aulaPrisma.getId(),
            }
        })

        return aula.id.toString();
    }

}