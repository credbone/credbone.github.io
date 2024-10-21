// MemoryGame.tsx
import React, { useState, useEffect } from "react";
//import "./MemoryGame.css"; // Include some basic styles

const emojiList = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🍑", "🍓"];

const shuffleArray = (array: string[]) => {
  return [...array, ...array]
    .sort(() => Math.random() - 0.5)
    .map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState(shuffleArray(emojiList));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);
      const [firstIdx, secondIdx] = flippedCards;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.emoji === secondCard.emoji) {
        setCards(prevCards =>
          prevCards.map((card, idx) =>
            idx === firstIdx || idx === secondIdx ? { ...card, matched: true } : card
          )
        );
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((card, idx) =>
              idx === firstIdx || idx === secondIdx ? { ...card, flipped: false } : card
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
      setIsDisabled(false);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index: number) => {
    if (isDisabled || cards[index].flipped || cards[index].matched) return;

    const updatedCards = cards.map((card, idx) =>
      idx === index ? { ...card, flipped: true } : card
    );

    setCards(updatedCards);
    setFlippedCards([...flippedCards, index]);
  };

  const resetGame = () => {
    setCards(shuffleArray(emojiList));
    setFlippedCards([]);
    setIsDisabled(false);
  };

  return (
    <group className="memory-game">
      
      <group data-type="grid" data-grid-template="4" data-gap="5">
        {cards.map((card, index) => (
          <group
data-ratio="2:3"
          data-interactive=""
          data-background="highlight"
          data-radius="5"
          data-animation-name="appear-bottom"
          data-fill-mode="backwards"
          data-animation-duration={2 + index * 0.25}


          data-align="center"
            key={index}
            className={` ${card.flipped || card.matched ? "flipped" : ""}`}
            onClick={() => handleCardClick(index)}
          >
          <text>  {card.flipped || card.matched ? card.emoji : "❓"}</text>
          </group>
        ))}
      </group>
      <button onClick={resetGame}>Restart</button>
    </group>
  );
};

export default MemoryGame;
