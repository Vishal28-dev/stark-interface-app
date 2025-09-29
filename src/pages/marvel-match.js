// File: src/pages/marvel-match.js

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
// THE ONLY CHANGE IS ON THIS LINE
import Card from '../components/Card';
import styles from '@/styles/MarvelMatch.module.css';

const initialCards = [
  { id: 1, name: 'Iron Man', src: '/cards/ironman.jpg' },
  { id: 2, name: 'Captain America', src: '/cards/captainamerica.jpg' },
  { id: 3, name: 'Thor', src: '/cards/thor.jpg' },
  { id: 4, name: 'Hulk', src: '/cards/hulk.jpg' },
  { id: 5, name: 'Black Panther', src: '/cards/blackpanther.jpg' },
  { id: 6, name: 'Spider-Man', src: '/cards/spiderman.jpg' },
];

export default function MarvelMatch() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const setupGame = () => {
    const duplicatedCards = [...initialCards, ...initialCards]
      .sort(() => 0.5 - Math.random())
      .map((card, index) => ({ ...card, uniqueId: index, isFlipped: false, isMatched: false }));
    setCards(duplicatedCards);
    setFlippedCards([]);
    setIsChecking(false);
    setMoves(0);
    setIsComplete(false);
  };

  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.id === secondCard.id) {
        setCards(prevCards => {
          const newCards = prevCards.map(card =>
            card.id === firstCard.id ? { ...card, isMatched: true, isFlipped: true } : card
          );
          if (newCards.every(card => card.isMatched)) {
            setTimeout(() => setIsComplete(true), 600);
          }
          return newCards;
        });
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.uniqueId === firstCard.uniqueId || card.uniqueId === secondCard.uniqueId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          resetTurn();
        }, 1200);
      }
    }
  }, [flippedCards]);

  const resetTurn = () => {
    setFlippedCards([]);
    setIsChecking(false);
  };

  const handleCardClick = (clickedCard) => {
    if (isChecking || clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }
    setMoves(prevMoves => prevMoves + 1);
    setCards(prevCards =>
      prevCards.map(card =>
        card.uniqueId === clickedCard.uniqueId ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards(prev => [...prev, { ...clickedCard, isFlipped: true }]);
  };

  return (
    <>
      <Head>
        <title>Marvel Matching Game</title>
      </Head>
      <div className={styles.gamePage}>
        {isComplete && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h2>Congratulations!</h2>
              <p>You completed the game in {Math.floor(moves / 2)} moves.</p>
              <button onClick={setupGame} className={styles.gameButton}>Play Again</button>
            </div>
          </div>
        )}

        <div className={styles.header}>
          <h1 className={styles.title}>Marvel Memory Matrix</h1>
          <div className={styles.controls}>
            <button onClick={setupGame} className={styles.gameButton}>Reset Game</button>
            <Link href="/" legacyBehavior><a className={styles.gameButton}>Go Home</a></Link>
          </div>
        </div>
        <div className={styles.gameBoard}>
          {cards.map(card => (
            <Card key={card.uniqueId} card={card} handleCardClick={handleCardClick} />
          ))}
        </div>
        <div className={styles.footer}>
            <p>Moves: {Math.floor(moves / 2)}</p>
        </div>
      </div>
    </>
  );
}
