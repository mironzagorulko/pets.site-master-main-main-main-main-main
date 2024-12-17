import React, { useState, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function RegistrationModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    password_confirmation: '',
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const error_email = useRef();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.match(/^[а-яА-ЯёЁ\s-]+$/)) {
      newErrors.name = 'Имя должно содержать только кириллицу, пробелы или дефисы.';
    }

    if (!formData.phone.match(/^\+?\d+$/)) {
      newErrors.phone = 'Телефон должен содержать только цифры и знак +.';
    }

    if (!formData.email.match(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)) {
      newErrors.email = 'Некорректный формат email.';
    }

    if (!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/)) {
      newErrors.password = 'Пароль должен быть не менее 7 символов, содержать цифру, строчную и заглавную буквы.';
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Пароли не совпадают.';
    }

    if (!formData.confirm) {
      newErrors.confirm = 'Необходимо согласие на обработку персональных данных.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(formData);
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      fetch("https://pets.сделай.site/api/register", requestOptions)
        .then((response) => response.status)
        .then((result) => {
          if (result === 422) {
            error_email.current.style.display = 'block';
          } else {
            error_email.current.style.display = 'none';
            alert('Вы успешно зарегистрировались!');

            // Закрытие модального окна
            onHide();

            // После успешной регистрации выполняем редирект на главную страницу
            navigate("/"); // Переход на главную страницу
          }
        })
        .catch((error) => {
          console.error("Ошибка при отправке данных:", error);
          alert('Произошла ошибка при отправке данных');
        });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <Modal show={show} onHide={onHide} top>
      <Modal.Header closeButton>
        <Modal.Title>Регистрация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Имя</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="phone" className="mb-3">
            <Form.Label>Телефон</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <p style={{ display: 'none', color: 'red' }} ref={error_email}>Такой адрес уже существует</p>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password_confirmation" className="mb-3">
            <Form.Label>Подтверждение пароля</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              isInvalid={!!errors.password_confirmation}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.password_confirmation}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="confirm" className="mb-3">
            <Form.Check
              type="checkbox"
              name="confirm"
              checked={formData.confirm}
              onChange={handleChange}
              label="Согласие на обработку персональных данных"
              isInvalid={!!errors.confirm}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Зарегистрироваться
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegistrationModal;
