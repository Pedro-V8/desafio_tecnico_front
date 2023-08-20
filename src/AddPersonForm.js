import React, { useState } from 'react';

function AddPersonForm({ updatePeopleList }) {
  const [newPerson, setNewPerson] = useState({
    nome: '',
    rg: '',
    cpf: '',
    data_nascimento: '',
    data_admissao: '',
    funcao: ''
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewPerson(prevPerson => ({ ...prevPerson, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5001/create_pessoa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPerson)
      });

      if (response.ok) {
        // Sucesso! Faça algo após o envio dos dados
        console.log('Dados enviados com sucesso!');
        setNewPerson({
          nome: '',
          rg: '',
          cpf: '',
          data_nascimento: '',
          data_admissao: '',
          funcao: ''
        });

        updatePeopleList();
      } else {
        console.error('Erro ao enviar dados para a API');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
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
      </form>
    </div>
  );
}

export default AddPersonForm;
