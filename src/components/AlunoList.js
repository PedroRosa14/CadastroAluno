import React from 'react';
import { excluirAluno } from '../services/localStorageService';

const AlunoList = ({ alunos, onEditar, onExcluir }) => {
  const handleExcluir = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      excluirAluno(id); // Exclui o aluno
      onExcluir();  // Atualiza a lista de alunos após a exclusão
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Curso</th>
            <th className="text-center">Editar</th>
            <th className="text-center">Excluir</th>
          </tr>
        </thead>
        <tbody>
          {alunos.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                Nenhum aluno cadastrado
              </td>
            </tr>
          ) : (
            alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td className="text-nowrap" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {aluno.nome}
                </td>
                <td>{aluno.idade}</td>
                <td>{aluno.email}</td>
                <td>{aluno.curso}</td>
                <td className="text-center">
                  <button className="btn btn-warning btn-sm" onClick={() => onEditar(aluno)}>Editar</button>
                </td>
                <td className="text-center">
                  <button className="btn btn-danger btn-sm" onClick={() => handleExcluir(aluno.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AlunoList;
