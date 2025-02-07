import { IProfessor } from "./models/interfaces/Professor.interface";
import { IDisciplina } from "./models/interfaces/Disciplina.interface";
import { IDisciplinaProfessor } from "./models/interfaces/DisciplinaProfessor.interface";
import { IDisponibilidadeProfessor } from "./models/interfaces/DisponibilidadeProfessor.interface";

interface HorarioAula {
    disciplina: string;
    professor: string;
}

// Função para gerar a grade horária automaticamente
export function gerarGradeHoraria(
    disciplinasProfessores: IDisciplinaProfessor[],
    disponibilidadeProfessores: IDisponibilidadeProfessor[]
): HorarioAula[][] {
    const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
    const horarios = ["07:00 - 08:30", "08:40 - 10:10", "10:20 - 11:50", "13:00 - 14:30", "14:40 - 16:10", "16:20 - 17:50"];

    // Armazena professores disponíveis por disciplina
    const professoresPorDisciplina: Record<string, IProfessor[]> = {};

    disciplinasProfessores.forEach((dp) => {
        const disciplinaId = dp.getDisciplina().getId();

        if (!professoresPorDisciplina[disciplinaId]) {
            professoresPorDisciplina[disciplinaId] = [];
        }
        professoresPorDisciplina[disciplinaId].push(dp.getProfessor());
    });

    // Criando a grade horária
    const gradeHoraria: HorarioAula[][] = [];

    diasDaSemana.forEach((dia) => {
        const horarioDia: HorarioAula[] = [];

        horarios.forEach((horario, index) => {
            if (index === 2) {
                // Terceiro horário é o intervalo
                horarioDia.push({ disciplina: "Intervalo", professor: "" });
                return;
            }

            // Filtrar professores disponíveis no dia
            const professoresDisponiveis = disponibilidadeProfessores.filter(
                (d) => d.getDiaDaSemana() === dia && professoresPorDisciplina[d.getProfessor().getId()]
            );

            if (professoresDisponiveis.length > 0) {
                const professorSelecionado = professoresDisponiveis[0].getProfessor();
                const disciplina = professoresPorDisciplina[professorSelecionado.getId()][0];

                horarioDia.push({
                    disciplina: disciplina.getNome(),
                    professor: professorSelecionado.getNome()
                });

                // Removendo professor da lista para não repetir excessivamente
                professoresPorDisciplina[professorSelecionado.getId()] = professoresPorDisciplina[professorSelecionado.getId()].slice(1);
            } else {
                // Se não houver professor disponível, deixar vazio
                horarioDia.push({ disciplina: "Nenhuma", professor: "" });
            }
        });

        gradeHoraria.push(horarioDia);
    });

    return gradeHoraria;
}
