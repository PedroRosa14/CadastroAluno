//Essas constantes definem os nomes das chaves que serão usadas para acessar e armazenar dados no localStorage
const ALUNOS_KEY = 'alunos';
const LAST_ID_KEY = 'lastId';

// Função para obter o último ID
//Lê o último ID salvo no localStorage.
const obterUltimoId = () => {
  const lastId = localStorage.getItem(LAST_ID_KEY);
  return lastId ? parseInt(lastId, 10) : 0;
};

// Função para atualizar o último ID
//Salva um novo valor de ID no localStorage.
const atualizarUltimoId = (id) => {
  localStorage.setItem(LAST_ID_KEY, id);
};

// Função para carregar os alunos
//Lê os dados da lista de alunos do localStorage.
//Se não houver, retorna um array vazio.
export const carregarAlunos = () => {
  const alunos = localStorage.getItem(ALUNOS_KEY);
  return alunos ? JSON.parse(alunos) : [];
};

// Função para salvar os alunos no LocalStorage
//Converte o array de alunos para JSON e salva no localStorage.
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
/* Carrega os alunos existentes.
Gera um novo ID incrementado.
Atribui o ID ao novo aluno.
Adiciona o aluno à lista.
Salva a lista atualizada.
Atualiza o último ID.*/
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
