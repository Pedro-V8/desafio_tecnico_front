import React, { useState, useEffect } from 'react';
import './PeopleList.css';

import { parse, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useNavigate } from 'react-router-dom';


function PeopleList() {
  const [people, setPeople] = useState([]);
  const [peopleDetail, setPeopleDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  // Função para carregar os dados da API de backend
  const fetchPeopleData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/list_pessoas'); // Substitua pela URL da sua API
      const data = await response.json();
      
      setPeople(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const updatePeopleList = async () => {
    await fetchPeopleData();
  };

  const handleDelete = async personId => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/delete_pessoa/${personId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Registro excluído com sucesso! Atualizando...');
        
        updatePeopleList();
      } else {
        console.error('Erro ao excluir registro');
      }
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
    }
  };


  const handleNavigateToDetails = person => {
    navigate(`/people/${person.id_pessoa}`, { state: { person } });
  };

  const handleNavigateToEdit = person => {
    navigate(`/people/edit/${person.id_pessoa}`, { state: { person } });
  };

  const handleNavigateToCreate = () => {
    navigate('/create_pessoa');
  }

  useEffect(() => {
    fetchPeopleData();
  }, []);

  /*useEffect(() => {

    
    const fetchAndCacheData = async () => {
      try {
        
        const response = await fetch('http://127.0.0.1:5001/list_pessoas');
        const data = await response.json();
        
        setPeople(data);
        localStorage.setItem('peopleData', JSON.stringify(data));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    const cachedData = localStorage.getItem('peopleData');
    console.log(cachedData);
    if (cachedData === null) {
        fetchAndCacheData();
    } else {
        
        setPeople(JSON.parse(cachedData));
    }
  }, []);*/

  return (
    <div>
      <h1 className="title">Lista de Pessoas</h1>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <img src="https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif" alt="GIF de carregamento" width="480" height="270" />
        </div>

      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data de Admissão</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              <tr key={person.id}>
                <td>{person.nome.split(' ')[0]}</td>
                <td>{format(parse(person.data_admissao, "EEE, dd MMM yyyy HH:mm:ss 'GMT'", new Date()), "dd/MM/yyyy", { locale: ptBR })}</td>
                <td>
                  <button onClick={() => handleNavigateToDetails(person)}>Ver Mais</button>
                  <button onClick={() => handleNavigateToEdit(person)}>Editar</button>
                  <button onClick={() => handleDelete(person.id_pessoa)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <button className="formButton" onClick={() => handleNavigateToCreate()}>Cadastrar Pessoa</button>
    </div>
  );
}

export default PeopleList;
