import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from './reducer';
import { QuizQuestionRootState } from './questionTypes';
import QuestionEditor from './Editor';

const SomeParentComponent = () => {
  const { qid } = useParams();  // Move this to parent

  return qid ? <QuizQuestions quizId={qid} /> : null;
};

// QuizQuestions component
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

  console.log("Filtered questions:", questions); 

  if (status === 'loading') {
    return (
      <div className="p-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Quiz Info Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Quiz Questions</h4>
          <p className="text-secondary mb-0">
            Total Points: {questions.reduce((sum, q) => sum + (q.points || 0), 0)} • {questions.length} Questions
          </p>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center p-4">
          <p className="mb-4">No questions added yet</p>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowEditor(true)}
          >
            + New Question
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            {questions.map((question) => (
              <div key={question._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{question.title}</h5>
                  <p className="card-text text-secondary mb-2">{question.question}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-secondary">{question.points} pts</span>
                    <div>
                      <span className="badge bg-primary me-2">
                        {question.questionType.replace('_', ' ')}
                      </span>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          setEditingQuestionId(question._id);
                          setShowEditor(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setEditingQuestionId(undefined);
              setShowEditor(true);
            }}
          >
            + New Question
          </button>
        </div>
      )}

      {showEditor && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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