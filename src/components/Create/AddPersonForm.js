import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';


function AddPersonForm({ updatePeopleList }) {
  const [newPerson, setNewPerson] = useState({
    nome: '',
    rg: '',
    cpf: '',
    data_nascimento: '',
    data_admissao: '',
    funcao: ''
  });

  const navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewPerson(prevPerson => ({ ...prevPerson, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5001/create_pessoa', newPerson, {
        headers: {
          'Content-Type': 'application/json'
        }
      });


      if (response.data.error) { 

        alert(response.data.error);
      } else {

        setNewPerson({
          nome: '',
          rg: '',
          cpf: '',
          data_nascimento: '',
          data_admissao: '',
          funcao: ''
        });

        alert('Dados enviados com sucesso!');
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };


  return (
    <div>
      <h2 className="title">Adicionar Nova Pessoa</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={newPerson.nome}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          RG:
          <input
            type="text"
            name="rg"
            value={newPerson.rg}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            value={newPerson.cpf}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Data de Nascimento:
          <input
            type="date"
            name="data_nascimento"
            value={newPerson.data_nascimento}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Data de Admissão:
          <input
            type="date"
            name="data_admissao"
            value={newPerson.data_admissao}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Função:
          <input
            type="text"
            name="funcao"
            value={newPerson.funcao}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Adicionar</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default AddPersonForm;
