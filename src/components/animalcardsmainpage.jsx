import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnimalCard = (props) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    // Переход на страницу с деталями, передача состояния с данными о животном
    navigate(`/animaldetails/${props.data.id}`, { state: { animal: props.data } });
  };

  // Если фотографий несколько, отображаем их
  const images = Array.isArray(props.data.photos) ? props.data.photos : [props.data.photos];

  return (
    <div className="card m-3 animal-card" style={{ width: '18rem', borderRadius: 15, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="card-body d-flex flex-column">
        {/* Отображаем все фотографии */}
        <div className="d-flex flex-column mb-3">
          {images.map((photo, index) => (
            <img
              key={index}
              src={'https://pets.xn--80ahdri7a.site' + photo}
              className="card-img-top mb-2"
              alt={`Рисунок ${props.data.kind}`}
              style={{
                borderRadius: '10px',
                objectFit: 'cover',
                height: '150px',
                width: '100%',
              }}
            />
          ))}
        </div>
        <h5 className="card-title text-center text-primary">{props.data.kind}</h5>
        <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>{props.data.description}</p>
        <ul className="list-unstyled flex-grow-1">
          <li><strong>ID:</strong> {props.data.id}</li>
          <li><strong>Телефон:</strong> {props.data.phone}</li>
          <li><strong>Имя нашедшего:</strong> {props.data.name}</li>
          <li><strong>Номер чипа:</strong> {props.data.mark}</li>
          <li><strong>Район:</strong> {props.data.district}</li>
          <li><strong>Дата:</strong> {props.data.date}</li>
          <li><strong>Email:</strong> {props.data.email}</li>
        </ul>
        {/* Кнопка "Подробнее" */}
        <button className="btn btn-primary" onClick={handleViewDetails}>
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default AnimalCard;
