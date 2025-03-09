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
    const [pickedCardIndex, setPickedCardIndex] = useState(null)
    
    
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
      setDeck(genDeck())
      setSelectedCards([])
    }

    const handleCardClick = (index) => {
      if (pickedCardIndex === null) {
        
        setPickedCardIndex(index)
      } else {
        if (pickedCardIndex === index) {
          
          setPickedCardIndex(null)
        } else {
          
          const newSelectedCards = [...selectedCards]
          
          const temp = newSelectedCards[pickedCardIndex]
          newSelectedCards[pickedCardIndex] = newSelectedCards[index]
          newSelectedCards[index] = temp
          setSelectedCards(newSelectedCards)

          setPickedCardIndex(index)
        }
      }
    }

    const tossCard = () => {
      if (pickedCardIndex !== null) {
        const newSelectedCards = selectedCards.filter((_, index) => index !== pickedCardIndex)
        setSelectedCards(newSelectedCards)
        setPickedCardIndex(null)
      }
    }

    const shuffleCards = () => {
      const shuffledCards = [...selectedCards]

      let i = shuffledCards.length - 1
      while (i > 0) {
        const j = Math.floor(Math.random() * (i + 1))
        // Swap the elements
        const temp = shuffledCards[i]
        shuffledCards[i] = shuffledCards[j]
        shuffledCards[j] = temp
        i--
      }
      setSelectedCards(shuffledCards)
    }
    
    const handleRegroupClick = () => {
      shuffleCards()
    }


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
                <button onClick={() => tossCard()}>Toss</button>
                <button onClick={() => handleRegroupClick()}>Regroup</button>
                <button>Wildcard</button>
            </div>

        {/* Render the selected cards */}
        <div className={deckStyles.selectedCards}>
            {selectedCards.map((card, index) => (
            <Card
                key={index}
                suit={card.suit}
                value={card.value}
                isPicked={pickedCardIndex === index}  
                onClick={() => handleCardClick(index)}  
            />
            ))}
        </div>
    </div>
    )
}


    


export default Deck;
