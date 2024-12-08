import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Quiz } from '../Quizzes/types';
import { RootState } from '../../store';

export default function Grades() {
  const { cid } = useParams();
  
  const { currentUser } = useSelector((state: RootState) => 
    state.accountReducer
  );

  // Get all quizzes for this course
  const quizzes = useSelector((state: RootState) => 
    state.quizzesReducer.quizzes.filter(q => q.course === cid)
  );

  // Get submissions from state
  const { submissions } = useSelector((state: RootState) => 
    state.submissionsReducer
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h3>Course Grades</h3>

      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Score</th>
              <th>Out Of</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map(quiz => {
              const submission = submissions.find(s => s.quizId === quiz._id);
              return (
                <tr key={quiz._id}>
                  <td>{quiz.title}</td>
                  <td>{submission ? submission.score : '-'}</td>
                  <td>{quiz.points}</td>
                  <td>
                    {submission ? (
                      <span style={{ 
                        color: submission.percentage >= 70 ? '#2D8C3C' : '#D12B1F'
                      }}>
                        {submission.percentage}%
                      </span>
                    ) : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td><strong>Total</strong></td>
              <td>
                {submissions.reduce((sum: number, sub) => sum + sub.score, 0)}
              </td>
              <td>
                {quizzes.reduce((sum: number, quiz: Quiz) => sum + quiz.points, 0)}
              </td>
              <td>
                {submissions.length > 0 ? 
                  Math.round(
                    (submissions.reduce((sum: number, sub) => sum + sub.score, 0) / 
                    quizzes.reduce((sum: number, quiz: Quiz) => sum + quiz.points, 0)
                    ) * 100
                  ) + '%' 
                  : '-'
                }
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}