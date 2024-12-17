import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import AnimalCard from "./card_animalowner";

function Account({ onLogout, onEditAnimal, onDeleteAnimal }) {
    const [user, setUser] = useState({});
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true); // Для отслеживания состояния загрузки

    useEffect(() => {
        loadUserData();
        loadAnimalsData();
    }, []);

    // Загрузка данных пользователя
    function loadUserData() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.authToken);
        const requestOptions = {
            method: "GET",
            headers: myHeaders
        };

        fetch("https://pets.сделай.site/api/users", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const today = new Date();
                const registrationDate = new Date(result.registrationDate);
                const delta = Math.floor(
                    (today - registrationDate) / (1000 * 60 * 60 * 24)
                );

                setUser({ ...result, delta });
            });
    }

    // Загрузка списка животных с сервера
    function loadAnimalsData() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.authToken);
        const requestOptions = {
            method: "GET",
            headers: myHeaders
        };

        fetch("https://pets.сделай.site/api/users/orders", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false); // Заканчиваем загрузку
                if (result.data && result.data.orders) {
                    setAnimals(result.data.orders);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error loading animals data:", error);
            });
    }

    return (
        <div className="container mt-4">
            {/* Информация о пользователе */}
            <section className="card">
                <h3>Информация о пользователе</h3>
                <p>
                    <strong>Имя:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Телефон:</strong> {user.phone}
                </p>
                <p>
                    <strong>Дата регистрации:</strong> {user.registrationDate}
                </p>
                <p>
                    <strong>Количество дней с регистрации:</strong> {user.delta}
                </p>
                <p>
                    <strong>Количество объявлений:</strong> {user.countOrder}
                </p>
                <p>
                    <strong>Количество найденных животных:</strong> {user.countPets}
                </p>
                <Button variant="danger" onClick={onLogout}>Выйти</Button>
            </section>

            {/* Список животных */}
            <h1>Найденные животные</h1>
            <section className="d-flex flex-row flex-wrap justify-content-center">
                {loading ? (
                    <p>Загрузка...</p>
                ) : (
                    animals.length === 0 ? (
                        <p>Животные не найдены.</p>
                    ) : (
                        animals.map((animal) => (
                            <AnimalCard
                                key={animal.id}
                                animal={animal}
                                onEdit={onEditAnimal}
                                onDelete={onDeleteAnimal}
                            />
                        ))
                    )
                )}
            </section>
        </div>
    );
}

export default Account;
