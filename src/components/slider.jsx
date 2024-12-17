import React, { useState, useEffect } from 'react';
import SliderItem from '../components/slideritem';

function Loader({ display }) {
  return (
    <div
      className="justify-content-center align-items-center"
      style={display}
    >
      <div className="fs-1 text-success">...Идет загрузка</div>
    </div>
  );
}

function Slider() {
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliderData();
  }, []);

  const fetchSliderData = async () => {
    try {
      const response = await fetch('https://pets.сделай.site/api/pets/slider');
      const data = await response.json();
      console.log('Данные от сервера:', data); // Проверить, есть ли название животного
      setSliderData(data.data.pets || []);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setLoading(false);
    }
  };

  const slides = sliderData.map((animal, index) => (
    <SliderItem
      key={index}
      image={`https://pets.сделай.site/${animal.image}`}
      title={animal.kind} // Передаем название животного
      description={animal.description} // Передаем описание
      isActive={index === 0}
    />
  ));

  const indicators = sliderData.map((_, index) => (
    <button
      key={index}
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to={index}
      className={index === 0 ? 'active' : ''}
      aria-current={index === 0 ? 'true' : undefined}
      aria-label={`Slide ${index + 1}`}
    />
  ));

  return (
    <main style={{ paddingBottom: 0 }}>
      <h2
        className="text-center text-white bg-primary mb-0 p-2 rounded"
        style={{ margin: 0 }}
      >
        Найденные животные
      </h2>
      <Loader display={{ display: loading ? 'flex' : 'none' }} />
      {!loading && (
        <div
          id="carouselExampleIndicators"
          className="carousel slide m-auto bg-light w-75 p-3 rounded shadow-lg"
          data-bs-ride="carousel"
          style={{ marginBottom: 0 }}
        >
          <div className="carousel-indicators">{indicators}</div>
          <div className="carousel-inner">{slides}</div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Предыдущий</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Следующий</span>
          </button>
        </div>
      )}
    </main>
  );
}

export default Slider;
