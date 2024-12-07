import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { QuizQuestionRootState } from '../QuizQuestions/questionTypes';
import { RootState } from '../../../store';

export default function QuizStartScreen() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  
  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';
  const isStudent = currentUser.role === 'Student';

  return (
    <div className="p-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h3>{quiz?.title}</h3>
      
      <div className="alert alert-warning mt-3">
        <i className="bi bi-exclamation-circle me-2"></i>
        This is a preview of the published version of the quiz
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <div className="mb-3">
            <strong>Quiz Instructions</strong>
          </div>
          <p>{quiz?.description || 'No instructions provided.'}</p>
          
          <hr />
          
          <div className="quiz-info-container mb-4" style={{ padding: '16px' }}>
            <div className="row">
              <div className="col-6 col-md-3">
                <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '8px' }}>Time Limit</div>
                <div style={{ fontSize: '0.9rem', color: '#555' }}>
                  {quiz?.timeLimit ? `${quiz.timeLimit} Minutes` : 'No time limit'}
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '8px' }}>Multiple Attempts</div>
                <div style={{ fontSize: '0.9rem', color: quiz?.multipleAttempts ? '#28a745' : '#dc3545' }}>
                  {quiz?.multipleAttempts ? 'Yes' : 'No'}
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '8px' }}>Attempts Left</div>
                <div style={{ fontSize: '0.9rem', color: '#555' }}>
                  {quiz?.multipleAttempts ? quiz?.Attempts || 'Unlimited' : '1'}
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '8px' }}>Points</div>
                <div style={{ fontSize: '0.9rem', color: '#555' }}>
                  {quiz?.points || '0'} pts
                </div>
              </div>
            </div>
          </div>


          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-outline-dark"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/take`)}
            >
              Begin Quiz
            </button>
          </div>
        </div>
      </div>


      {/* Keep editing link */}
      {!isStudent && (
      <div className="mt-4 text-center">
        <button 
          className="btn btn-link"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`)}
        >
          Keep Editing This Quiz
        </button>
      </div>
      )}
    </div>
  );
}