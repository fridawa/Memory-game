import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import blue from "../images/blue.png";
import boots from "../images/boots.png";
import brown from "../images/brown.png";
import green from "../images/green.png";
import lilac from "../images/lilac.png";
import orange from "../images/orange.png";
import pink from "../images/pink.png";
import yellow from "../images/yellow.png";
import blank from "../images/blank.png";

// inspo: https://github.com/olepetterkh91/memory-game/blob/master/src/components/MemoryGame.jsx
// https://github.com/lundborgm/fuzzy-memory/blob/master/script.js

const MemoryGame = () => {
  const blankCard = blank;
  const [images, setImages] = useState([
    blue,
    boots,
    brown,
    green,
    lilac,
    orange,
    pink,
    yellow,
  ]);

  const [cardsChosen, setCardsChosen] = useState([]);
  const [cardsChosenIds, setCardsChosenIds] = useState([]);
  const [points, setPoints] = useState(0);
  const [wrong, setWrong] = useState(0);

  const [openCards, setOpenCards] = useState([]);
  const [score, setScore] = useState([]);

  //Creates the board, duplicates the cards,
  // runs shuffleArray with the duplicated images
  // and sets the shuffled deck to images
  function createBoard() {
    const imagesGenerated = images?.concat(...images);
    const shuffledArray = shuffleArray(imagesGenerated);
    setImages(shuffledArray);
  }

  // shuffles the array from imagesGenerated
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function flipImage(image, index) {
    // CHECK IF IMAGE IS SELECTED
    console.log(image, index);

    if (cardsChosenIds?.length === 1 && cardsChosenIds[0] === index) {
      return;
    }

    if (cardsChosen?.length < 2) {
      setCardsChosen((cardsChosen) => cardsChosen?.concat(image));
      setCardsChosenIds((cardsChosenIds) => cardsChosenIds?.concat(index));

      if (cardsChosen?.length === 1) {
        if (cardsChosen[0] === image) {
          setPoints((points) => points + 2);
          setOpenCards((openCards) =>
            openCards?.concat([cardsChosen[0], image])
          );
        }
        setTimeout(() => {
          setCardsChosenIds([]);
          setCardsChosen([]);
          setWrong(wrong + 1);
        }, 700);
      }
    }
  }

  function isCardChosen(image, index) {
    return cardsChosenIds?.includes(index) || openCards?.includes(image);
  }

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array);
    return array;
  }

  function startOver() {
    setCardsChosenIds([]);
    setCardsChosen([]);
    setPoints(0);
    setWrong(0);
    setOpenCards([]);
    setScore([]);
  }

  // sets the board only once bc the empty hook
  useEffect(() => {
    createBoard();
  }, []);

  //Resets after om efter X antal poäng.
  if (points == images.length) {
    // setTimeout(startOver, 700);
    setTimeout(() => {
      setScore("Conratulations you completed the game :)");
    }, 500);
  }

  return (
    <div>
      <Container className="container">
        <h2>Memory Game</h2>
        <Row className="d-flex align-items-center">
          <Col>
            {" "}
            <h3>Points: {points}</h3>
          </Col>
          <Col>
            {" "}
            <h3>Wrong guesses: {wrong}</h3>
          </Col>
          <Col>
            {" "}
            <Button
              style={{
                backgroundColor: "rgb(15, 15, 15)",
                fontSize: "1.3em",
                color: "rgb(255, 189, 189)",
                borderColor: "rgb(255, 189, 189)",
              }}
              className="pt-0 pb-0"
              onClick={startOver}
            >
              Start over
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">{score}</Row>

        <Row>
          {images.map((image, index) => {
            return (
              <div
                className="col-3 m-0 p-0"
                key={index}
                onClick={() => flipImage(image, index)}
              >
                <img
                  src={isCardChosen(image, index) ? image : blankCard}
                  alt=""
                  className="p-1"
                />
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};
export default MemoryGame;
