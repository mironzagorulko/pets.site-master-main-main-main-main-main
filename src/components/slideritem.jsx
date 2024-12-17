function SliderItem(props) {
  return (
    <div className={`carousel-item ${props.isActive ? 'active' : ''}`}>
      <img
        src={props.image}
        className="d-block w-100"
        alt={props.title}
        style={{
          height: '400px',
          objectFit: 'cover',
        }}
      />
      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-3 rounded">
        <h5 className="text-light">{props.title}</h5> {/* Название животного */}
        <p className="text-light">{props.description}</p> {/* Описание */}
      </div>
    </div>
  );
}

export default SliderItem;
