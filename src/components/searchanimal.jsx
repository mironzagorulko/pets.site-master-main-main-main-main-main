import React, { useState, useEffect } from "react";
import Card from "./card_animalsearch";
import AdDetails from "./animaldetailsearch";

const Searchforads = () => {
  const [district, setDistrict] = useState("Невский");
  const [kind, setKind] = useState("");
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAd, setSelectedAd] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const itemsPerPage = 10; 

  // Fetch ads from the API
  const fetchAds = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const response = await fetch(
        `https://pets.сделай.site/public/api/search/order?district=${district}&kind=${kind}`,
        requestOptions
      );
      const data = await response.json();
      if (response.ok) {
        setAds(data.data.orders);
      } else {
        setAds([]);
      }
    } catch (err) {
      setError("Error fetching ads.");
    } finally {
      setIsLoading(false);
    }
  };

  const searchAds = () => {
    fetchAds();
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const selectAd = (ad) => {
    setSelectedAd(ad);
    openAnimalCard(ad.id);
  };

  const openAnimalCard = async (animalId) => {
    try {
      const response = await fetch(`https://pets.сделай.site/api/pets/${animalId}`);
      const data = await response.json();
      setSelectedAnimal(data.data.pet);
    } catch (error) {
      console.error("Error fetching detailed pet data:", error);
    }
  };

  const closeAd = () => {
    setSelectedAd(null);
    setSelectedAnimal(null);
  };

  const indexOfLastAd = currentPage * itemsPerPage;
  const indexOfFirstAd = indexOfLastAd - itemsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div>
      <div className="search-box text-center text-white bg-primary me-2 p-2">
        <h3>Поиск по объявлениям</h3>
        <div className="d-flex flex-wrap justify-content-center">
          <input
            type="text"
            className="form-control w-25 me-2"
            placeholder="Район"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <input
            type="text"
            className="form-control w-25 me-2"
            placeholder="Тип животного"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          />
          <button onClick={searchAds} className="btn btn-light me-2">
            Поиск
          </button>
        </div>
      </div>

      <div>
        {selectedAnimal ? (
          <AdDetails key={selectedAnimal.id} selectedAd={selectedAnimal} closeAd={closeAd} />
        ) : (
          <>
            <div className="d-flex flex-wrap justify-content-center">
              {isLoading ? (
                <p className="text-center" style={{ height: "620px" }}>
                  Loading ads...
                </p>
              ) : error ? (
                <p className="text-center" style={{ height: "620px", color: "red" }}>
                  {error}
                </p>
              ) : currentAds.length === 0 ? (
                <p className="text-center" style={{ height: "620px" }}>
                  Не найдено.
                </p>
              ) : (
                currentAds.map((pet) => (
                  <Card key={pet.id} pet={pet} onClick={() => selectAd(pet)} />
                ))
              )}
            </div>

            {ads.length > itemsPerPage && (
              <nav aria-label="pagination" className="m-auto">
                <ul className="pagination pagination-lg justify-content-center">
                  {Array.from({ length: Math.ceil(ads.length / itemsPerPage) }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                    >
                      <button className="page-link" onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Searchforads;
