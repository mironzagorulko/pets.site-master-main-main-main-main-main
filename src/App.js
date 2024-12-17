import React from 'react';
import MainPage from '../src/pages/mainpage';
import Add_animal from '../src/pages/add_animal';
import Owner from '../src/pages/owner';
import Search from '../src/pages/search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimalDetails from './components/animaldetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<MainPage />} />
          
          {/* Страница добавления объявления */}
          <Route path="/add_animal" element={<Add_animal/>} />
          
          {/* Личный кабинет */}
          <Route path="/owner" element={<Owner />} />
          
          {/* Страница поиска */}
          <Route path="/search" element={<Search />} />
          
          <Route path="/animaldetails/:id" element={<AnimalDetails />} />
         

        </Routes>
      </div>
      </Router>
  );
}



export default App;
