import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => (
  <div>
    <p>
      Question: {questionNr}/ {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div className="flex flex-col">
      {answers.map((answer) => (
        <div>
          <button
            className="bg-brown py-2 px-2 text-white1"
            disabled={userAnswer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;
