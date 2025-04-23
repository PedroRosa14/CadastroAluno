import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { carregarAlunos, adicionarAluno, atualizarAluno } from './services/localStorageService';  
import AlunoForm from './components/AlunoForm';
import AlunoList from './components/AlunoList';
import './styles/global.css';

function App() {
  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

  useEffect(() => {
    setAlunos(carregarAlunos());
  }, []);

  const handleSalvarAluno = (aluno) => {
    if (aluno.id) {
      // Atualiza aluno existente
      atualizarAluno(aluno.id, aluno);
    } else {
      // Adiciona novo aluno
      adicionarAluno(aluno);
    }
    setAlunos(carregarAlunos());
    setAlunoSelecionado(null);
  };

  const handleEditarAluno = (aluno) => {
    setAlunoSelecionado(aluno);
  };

  const handleExcluirAluno = () => {
    setAlunos(carregarAlunos()); // Atualiza a lista de alunos
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 titulo">Cadastro de Alunos</h2>
      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <AlunoForm alunoSelecionado={alunoSelecionado} onSalvar={handleSalvarAluno} onCancelar={() => setAlunoSelecionado(null)} />
        </div>
        <div className="col-12 col-md-6">
          <AlunoList alunos={alunos} onEditar={handleEditarAluno} onExcluir={handleExcluirAluno} />
        </div>
      </div>
    </div>
  );
}

export default App;
