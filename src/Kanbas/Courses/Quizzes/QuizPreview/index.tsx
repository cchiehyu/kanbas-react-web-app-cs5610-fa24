import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizQuestionRootState, QuizQuestion } from '../QuizQuestions/questionTypes';
import { fetchQuestions } from '../QuizQuestions/reducer'; 

export default function QuizPreview() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [startTime] = useState(new Date());

  // Add useEffect to fetch questions
  useEffect(() => {
    if (qid) {
      dispatch(fetchQuestions(qid) as any);
    }
  }, [qid, dispatch]);

  const questions = useSelector((state: QuizQuestionRootState) => 
    state.questionsReducer.questions.filter(q => q.quizId === qid)
  );

  

  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  // Add loading state check
  const status = useSelector((state: QuizQuestionRootState) => 
    state.questionsReducer.status
  );

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" style={{ color: '#2D3B45' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

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

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div className="p-4 text-center">
        <p>Question not found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h3>{quiz?.title}</h3>
      
      <div className="alert alert-warning mt-3">
        <i className="bi bi-exclamation-circle me-2"></i>
        This is a preview of the published version of the quiz
      </div>

      <div style={{ color: '#333', marginBottom: '20px' }}>
        <div>Started: {startTime.toLocaleString()}</div>
      </div>

      <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '20px' }}>
        Quiz Instructions
      </div>

      <div style={{ 
        backgroundColor: '#FFFFFF',
        border: '1px solid #DEE2E6',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <div style={{
          borderBottom: '1px solid #DEE2E6',
          padding: '12px 15px',
          backgroundColor: '#F8F9FA'
        }}>
          <div style={{ fontSize: '14px' }}>
            Question {currentQuestionIndex + 1}
            <span style={{ color: '#6C757D', marginLeft: '8px' }}>
              {currentQuestion.points} pts
            </span>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
            {currentQuestion.question}
          </div>
          {renderQuestionContent(currentQuestion)}
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #DEE2E6',
        paddingTop: '20px'
      }}>
        <div style={{ color: '#666', fontSize: '14px' }}>
          Quiz saved at {new Date().toLocaleTimeString()}
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              style={{
                backgroundColor: '#F8F9FA',
                border: '1px solid #DEE2E6',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              Previous
            </button>
          )}

          <button
            onClick={() => {
              if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
              } else {
                setShowQuestions(true);
              }
            }}
            style={{
              backgroundColor: '#F8F9FA',
              border: '1px solid #DEE2E6',
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit Quiz'}
          </button>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px',
        borderTop: '1px solid #DEE2E6',
        paddingTop: '20px'
      }}>
        <button
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`)}
          style={{
            border: 'none',
            background: 'none',
            color: '#666',
            padding: '0',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          <i className="fas fa-pencil-alt" style={{ marginRight: '8px' }}></i>
          Keep Editing This Quiz
        </button>
      </div>
    </div>
  );
}

