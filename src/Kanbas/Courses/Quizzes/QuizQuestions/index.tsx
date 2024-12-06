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
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

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

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const renderQuestionContent = (question: QuizQuestion) => {
    switch (question.questionType) {
      case 'MULTIPLE_CHOICE':
        return (
          <div className="ps-4 mt-3">
            {question.choices?.map((choice, idx) => (
              <div key={idx} className="mb-2">
                <span className="me-2">○</span> {choice.text}
              </div>
            ))}
          </div>
        );
      
      case 'TRUE_FALSE':
        return (
          <div className="ps-4 mt-3">
            <div className="mb-2">○ True</div>
            <div className="mb-2">○ False</div>
          </div>
        );
      
      case 'FILL_BLANK':
        return (
          <div className="ps-4">
            <p className="mb-0">{question.question}</p>
            <div className="mt-2 text-secondary">
              <hr className="d-inline-block" style={{ width: '200px', verticalAlign: 'middle' }} />
            </div>
          </div>
        );
    }
  };

  if (status === 'loading') {
    return (
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      {/* Quiz Header */}
      <div className="mb-4 border-bottom pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="h4 mb-0">Questions</h2>
          <div className="text-secondary">
            Total Points: {questions.reduce((sum, q) => sum + (q.points || 0), 0)}
          </div>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-5 bg-light rounded">
          <p className="text-secondary mb-3">No questions added yet</p>
          <button
            onClick={() => setShowEditor(true)}
            className="btn btn-primary"
          >
            <i className="bi bi-plus me-2"></i>
            New Question
          </button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {questions.map((question, index) => (
            <div key={question._id} className="card">
              <div 
                className="card-header bg-white"
                style={{ cursor: 'pointer' }}
                onClick={() => toggleQuestion(question._id)}
              >
                <div className="d-flex align-items-center">
                  <div className="me-3 text-secondary">
                    Question {index + 1}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <i className={`bi ${expandedQuestions.includes(question._id) ? 'bi-chevron-down' : 'bi-chevron-right'} me-2`}></i>
                      <div className="me-2">{question.question}</div>
                      <span className="text-secondary small">({question.points} pts)</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-primary">
                      {question.questionType.replace('_', ' ')}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingQuestionId(question._id);
                        setShowEditor(true);
                      }}
                      className="btn btn-link btn-sm p-0 text-decoration-none"
                    >
                      <i className="bi bi-gear"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              {expandedQuestions.includes(question._id) && (
                <div className="card-body border-top pt-3">
                  {renderQuestionContent(question)}
                </div>
              )}
            </div>
          ))}

          <div className="mt-3">
            <button
              onClick={() => {
                setEditingQuestionId(undefined);
                setShowEditor(true);
              }}
              className="btn btn-outline-secondary"
            >
              <i className="bi bi-plus me-2"></i>
              New Question
            </button>
          </div>
        </div>
      )}

      {/* Question Editor Modal */}
      {showEditor && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
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