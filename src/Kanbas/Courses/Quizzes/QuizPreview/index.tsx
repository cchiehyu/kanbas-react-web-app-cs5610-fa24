import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizQuestionRootState, QuizQuestion } from '../QuizQuestions/questionTypes';

export default function QuizPreview() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [startTime] = useState(new Date());

  const questions = useSelector((state: QuizQuestionRootState) => 
    state.questionsReducer.questions.filter(q => q.quizId === qid)
  );

  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const renderQuestionContent = (question: QuizQuestion) => {
    switch (question.questionType) {
      case 'MULTIPLE_CHOICE':
        return (
          <div className="mt-3">
            {question.choices?.map((choice, idx) => (
              <div key={idx} className="mb-2 d-flex align-items-start">
                <input
                  type="radio"
                  name={`question_${question._id}`}
                  className="mt-1 me-2"
                  style={{ 
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer'
                  }}
                />
                <span style={{ color: '#2D3B45', fontSize: '14px' }}>{choice.text}</span>
              </div>
            ))}
          </div>
        );
      
      case 'TRUE_FALSE':
        return (
          <div className="mt-3">
            <div className="mb-2 d-flex align-items-start">
              <input
                type="radio"
                name={`question_${question._id}`}
                className="mt-1 me-2"
                style={{ 
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ color: '#2D3B45', fontSize: '14px' }}>True</span>
            </div>
            <div className="mb-2 d-flex align-items-start">
              <input
                type="radio"
                name={`question_${question._id}`}
                className="mt-1 me-2"
                style={{ 
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              <span style={{ color: '#2D3B45', fontSize: '14px' }}>False</span>
            </div>
          </div>
        );
      
      case 'FILL_BLANK':
        return (
          <div className="mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your answer"
              style={{ maxWidth: '300px' }}
            />
          </div>
        );
    }
  };

  if (showQuestions) {
    return (
      <div className="p-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="alert alert-warning">
          <i className="fas fa-exclamation-circle me-2"></i>
          This is a preview of the published version of the quiz
        </div>
        
        <div className="mb-3">
          <strong>Started:</strong> {startTime.toLocaleString()}
        </div>

        <h5 className="mb-4">Quiz Instructions</h5>

        {questions.map((question, index) => (
          <div 
            key={question._id}
            className="d-flex align-items-center gap-2 mb-2"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setCurrentQuestionIndex(index);
              setShowQuestions(false);
            }}
          >
            <i className="far fa-square"></i>
            <span>Question {index + 1}</span>
          </div>
        ))}
        
        <div className="mt-4 d-flex align-items-center justify-content-between">
          <span>Quiz saved at {new Date().toLocaleTimeString()}</span>
          <button 
            className="btn btn-primary"
            onClick={() => setShowQuestions(false)}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div 
        style={{ 
          backgroundColor: '#FFFFFF',
          border: '1px solid #C7CDD1',
          borderRadius: '3px',
          padding: '20px',
          marginBottom: '20px'
        }}
      >
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div style={{ 
            fontSize: '14px',
            color: '#2D3B45',
            fontWeight: '500'
          }}>
            Question {currentQuestionIndex + 1}
            <span className="ms-2" style={{ color: '#73818C' }}>
              {currentQuestion.points} pts
            </span>
          </div>
        </div>

        <div 
          style={{ 
            color: '#2D3B45',
            fontSize: '14px',
            lineHeight: '1.4',
            marginBottom: '16px'
          }}
        >
          {currentQuestion.question}
        </div>

        {renderQuestionContent(currentQuestion)}
      </div>

      <div className="d-flex justify-content-end gap-2">
        {currentQuestionIndex > 0 && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
          >
            Previous
          </button>
        )}
        
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            className="btn btn-primary"
            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
          >
            Next
          </button>
        ) : (
          <button
            className="btn btn-success"
            onClick={() => setShowQuestions(true)}
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}

