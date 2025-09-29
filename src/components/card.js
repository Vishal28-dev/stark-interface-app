// File: src/components/Card.js

import styles from '@/styles/MarvelMatch.module.css';

const Card = ({ card, handleCardClick }) => {
  return (
    <div className={styles.card} onClick={() => handleCardClick(card)}>
      {/* FIX #1: Corrected typo from 'cardDinner' to 'cardInner' */}
      <div className={`${styles.cardInner} ${card.isFlipped ? styles.isFlipped : ''}`}>
        <div className={styles.cardFace + ' ' + styles.cardBack}>
          {/* FIX #2: Corrected the image path. Do not include 'public/'. */}
          <img src="/cards/card-back.jpg" alt="Card Back" />
        </div>
        <div className={styles.cardFace + ' ' + styles.cardFront}>
          <img src={card.src} alt={card.name} />
        </div>
      </div>
    </div>
  );
};

export default Card;