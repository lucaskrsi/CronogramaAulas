"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarGradeHoraria = void 0;
function gerarGradeHoraria(disciplinasProfessores, disponibilidadeProfessores) {
    // Estrutura da grade (6 horários por dia, 5 dias úteis)
    const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
    const grade = {};
    diasSemana.forEach((dia) => {
        grade[dia] = [];
        // Percorre os 6 horários do dia
        for (let i = 1; i <= 6; i++) {
            if (i === 3) {
                // Terceiro horário é intervalo
                grade[dia].push({ horario: i, disciplina: "Intervalo", professor: "-" });
                continue;
            }
            // Encontrar professores disponíveis nesse dia
            const disponiveis = disponibilidadeProfessores.filter((d) => d.getDiaDaSemana() === dia);
            if (disponiveis.length > 0) {
                const professorSelecionado = disponiveis[Math.floor(Math.random() * disponiveis.length)];
                const disciplinas = disciplinasProfessores.filter((dp) => dp.getProfessor().getId() === professorSelecionado.getProfessor().getId());
                if (disciplinas.length > 0) {
                    const disciplinaSelecionada = disciplinas[Math.floor(Math.random() * disciplinas.length)];
                    grade[dia].push({
                        horario: i,
                        disciplina: disciplinaSelecionada.getDisciplina().getNome(),
                        professor: professorSelecionado.getProfessor().getNome(),
                    });
                }
                else {
                    grade[dia].push({ horario: i, disciplina: "Sem disciplina", professor: "-" });
                }
            }
            else {
                grade[dia].push({ horario: i, disciplina: "Sem professor disponível", professor: "-" });
            }
        }
    });
    return grade;
}
exports.gerarGradeHoraria = gerarGradeHoraria;
