const ALUNOS_KEY = 'alunos';
const LAST_ID_KEY = 'lastId';

// Função para obter o último ID
const obterUltimoId = () => {
  const lastId = localStorage.getItem(LAST_ID_KEY);
  return lastId ? parseInt(lastId, 10) : 0;
};

// Função para atualizar o último ID
const atualizarUltimoId = (id) => {
  localStorage.setItem(LAST_ID_KEY, id);
};

// Função para carregar os alunos
export const carregarAlunos = () => {
  const alunos = localStorage.getItem(ALUNOS_KEY);
  return alunos ? JSON.parse(alunos) : [];
};

// Função para salvar os alunos no LocalStorage
export const salvarAlunos = (alunos) => {
  localStorage.setItem(ALUNOS_KEY, JSON.stringify(alunos));
};

// Função para adicionar um aluno com ID auto-incrementado
export const adicionarAluno = (aluno) => {
  const alunos = carregarAlunos();
  const novoId = obterUltimoId() + 1;
  aluno.id = novoId;
  alunos.push(aluno);
  salvarAlunos(alunos);
  atualizarUltimoId(novoId);
};

// Função para atualizar um aluno
export const atualizarAluno = (id, alunoAtualizado) => {
  const alunos = carregarAlunos();
  const index = alunos.findIndex(aluno => aluno.id === id);
  if (index !== -1) {
    alunos[index] = alunoAtualizado;
    salvarAlunos(alunos);
  }
};

// Função para excluir um aluno
export const excluirAluno = (id) => {
  const alunos = carregarAlunos();
  const alunosFiltrados = alunos.filter(aluno => aluno.id !== id);
  salvarAlunos(alunosFiltrados);
};
