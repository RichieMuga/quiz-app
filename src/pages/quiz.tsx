import React, { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import QuestionCard from "../components/questionCard";
import { fetchWithQuestions } from "../API";
import { Difficulty, QuestionState } from "../API";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const Quiz = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchWithQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    
    setQuestions(newQuestions);
    setNumber(0);
    setScore(0);
    setUserAnswers([]);
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
  const nextQuestion = () => {};

  return (
    <div>
      <h1 className="text-2xl">React Quiz</h1>
        <button
          className="text-white1 bg-brown hover:bg-brown_hover py-2 px-3 font-bold rounded-sm"
          onClick={startQuiz}
        >
          Start quiz
        </button>
      {!gameOver ? <p className="text-lg">Score: </p> : null}
      {loading && <FallingLines color="#997A4D" width="100" visible={true} />}
      {/* {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )} */}
      <button
        className="text-white1 bg-blueTint py-2 px-3 font-bold"
        onClick={nextQuestion}
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
