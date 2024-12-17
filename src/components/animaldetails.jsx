import React from 'react';
import { useLocation } from 'react-router-dom';

const AnimalDetails = () => {
  const location = useLocation();
  const animal = location.state?.animal;

  if (!animal) {
    return <p>Данные о животном не найдены</p>;
  }

  const images = Array.isArray(animal.photos) ? animal.photos : [animal.photos];

  return (
    <div className="d-flex justify-content-center align-items-center p-5" style={{ minHeight: '80vh', backgroundColor: '#f0f4f8' }}>
      <div className="card-details d-flex flex-wrap align-items-center border p-4" style={{ width: '90%', maxWidth: '1200px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)', paddingBottom: '30px' }}>
        
        {/* Блок с фотографиями */}
        <div className="image-container" style={{ width: '100%', maxWidth: '600px', marginRight: '30px' }}>
          {images.length > 0 ? (
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {images.map((photo, index) => (
                <img
                  key={index}
                  src={`https://pets.сделай.site${photo}`}
                  alt={`Фото ${index + 1}`}
                  style={{
                    height: 'auto',
                    width: '100%',
                    objectFit: 'cover',
                    maxHeight: '400px',
                    maxWidth: '100%',
                    borderRadius: '12px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                  className="animal-image"
                />
              ))}
            </div>
          ) : (
            <p style={{ color: '#999' }}>Фото отсутствуют</p>
          )}
        </div>

        {/* Блок с текстовой информацией */}
        <div className="text-container ms-4 mt-4 mt-md-0" style={{ flex: '1 1 auto' }}>
          <h5 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#333' }}>{animal.kind}</h5>
          <p><strong>ID:</strong> {animal.id}</p>
          <p><strong>Имя:</strong> {animal.name}</p>
          <p><strong>Телефон:</strong> {animal.phone}</p>
          <p><strong>Почта:</strong> {animal.email || "Не указана"}</p>
          <p><strong>Описание:</strong> {animal.description}</p>
          <p><strong>Номер чипа:</strong> {animal.mark || "Не указан"}</p>
          <p><strong>Район:</strong> {animal.district}</p>
          <p><strong>Дата:</strong> {animal.date}</p>

          {/* Кнопка назад */}
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              borderRadius: '12px',
              padding: '12px 25px',
              fontWeight: '600',
              transition: 'all 0.3s ease-in-out',
            }}
            onClick={() => window.history.back()}
          >
            Назад к списку
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;
