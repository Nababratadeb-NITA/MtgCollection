import React from 'react';
import Card from './Card';
import { useLocation } from 'react-router-dom';

export default function Collection(props) {
  const user = 'GrassFinn';
  const localStorage = window.localStorage.getItem('collection');
  const localStorageObj = JSON.parse(localStorage) || [];
  console.log(props);

  // needed to have the filter array rest at the start of the render cycle of the component
  React.useEffect(() => {
    props.setFilteredArray(props.items);
  }, []);

  let cardEle = (array) =>
    array.map((item, index) => {
      return (
        <Card
          card={item}
          img={item.image_uris.normal}
          id={index + 1}
          key={index + 1}
          removeCards={props.removeCards}
          addCards={props.addCards}
        />
      );
    });

  // user clicks a button based on the cards color
  // filter through the collection array and display the cards that are of the chosen color
  function filterByColor(color) {
    // returns an array of the cards that have the color that I am wanting

    props.setFilteredArray((prevItems) => {
      // https://www.w3schools.com/jsref/jsref_filter.asp
      const newItems = prevItems.filter((item) => item.colors.includes(color));
      // if new items is not equal to zero then we want to return the filtered array
      if (newItems.length !== 0) {
        return newItems;
      }
      //  If no elements pass the test it returns an empty array. so we need to cover that option
      return prevItems;
    });
  }

  function messages() {
    return <h2>Your Collection is Empty.</h2>;
  }

  return (
    <div>
      <h1>{user}'s Collection</h1>
      <h2>Use the buttons below to filter your cards by color!</h2>
      <button onClick={() => filterByColor('R')}>Red</button>
      <button onClick={() => filterByColor('W')}>White</button>
      <button onClick={() => filterByColor('U')}>Blue</button>
      <button onClick={() => filterByColor('B')}>Black</button>
      <button onClick={() => filterByColor('G')}>Green</button>
      {/* check if filtered array then render  or if localstorage is there and render. */}
      <div className="cards-container">
        {localStorage && cardEle(props.filteredArray || localStorageObj)}
      </div>
    </div>
  );
}
