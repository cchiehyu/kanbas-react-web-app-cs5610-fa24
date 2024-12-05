import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestions } from './reducer';
import * as client from './client';
import { QuizQuestionRootState } from './questionTypes';
import QuestionEditor from './Editor';

export default function QuizQuestions() {
  const { qid } = useParams();
  const dispatch = useDispatch();
  const [showEditor, setShowEditor] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | undefined>();
  
  const questions = useSelector((state: QuizQuestionRootState) => 
    state.questionsReducer.questions.filter(q => q.quizId === qid)
  );

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await client.findQuestionsForQuiz(qid as string);
        dispatch(setQuestions(fetchedQuestions));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    if (qid) {
      fetchQuestions();
    }
  }, [qid, dispatch]);

  return (
    <div className="p-4">
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
                  >

                </button>
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