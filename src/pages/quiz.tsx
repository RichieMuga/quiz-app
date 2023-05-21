import React,{useState} from 'react'

import { Circles } from 'react-loader-spinner'
import QuestionCard from '../components/questionCard'
import { fetchQuizQuestions, Difficulty,QuestionState } from '../API';

const TOTAL_QUESTIONS=10;

type AnswerObject= {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
}

const Quiz = () => {
  const [loading,setLoading]=useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber]=useState(0);
  const [userAnswers,setUserAnswers]=useState<AnswerObject[]>([])
  const [score,setScore]=useState(0)
  const [gameOver,setGameOver] = useState(true)

console.log(questions);


  const startTrivia=async ()=>{
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )
    setQuestions(newQuestions);
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement> )=>{

  }

  const nextQuestion = ()=>{

  }
  return (
    <div className='flex flex-col'>
      <h1>React Quiz</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <button
        className="bg-blueTint rounded-sm py-4 px-4 text-white1"
        onClick={startTrivia}
      >
        Start
      </button>
        ):null
      }
      {!gameOver ? <p className="text-2xl">Score:</p>:null}
      { loading?
      <div className='py-6'>
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
      :
      null
      }
      {
      !loading && !gameOver && (  
      <QuestionCard
      questionNr={number+1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
      />
      )}
      <button
        className="bg-blueTint rounded-sm py-4 px-4 text-white1"
        onClick={nextQuestion}
      >
        Next Questions
      </button>
    </div>
  );
}

export default Quiz