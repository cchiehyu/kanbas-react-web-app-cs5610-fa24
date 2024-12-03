import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Quiz, RootState } from './types';

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  const quiz = useSelector((state: RootState) => 
    state.quizzesReducer.quizzes.find(q => q._id === qid)
  );

  const formatDate = (date: Date | string) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  if (!quiz) return null;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-end gap-2 mb-4">
        {currentUser.role !== 'STUDENT' ? (
          <button className="btn btn-light">Edit</button>
        ) : (
          <button className="btn btn-light">Preview</button>
        )}
      </div>

      <h4 className="mb-4">{quiz.title}</h4>

      <div className="details-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr',
        gap: '10px',
        maxWidth: '600px'
      }}>
        <div className="text-end text-secondary pe-3">Quiz Type</div>
        <div>{quiz.quizType.replace('_', ' ')}</div>

        <div className="text-end text-secondary pe-3">Points</div>
        <div>{quiz.points}</div>

        <div className="text-end text-secondary pe-3">Assignment Group</div>
        <div>{quiz.assignmentGroup}</div>

        <div className="text-end text-secondary pe-3">Shuffle Answers</div>
        <div>{quiz.shuffleAnswers ? 'Yes' : 'No'}</div>

        <div className="text-end text-secondary pe-3">Time Limit</div>
        <div>{quiz.timeLimit} Minutes</div>

        <div className="text-end text-secondary pe-3">Multiple Attempts</div>
        <div>{quiz.multipleAttempts ? 'Yes' : 'No'}</div>

        <div className="text-end text-secondary pe-3">Show Correct Answers</div>
        <div>{quiz.showCorrectAnswers ? 'Immediately' : 'No'}</div>

        <div className="text-end text-secondary pe-3">One Question at a Time</div>
        <div>{quiz.oneQuestionAtTime ? 'Yes' : 'No'}</div>

        <div className="text-end text-secondary pe-3">Webcam Required</div>
        <div>{quiz.webcamRequired ? 'Yes' : 'No'}</div>

        <div className="text-end text-secondary pe-3">Lock Questions After Answering</div>
        <div>{quiz.lockQuestionsAfterAnswering ? 'Yes' : 'No'}</div>
      </div>

      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Due</th>
              <th>For</th>
              <th>Available from</th>
              <th>Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDate(quiz.dueDate)}</td>
              <td>Everyone</td>
              <td>{formatDate(quiz.availableFromDate)}</td>
              <td>{formatDate(quiz.availableUntilDate)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}