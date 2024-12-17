import React, { useState } from "react";
import RegistrationModal from "../components/registrationmodal";
import LoginModal from "../components/loginmodal";
import logo from '../images/logo.jpg';
import { Link } from 'react-router-dom';

function Header() {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false); // Состояние для модального окна регистрации
  const [showLoginModal, setShowLoginModal] = useState(false); // Состояние для модального окна входа
  const [searchQuery, setSearchQuery] = useState(""); // Состояние для ввода поискового запроса
  const [searchResults, setSearchResults] = useState([]); // Результаты поиска

  // Функция для открытия модального окна регистрации
  const handleRegistrationModalOpen = () => {
    setShowRegistrationModal(true);
  };

  // Функция для закрытия модального окна регистрации
  const handleRegistrationModalClose = () => {
    setShowRegistrationModal(false);
  };

  // Функция для открытия модального окна входа
  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  // Функция для закрытия модального окна входа
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  // Функция для выполнения поиска
  const handleSearchClick = async () => {
    if (searchQuery.length > 2) { // Начинаем искать, если длина запроса больше 2 символов
      try {
        const response = await fetch(`https://pets.сделай.site/api/search?query=${searchQuery}`);
        const data = await response.json();
        if (response.ok) {
          setSearchResults(data.data.orders); // Обновление результатов поиска
        } else {
          setSearchResults([]); // Если нет результатов
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]); // В случае ошибки очищаем результаты
      }
    } else {
      setSearchResults([]); // Очищаем результаты при коротком запросе
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="site.html">
            <img src={logo} className="w-25 rounded-3" alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">Главная</Link>
              </li>
              <li className="nav-item">
                <button 
                  type="button" 
                  className="btn btn-link nav-link" 
                  onClick={handleLoginModalOpen}
                >
                  Вход
                </button>
              </li>
              <li className="nav-item">
                <Link to="/owner" className="nav-link">Личный кабинет</Link>
              </li>
              <li className="nav-item">
                <button 
                  type="button" 
                  className="btn btn-link nav-link" 
                  onClick={handleRegistrationModalOpen}
                >
                  Регистрация
                </button>
              </li>
              <li className="nav-item">
                <Link to="/add_animal" className="nav-link">Добавить объявление</Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className="nav-link">Поиск</Link>
              </li>
            </ul>
          </div>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Обработчик изменения текста
              list="pets"
              placeholder="Поиск"
              aria-label="Search"
            />
            <button 
              className="btn btn-primary" 
              type="button" 
              onClick={handleSearchClick} // Поиск при нажатии кнопки
            >
              Поиск
            </button>
            <datalist id="pets">
              {searchResults.map((result) => (
                <option key={result.id} value={result.description} />
              ))}
            </datalist>
          </form>
        </div>
      </nav>

      {/* Модальные окна */}
      <RegistrationModal show={showRegistrationModal} onHide={handleRegistrationModalClose} />
      <LoginModal show={showLoginModal} onHide={handleLoginModalClose} />
    </>
  );
}

export default Header;
