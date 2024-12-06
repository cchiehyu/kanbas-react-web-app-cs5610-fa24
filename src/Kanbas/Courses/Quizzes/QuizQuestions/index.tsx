import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from './reducer';
import { QuizQuestionRootState, QuizQuestion } from './questionTypes';
import QuestionEditor from './Editor';

interface QuizQuestionsProps {
  quizId: string;
}

export default function QuizQuestions({ quizId }: QuizQuestionsProps) {
  const { qid } = useParams();
  const dispatch = useDispatch();
  const [showEditor, setShowEditor] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | undefined>();

  const questions = useSelector((state: QuizQuestionRootState) => 
    state.questionsReducer.questions.filter(q => q.quizId === qid)
  );
  
  const status = useSelector((state: QuizQuestionRootState) => 
    state.questionsReducer.status
  );

  useEffect(() => {
    if (qid) {
      dispatch(fetchQuestions(qid) as any);
    }
  }, [qid, dispatch]);

  
  const handleSave = () => {
    // Add your save logic here
    console.log('Saving questions...');
  };

  const renderQuestionContent = (question: QuizQuestion) => {
    switch (question.questionType) {
      case 'MULTIPLE_CHOICE':
        return (
          <div className="mt-3">
            {question.choices?.map((choice, idx) => (
              <div key={idx} className="mb-2 d-flex align-items-start">
                <input
                  type="radio"
                  disabled
                  className="mt-1 me-2"
                  style={{ 
                    appearance: 'none',
                    width: '16px',
                    height: '16px',
                    border: '1px solid #73818C',
                    borderRadius: '50%',
                    cursor: 'default'
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
                disabled
                className="mt-1 me-2"
                style={{ 
                  appearance: 'none',
                  width: '16px',
                  height: '16px',
                  border: '1px solid #73818C',
                  borderRadius: '50%',
                  cursor: 'default'
                }}
              />
              <span style={{ color: '#2D3B45', fontSize: '14px' }}>True</span>
            </div>
            <div className="mb-2 d-flex align-items-start">
              <input
                type="radio"
                disabled
                className="mt-1 me-2"
                style={{ 
                  appearance: 'none',
                  width: '16px',
                  height: '16px',
                  border: '1px solid #73818C',
                  borderRadius: '50%',
                  cursor: 'default'
                }}
              />
              <span style={{ color: '#2D3B45', fontSize: '14px' }}>False</span>
            </div>
          </div>
        );
      
      case 'FILL_BLANK':
        return (
          <div className="mt-2">
            <div className="d-inline-block" 
              style={{ 
                width: '200px', 
                height: '1px', 
                backgroundColor: '#73818C',
                marginTop: '8px'
              }} 
            />
          </div>
        );
    }
  };

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" style={{ color: '#2D3B45' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ maxWidth: '800px', padding: '20px' }}>
      {questions.length === 0 ? (
        <div className="text-center py-5">
          <p style={{ color: '#2D3B45' }}>No questions added yet</p>
          <button
            onClick={() => setShowEditor(true)}
            className="btn"
            style={{ backgroundColor: '#008EE2', color: '#FFFFFF' }}
          >
            <i className="bi bi-plus me-2"></i>
            New Question
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {questions.map((question, index) => (
            <div 
              key={question._id} 
              style={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #C7CDD1',
                borderRadius: '3px',
                padding: '20px',
                position: 'relative'
              }}
            >
              {/* Question Header */}
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div style={{ 
                  fontSize: '14px',
                  color: '#2D3B45',
                  fontWeight: '500'
                }}>
                  Question {index + 1}
                  <span className="ms-2" style={{ color: '#73818C' }}>
                    {question.points} pts
                  </span>
                </div>
                <button
                  onClick={() => {
                    setEditingQuestionId(question._id);
                    setShowEditor(true);
                  }}
                  className="btn btn-link p-0"
                  style={{ color: '#008EE2', fontSize: '14px' }}
                >
                  <i className="bi bi-gear"></i>
                </button>
              </div>

              {/* Question Text */}
              <div 
                style={{ 
                  color: '#2D3B45',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  marginBottom: '16px'
                }}
              >
                {question.question}
              </div>

              {/* Question Options */}
              {renderQuestionContent(question)}
            </div>
          ))}

          {/* Action Buttons */}
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid #C7CDD1' }}>
            <div className="d-flex gap-2 justify-content-start">
              <button
                onClick={() => {/* Add your cancel logic */}}
                className="btn"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #C7CDD1',
                  color: '#2D3B45',
                  padding: '7px 15px',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  borderRadius: '3px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn"
                style={{ 
                  backgroundColor: '#BE0000',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '7px 15px',
                  fontSize: '14px',
                  fontWeight: 'normal',
                  borderRadius: '3px'
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Question Editor Modal */}
      {showEditor && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: '#F5F5F5', borderBottom: '1px solid #C7CDD1' }}>
                <h5 className="modal-title" style={{ color: '#2D3B45', fontSize: '16px' }}>
                  {editingQuestionId ? 'Edit Question' : 'New Question'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowEditor(false);
                    setEditingQuestionId(undefined);
                  }}
                />
              </div>
              <div className="modal-body">
                <QuestionEditor
                  questionId={editingQuestionId}
                  onClose={() => {
                    setShowEditor(false);
                    setEditingQuestionId(undefined);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}