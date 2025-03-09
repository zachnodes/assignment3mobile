import React from 'react';
import cardStyles from '../styles/Card.module.css'


const Card = ({suit, value, isPicked, onClick}) => {
    return (
        <div className={`${cardStyles.card} ${isPicked ? cardStyles.picked : ""}`} onClick={onClick}>
            <span className={cardStyles.cardValue}>{value}</span>
            <span className={cardStyles.cardSuit}>{suit}</span>
        </div>
    );
}

export default Card;
