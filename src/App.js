import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importe também o componente `Routes`
import PeopleList from './PeopleList';
import PeopleDetail from './PeopleDetail'; 
import PeopleEdit from './PeopleEdit'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PeopleList />} />
        <Route path="/people/:id" element={<PeopleDetail />} />
        <Route path="/people/edit/:id" element={<PeopleEdit />} />
        
      </Routes>
    </Router>
  );
}

export default App;
