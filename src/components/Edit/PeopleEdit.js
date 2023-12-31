import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';


function PeopleEdit() {
  const location = useLocation();
  const person = location.state.person;
  const navigate = useNavigate();
  const [editedPerson, setEditedPerson] = useState({ ...person });

  const handleCancel = () => {
    navigate('/');
  };

  // Capturar os dados do Input
  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedPerson(prevPerson => ({ ...prevPerson, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
  
    try {
      const response = await axios.put(`http://127.0.0.1:5001/update_pessoa/${editedPerson.id_pessoa}`, editedPerson, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        alert('Dados atualizados com sucesso!');
        
        navigate('/');
      }
    } catch (error) {
      alert('Erro ao atualizar dados:', error);
    }
  };

  return (
    <div className="edit-container">
      <h2 className="title">Editar Pessoa</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={editedPerson.nome}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          RG:
          <input
            type="text"
            name="rg"
            value={editedPerson.rg}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            value={editedPerson.cpf}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Data de Nascimento:
          <input
            type="date"
            name="data_nascimento"
            value={editedPerson.data_nascimento}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Data de Admissão:
          <input
            type="date"
            name="data_admissao"
            value={editedPerson.data_admissao}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Função:
          <input
            type="text"
            name="funcao"
            value={editedPerson.funcao}
            onChange={handleInputChange}
            required
          />
        </label>
        <div className="button-container">
          <button type="submit">Salvar</button>
          <button type="button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default PeopleEdit;
