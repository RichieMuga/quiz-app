import React, { useState } from "react";

import { Circles } from "react-loader-spinner";
import QuestionCard from "../components/questionCard";
import { fetchQuizQuestions, Difficulty, QuestionState } from "../API";

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = e.currentTarget.value
      // check answer
      const correct = questions[number].correct_answer === answer
      // add score if answer is correct
      if (correct) setScore((prev=> prev+1)) 
      // save answers in array of answers
      const answerObject= {
        question:questions[number],
        answer,
        questions,
        correctAnswer:questions[number].correct_answer
      }
    }
  };

  const nextQuestion = () => {};
  return (
    <div className="flex flex-col">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button
          className="bg-blueTint rounded-md py-4 my-4 px-4 text-white1 w-1/12"
          onClick={startTrivia}
        >
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="text-2xl">Score:</p> : null}
      {loading ? (
        <div className="py-6">
          <Circles
            height="80"
            width="80"
            color="#080D4C"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length ===number+1 && number !== TOTAL_QUESTIONS ? (
      <button
        className="bg-blueTint rounded-md py-4 px-4 text-white1 w-1/5"
        onClick={nextQuestion}
      >
        Next Questions
      </button>
      ):null
      }
    </div>
  );
};

export default Quiz;
