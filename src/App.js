import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PeopleList from './components/List/PeopleList';
import PeopleDetail from './components/Detail/PeopleDetail'; 
import PeopleEdit from './components/Edit/PeopleEdit'; 
import AddPersonForm from './components/Create/AddPersonForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PeopleList />} />
        <Route path="/create_pessoa" element={<AddPersonForm />} />
        <Route path="/people/:id" element={<PeopleDetail />} />
        <Route path="/people/edit/:id" element={<PeopleEdit />} />
        
      </Routes>
    </Router>
  );
}

export default App;
