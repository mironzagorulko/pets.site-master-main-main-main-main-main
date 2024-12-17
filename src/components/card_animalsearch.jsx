import React from 'react';

const Card = (props) => {
    return (
        <div className="border card m-3 d-flex flex-column" style={{ minWidth: 200, width: '20%' }}>
            <img
                src={'https://pets.сделай.site' + props.pet.photos} // Используем корректный URL для изображений
                className="card-img-top"
                alt={`рисунок ${props.pet.kind}`} // Предполагаем, что kind — это тип животного
                style={{ height: '60%', objectFit: 'contain', width: '100%' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{props.pet.kind}</h5> {/* Отображение типа животного */}
                <p className="card-text"><strong>ID:</strong> {props.pet.id}</p>
                <p className="card-text"><strong>Описание:</strong> {props.pet.description}</p>
                <p className="card-text"><strong>Номер чипа:</strong> {props.pet.mark || "Номер чипа не указан"}</p>
                <p className="card-text"><strong>Район:</strong> {props.pet.district}</p>
                <p className="card-text"><strong>Дата:</strong> {props.pet.date}</p>
                <button 
                    className="btn btn-primary mt-auto" 
                    onClick={() => props.onClick(props.pet)}
                >
                    Подробнее
                </button>
            </div>
        </div>
    );
};

export default Card;
