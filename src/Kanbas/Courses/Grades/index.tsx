import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
    state.quizzesReducer.quizzes.filter((q) => q.course === cid)
  );

  // Get submissions from state
  const { submissions } = useSelector((state: RootState) =>
    state.submissionsReducer
  );

  return (
    <div className="container-fluid mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="text-primary">Course Grades</h3>
          <p className="text-muted mb-0">
            {currentUser?.name ? `Grades for ${currentUser.name}` : "Your Grades"}
          </p>
        </div>
        <div>
          <span className="badge bg-secondary text-light">{cid}</span>
        </div>
      </div>

      <div className="table-responsive mt-4">
        <table className="table table-hover border">
          <thead className="bg-dark text-light">
            <tr>
              <th>Quiz</th>
              <th>Score</th>
              <th>Out Of</th>
              <th>Available Date</th>
              <th>Due Date</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => {
              const submission = submissions.find((s) => s.quizId === quiz._id);
              
              // Display earned/total points
              const earnedPoints = submission ? submission.score : '-';
              const maxPoints = quiz.points;
              const pointsDisplay = submission ? `${earnedPoints}/${maxPoints}` : `-/${maxPoints}`;

              const availableDate = quiz.availableFromDate
                ? new Date(quiz.availableFromDate).toDateString()
                : '-';
              const dueDate = quiz.dueDate
                ? new Date(quiz.dueDate).toDateString()
                : '-';

              return (
                <tr key={quiz._id}>
                  <td className="fw-bold text-primary">
                    <Link to={`/Kanbas/Courses/${cid}/quizzes/${quiz._id}/preview`} className="text-decoration-none">
                      {quiz.title}
                    </Link>
                  </td>
                  <td>{pointsDisplay}</td>
                  <td>{maxPoints}</td>
                  <td>{availableDate}</td>
                  <td>{dueDate}</td>
                  <td>
                    {submission ? (
                      <span className={`fw-bold ${
                        submission.percentage >= 70 ? "text-success" : "text-danger"
                      }`}>
                        {submission.percentage}%
                      </span>
                    ) : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="fw-bold">
              <td>Total</td>
              <td>
                {submissions.reduce((sum: number, sub) => sum + sub.score, 0)}
              </td>
              <td>
                {quizzes.reduce((sum: number, quiz: Quiz) => sum + quiz.points, 0)}
              </td>
              <td colSpan={3}>
                {submissions.length > 0
                  ? Math.round(
                      (submissions.reduce((sum: number, sub) => sum + sub.score, 0) /
                        quizzes.reduce((sum: number, quiz: Quiz) => sum + quiz.points, 0)) *
                        100
                    ) + '%'
                  : '-'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}