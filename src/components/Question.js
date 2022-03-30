import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(()=>{
    if (timeRemaining === 0) {
      onAnswered(false)
      setTimeRemaining(10)
      return 
    }
    const quizTimer = setInterval(() => {
      setTimeRemaining(timeRemaining-1)
    }, 1000);
    return function cleanup() {
      clearInterval(quizTimer)
    }
  }, [timeRemaining, onAnswered] );

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining.toString()} seconds remaining</h5>
    </>
  );
}

export default Question;
