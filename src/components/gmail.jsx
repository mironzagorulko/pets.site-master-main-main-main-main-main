import React, { useState } from "react";
import "../pages/css/Gmail.css";
function Gmail() {
  const [isSubscribed, setIsSubscribed] = useState(false); // Состояние для успешной подписки

  const handleSubmit = (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    setIsSubscribed(true); // Устанавливаем состояние "подписано"

    // Убираем уведомление спустя 3 секунды
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000); // Время в миллисекундах (3000 = 3 секунды)
  };

  return (
    <div>
      <h2 className="text-center text-white bg-primary m-2">Подписка на новости</h2>
      <form onSubmit={handleSubmit} className="w-50 m-auto p-3" style={{ minWidth: 300 }}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Введите адрес электронной почты</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required // Поле обязательно для заполнения
          />
          <div id="emailHelp" className="form-text">Мы никогда не делимся Вашими e-mail ни с кем.</div>
        </div>
        <button type="submit" className="btn btn-primary">Подписаться</button>
      </form>
      {isSubscribed && (
        <div className="alert alert-success text-center mt-3 fade-in-out" role="alert">
          Вы успешно подписались на новости!
        </div>
      )}
    </div>
  );
}

export default Gmail;
