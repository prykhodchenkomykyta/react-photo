import React from 'react';
import './index.scss';
import { Collection } from './Collection';

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

const categories = [
    { name: "Всі" },
    { name: "Море" },
    { name: "Гори" },
    { name: "Архітектура" },
    { name: "Міста" }
];

  React.useEffect(() => {
    const category =  categoryId ? `category=${categoryId}` : '';

    setIsLoading(true);
    fetch(`https://6354751ce64783fa828527b9.mockapi.io/CollectionOfPhotoes?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Помилка при отриманні даних');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя колекція фотографій</h1>
      <div className="top">
        <ul className="tags">
          {
            categories.map((obj, index) => (
              <li 
                onClick={() => setCategoryId(index)} 
                className={categoryId == index ? 'active' : ''} 
                key={obj.name} >
                  {obj.name}
              </li>
            ))
          }
        </ul>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} className="search-input" placeholder="Пошук за назвою" />
      </div>
      <div className="content">
        {isLoading ? (<h2> Завантаження... </h2>) : (collections
          .filter((obj) => {
          return obj.name.toLowerCase().includes(searchValue.toLowerCase())
          })
          .map((obj, index) => (
          <Collection key={index} name={obj.name} images={obj.photos} />
        )))}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, index) => (
              <li onClick={() => setPage(index + 1)} className={page == index + 1 ? 'active' : ''}>
                {index + 1}
              </li>
         ))}
      </ul>
    </div>
  );
}

export default App;
