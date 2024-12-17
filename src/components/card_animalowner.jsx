function AnimalCard(props) {
  // Проверка правильности URL изображения
  const imageUrl = props.animal.photos && props.animal.photos.length > 0
    ? props.animal.photos[0].includes('{url}')
      ? props.animal.photos[0].replace('{url}', 'https://pets.сделай.site/api/users/orders') // Заменяем placeholder на реальный URL
      : props.animal.photos[0] // Используем первое изображение из массива (если их несколько)
    : 'https://via.placeholder.com/300x200?text=No+Image'; // Заглушка, если нет изображения

  return (
    <div
      className="card m-3"
      style={{
        width: "18rem",
        borderRadius: 15,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src={imageUrl}
        className="card-img-top"
        alt={`Рисунок ${props.animal.title}`}
        style={{
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          objectFit: "cover",
          height: 200,
        }}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error')} // Заглушка при ошибке
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center text-primary">
          {props.animal.title}
        </h5>
        <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
          {props.animal.description}
        </p>
        <ul className="list-unstyled flex-grow-1">
          <li>
            <strong>id:</strong> {props.animal.id}
          </li>
          <li>
            <strong>Номер чипа:</strong> {props.animal.chipNumber}
          </li>
          <li>
            <strong>Район:</strong> {props.animal.area}
          </li>
          <li>
            <strong>Дата:</strong> {props.animal.date}
          </li>
          <li>
            <strong>Статус:</strong> {props.animal.status}
          </li>
        </ul>
        <button
          className="btn btn-primary w-100 mt-auto"
          style={{ borderRadius: 10 }}
          onClick={() => props.onEdit(props.animal.id)}
        >
          Редактировать
        </button>
        <br />
        <button
          className="btn btn-danger w-100 mt-auto"
          style={{ borderRadius: 10 }}
          onClick={() => props.onDelete(props.animal.id)}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

export default AnimalCard;
