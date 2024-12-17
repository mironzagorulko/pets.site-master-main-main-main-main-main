import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(''); 
  const navigate = useNavigate();

  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = 'Пожалуйста, введите корректный email.';
    }
    if (!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/)) {
      newErrors.password = 'Пароль должен быть не менее 7 символов, содержать цифру, строчную и заглавную буквы.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Отправка данных на сервер с помощью fetch
        const response = await fetch('https://pets.сделай.site/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email, 
            password: formData.password,
          }),
        });

        const data = await response.json(); 

        if (response.ok) {
          // Сервер вернул успешный ответ, извлекаем токен
          const { token } = data.data;
          // Сохраняем токен в localStorage
          localStorage.setItem('authToken', token);
          navigate('/owner'); // Переход на страницу пользователя
          onHide(); // Закрытие модального окна
        } else {
          // Сервер вернул ошибку (например, неверный логин или пароль)
          
          setLoginError('Ошибка: неверные данные.');
        }
      } catch (error) {
        
        setLoginError('Произошла ошибка. Попробуйте снова.');
      }
    }
  };

  // Обработчик изменения данных формы
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  return (
    <Modal show={show} onHide={onHide} top>
      <Modal.Header closeButton>
        <Modal.Title>Вход</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="loginForm" noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="emailInput" className="mb-3">
            <Form.Label><i className="bi bi-person" /> Логин (Email)</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Введите email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="passwordInput" className="mb-3">
            <Form.Label><i className="bi bi-lock" /> Пароль</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="rememberMe" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Запомнить меня"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" className="w-100" variant="primary">Войти</Button>

          {/* Отображаем ошибку входа */}
          {loginError && <div className="mt-3 text-danger text-center">{loginError}</div>}
        </Form>

        <div className="mt-3 text-center">
          <a href="#">Регистрация</a>{' '} | <a href="#">Забыли пароль?</a>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
