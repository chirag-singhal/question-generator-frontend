import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import QuestionList from '../QuestionList/QuestionList';

function QuestionGenerator() {
  const [paragraph, setParagraph] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setParagraph(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setQuestions([]);
    setErrorMessage('');
    fetch('https://backend-glyphic-env.eba-4jp8mcst.ap-south-1.elasticbeanstalk.com/generate_questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paragraph: paragraph
      })
    })
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        if ('error' in data)
          setErrorMessage(data.error)
        else
          setQuestions(data.questions);
      })
      .catch(error => {
        setIsLoading(false);
        setErrorMessage('Error generating questions. Please try again later.');
        console.error('Error:', error);
      });
  };

  return (
    <div className="pt-md-5 mb-5 mt-md-5 row d-flex justify-content-around main-container">
      <div className='col-md-6 d-flex justify-content-center flex-column align-items-center p-3 mr-5'>
        <h1 className="text-center mb-5">Question Generator</h1>
        <Form onSubmit={handleSubmit} className='text-center main-form'>
          <Form.Group controlId="formParagraph" >
            <Form.Label>Enter a paragraph from  wikipedia or a textbook and our AI model will generate a list of questions based on the content.</Form.Label>
            <Form.Control as="textarea" rows={5} value={paragraph} onChange={handleInputChange} className="mt-5" />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={!paragraph || isLoading} className='mt-4 p-2'>
            {isLoading ? 'Generating questions...' : 'Generate Questions'}
          </Button>
        </Form>
        {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
      </div>
      <div className='col-md-5 background d-flex justify-content-center flex-column align-items-center p-md-5'></div>
      {questions.length > 0 && 
        <QuestionList questions={questions} />
      }
    </div>
  );
}

export default QuestionGenerator;
