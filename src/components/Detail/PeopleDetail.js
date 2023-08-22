import React from 'react';
import { useLocation , useNavigate } from 'react-router-dom'; 
import './PeopleDetail.css';

import { parse, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function PeopleDetail() {
  const location = useLocation();
  const person = location.state.person;

  const navigate = useNavigate();

  const handleDelete = async personId => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/delete_pessoa/${personId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Registro excluído com sucesso!');
        
        navigate('/'); 
      } else {
        console.error('Erro ao excluir registro');
      }
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
    }
  };

  const handleNavigateToEdit = person => {
    navigate(`/people/edit/${person.id_pessoa}`, { state: { person } });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="detail-container">
      <h2>Detalhes da Pessoa</h2>
      <p><strong>Nome:</strong> {person.nome}</p>
      <p><strong>RG:</strong> {person.rg}</p>
      <p><strong>CPF:</strong> {person.cpf}</p>
      <p><strong>Data de Nascimento:</strong> {format(parse(person.data_nascimento, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date()), "dd/MM/yyyy", { locale: ptBR })}</p>
      <p><strong>Data de Admissão:</strong> {format(parse(person.data_admissao, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date()), "dd/MM/yyyy", { locale: ptBR })}</p>

      <div className="action-buttons">
        <button className="edit-button" onClick={() => handleNavigateToEdit(person)}>Editar</button>
        <button className="delete-button" onClick={() => handleDelete(person.id_pessoa)}>Excluir</button>
        <button type="button" onClick={handleCancel}>Voltar</button>
      </div>
    </div>
  );
}

export default PeopleDetail;
