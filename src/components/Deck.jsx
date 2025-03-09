import React from 'react';
import { useState } from 'react';
import Card from './Card';
import deckStyles from '../styles/Deck.module.css'

const genDeck = () => {
    const suits = ["♥", "♦", "♣", "♠"]
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    const deck = []
    for (let i = 0; i < suits.length; i++) {
        
        for (let j = 0; j < values.length; j++) {
            deck.push({suit: suits[i], value: values[j]})
        }
    }

    return deck
}

const Deck = () => {
    const [deck, setDeck] = useState(genDeck())
    const [selectedCards, setSelectedCards] = useState([])
    
    
    const handleDeckClick = () => {

      if (deck.length === 0) return
    
      const randomIndex = Math.floor(Math.random() * deck.length)
      const selectedCard = deck[randomIndex]
      
      
      const newDeck = [...deck];
      newDeck.splice(randomIndex, 1)
      
      
      setDeck(newDeck)
      setSelectedCards((prevCards) => [...prevCards, selectedCard])
        
    }

    const dealCards = (num) => {
      const remainingDeck = [...deck]
      const dealtCards = []

      
      for (let i = 0; i < num; i++) {
        const randomIndex = Math.floor(Math.random() * remainingDeck.length)
        dealtCards.push(remainingDeck.splice(randomIndex, 1)[0])
      }

    
      setSelectedCards(dealtCards)
      setDeck(remainingDeck)
    }
    const resetDeck = () => {
      setDeck(genDeck()); // Your function to generate a fresh deck
      setSelectedCards([]); // Reset selected cards
    };


    return (
        <div>
            <div className={deckStyles.deckContainer}>
                {/* Render the deck cards */}
                <div className={deckStyles.deck} onClick={() => handleDeckClick()}>
                {deck.length === 0 ? "No cards remaining" : "Deck"}
                </div>

                {/* Deal 5 or 7 cards buttons */}
                <button onClick={() => dealCards(5)}>Deal 5</button>
                <button onClick={() => dealCards(7)}>Deal 7</button>

                {/* Reset and Toss buttons */}
                <button onClick={() => resetDeck()}>Reset</button>
                <button>Toss</button>
                <button>Regroup</button>
                <button>Wildcard</button>
            </div>

        {/* Render the selected cards */}
        <div className={deckStyles.selectedCards}>
            {selectedCards.map((card, index) => (
            <Card
                key={index}
                suit={card.suit}
                value={card.value}
            />
            ))}
        </div>
    </div>
    )
}


    


export default Deck;
