import React from 'react'

type Props = {
    question: string;
    answers: string[];// array of stings
    callback:any;
    userAnswer:any;
    questionNr:number;
    totalQuestions:number; 
}

const QuestionCard: React.FC<Props> = ({
    question,answers,callback,userAnswer,questionNr,totalQuestions
}) => {
  return (
    <div>
        <p className='text-sm'>
        Question: {questionNr} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html:question}}>
           {answers.map( answer=>(
            <div>
                <button disabled={userAnswer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html:answer}}/>
                </button>
            </div>
           ))}
        </p>
    </div>
  )
}

export default QuestionCard