import React, { useState, useEffect } from 'react';

const AlunoForm = ({ alunoSelecionado, onSalvar, onCancelar }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  
  const [erroNome, setErroNome] = useState('');
  const [erroIdade, setErroIdade] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroCurso, setErroCurso] = useState('');

  useEffect(() => {
    if (alunoSelecionado) {
      setNome(alunoSelecionado.nome);
      setIdade(alunoSelecionado.idade);
      setEmail(alunoSelecionado.email);
      setCurso(alunoSelecionado.curso);
    }
  }, [alunoSelecionado]);

  const validarFormulario = () => {
    let valido = true;

    // Validação do nome: só permite letras (incluindo acentos)
    if (!nome.trim()) {
      setErroNome('O nome é obrigatório.');
      valido = false;
    } else if (!/^[A-Za-zá-úÁ-Ú\s]+$/.test(nome)) {
      setErroNome('O nome só pode conter letras e espaços.');
      valido = false;
    } else {
      setErroNome('');
    }

    // Validação da idade
    if (!idade || idade <= 0) {
      setErroIdade('A idade deve ser maior que 0.');
      valido = false;
    } else {
      setErroIdade('');
    }

    // Validação do e-mail
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErroEmail('Por favor, insira um e-mail válido.');
      valido = false;
    } else {
      setErroEmail('');
    }

    // Validação do curso
    if (!curso.trim()) {
      setErroCurso('O curso é obrigatório.');
      valido = false;
    } else {
      setErroCurso('');
    }

    return valido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      const aluno = {
        nome,
        idade,
        email,
        curso,
        id: alunoSelecionado ? alunoSelecionado.id : null
      };
      onSalvar(aluno);
      setNome('');
      setIdade('');
      setEmail('');
      setCurso('');
    }
  };

  return (
    <div className="container my-4">
      <div className="card p-4 mx-auto shadow" style={{ maxWidth: '800px' }}>
        <h3 className="mb-4  titulo-form ">
          {alunoSelecionado ? 'Editar Aluno' : 'Cadastrar Aluno'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="nome" className="form-label">Nome</label>
              <input
                id="nome"
                type="text"
                className={`form-control ${erroNome ? 'is-invalid' : ''}`}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              {erroNome && <div className="invalid-feedback">{erroNome}</div>}
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="idade" className="form-label">Idade</label>
              <input
                id="idade"
                type="number"
                className={`form-control ${erroIdade ? 'is-invalid' : ''}`}
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                min={0}
                required
              />
              {erroIdade && <div className="invalid-feedback">{erroIdade}</div>}
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className={`form-control ${erroEmail ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {erroEmail && <div className="invalid-feedback">{erroEmail}</div>}
            </div>
            <div className="col-12 col-md-6 mb-3">
              <label htmlFor="curso" className="form-label">Curso</label>
              <input
                id="curso"
                type="text"
                className={`form-control ${erroCurso ? 'is-invalid' : ''}`}
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                required
              />
              {erroCurso && <div className="invalid-feedback">{erroCurso}</div>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {alunoSelecionado ? 'Atualizar' : 'Cadastrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlunoForm;
