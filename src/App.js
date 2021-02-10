import React from 'react';
import './styles/main.css';
import { Board } from './components/Board';

function getSortedCards() {
  const cards = [];
  let id = 1;

  for (let cardValue = 1; cardValue <= 8; cardValue++) {
    cards.push({ id: id++, value: cardValue });
    cards.push({ id: id++, value: cardValue });
  }
  return cards.sort(() => Math.random() - 0.5);
}

function App() {
  const [cards, setCards] = React.useState([]);
  const [flipped, setFlipped] = React.useState({ firstCardID: null, secondCardID: null }); // latest flippes
  const [solved, setSolved] = React.useState([]); // array of solved cards
  const [disabled, setDisabled] = React.useState(false); // disable to click on cards(for animation)

  // initial deck
  React.useEffect(() => {
    setCards(getSortedCards());
  }, []);

  // Reset game if it has finished
  React.useEffect(() => {
    if (solved.length && solved.length === cards.length) {
      alert('Successfully finished');
      setCards(getSortedCards());
      setSolved([]);
      setFlipped({ firstCard: null, secondCard: null });
      setDisabled(false);
    }
  }, [solved]);

  const handleCardFlip = (id) => {
    setDisabled(true);
    // set first flip
    if (!flipped.firstCardID) {
      setFlipped({ ...flipped, firstCardID: id });
      setDisabled(false);
    } else {
      if (sameCardClicked(id)) return setDisabled(false);
      setFlipped({ ...flipped, secondCardID: id });
      // Check for cards equal
      if (isMatch(id)) {
        setSolved([...solved, flipped.firstCardID, id]);
        resetCards();
      } else {
        setTimeout(resetCards, 2000);
      }
    }
  };

  const resetCards = () => {
    setFlipped({ firstCard: null, secondCard: null });
    setDisabled(false);
  };

  const sameCardClicked = (id) => Object.values(flipped).indexOf(id) > -1;

  const isMatch = (id) => {
    const clickedCard = cards.find((card) => card.id === id);
    const flippedCard = cards.find((card) => flipped.firstCardID === card.id);
    return flippedCard.value === clickedCard.value;
  };

  return (
    <Board
      cards={cards}
      flipped={flipped}
      handleCardFlip={handleCardFlip}
      disabled={disabled}
      solved={solved}
    />
  );
}

export default App;
