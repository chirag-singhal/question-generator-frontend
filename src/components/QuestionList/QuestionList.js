import React from 'react';

function QuestionList(props) {
  const { questions } = props;

  return (
    <div className="mt-5">
      <h1 className='text-center mb-3'>Generated Questions:</h1>
      <ul>
        {questions.map(question => (
          <li key={question}>{question}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;