import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizSubmission, QuizSubmissionAnswer } from './QuizSubmissionType';
import { RootState } from '../../../../store';

const QuizReview = () => {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  
  const [submission, setSubmission] = useState<QuizSubmission | null>(null);
  const [editingScores, setEditingScores] = useState(false);
  const [editedPoints, setEditedPoints] = useState<{[key: string]: number}>({});
  
  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';

  useEffect(() => {
    const fetchSubmission = async () => {
      const response = await fetch(`/api/quizzes/${qid}/submissions/${currentUser._id}`);
      const submissions = await response.json();
      if (submissions.length > 0) {
        setSubmission(submissions[0]);
        // Initialize edited points with current points
        const points: {[key: string]: number} = {};
        submissions[0].answers.forEach((answer: QuizSubmissionAnswer) => {
          points[answer.questionId] = answer.points;
        });
        setEditedPoints(points);
      }
    };
    
    fetchSubmission();
  }, [qid, currentUser._id]);

  const handlePointsChange = (questionId: string, points: number) => {
    setEditedPoints(prev => ({
      ...prev,
      [questionId]: points
    }));
  };

  const saveScores = async () => {
    if (!submission) return;

    const updates = {
      answers: submission.answers.map(answer => ({
        questionId: answer.questionId,
        points: editedPoints[answer.questionId]
      }))
    };

    try {
      const response = await fetch(`/api/submissions/${submission._id}/scores`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updates,
          role: currentUser.role
        }),
      });

      if (response.ok) {
        const updatedSubmission = await response.json();
        setSubmission(updatedSubmission);
        setEditingScores(false);
      }
    } catch (error) {
      console.error('Error updating scores:', error);
    }
  };

  const renderAnswer = (answer: QuizSubmissionAnswer) => {
    const renderPoints = () => (
      <div className="mt-2 text-sm">
        <span className="font-semibold">Points: </span>
        {editingScores && isFacultyOrAdmin ? (
          <input
            type="number"
            value={editedPoints[answer.questionId]}
            onChange={(e) => handlePointsChange(answer.questionId, Number(e.target.value))}
            min="0"
            max={answer.maxPoints}
            className="w-16 px-2 py-1 border rounded"
          />
        ) : (
          `${answer.points} / ${answer.maxPoints}`
        )}
      </div>
    );

    switch (answer.questionType) {
      case 'MULTIPLE_CHOICE':
        return (
          <div className="mb-6 p-4 border rounded">
            <h4 className="font-bold mb-2">{answer.question}</h4>
            {answer.choices?.map((choice) => (
              <div 
                key={choice.text}
                className={`p-2 mb-2 rounded ${
                  choice.isCorrect ? 'bg-green-100' :
                  choice.text === answer.userAnswer ? 'bg-red-100' : 'bg-gray-50'
                }`}
              >
                <span className="mr-2">
                  {choice.isCorrect ? '✓' : 
                   choice.text === answer.userAnswer ? '✗' : ''}
                </span>
                {choice.text}
              </div>
            ))}
            {renderPoints()}
          </div>
        );

      case 'TRUE_FALSE':
        return (
          <div className="mb-6 p-4 border rounded">
            <h4 className="font-bold mb-2">{answer.question}</h4>
            <div className={`p-2 mb-2 rounded ${answer.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div>Your answer: {String(answer.userAnswer)}</div>
              <div>Correct answer: {String(answer.correctAnswer)}</div>
            </div>
            {renderPoints()}
          </div>
        );

      case 'FILL_BLANK':
        return (
          <div className="mb-6 p-4 border rounded">
            <h4 className="font-bold mb-2">{answer.question}</h4>
            <div className={`p-2 mb-2 rounded ${answer.isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
              <div>Your answer: {String(answer.userAnswer)}</div>
              <div>Correct answer: {String(answer.correctAnswer)}</div>
            </div>
            {renderPoints()}
          </div>
        );
    }
  };

  if (!submission) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{quiz?.title} - Review</h2>
        <div className="text-lg">
          Score: {submission.percentage}% ({submission.score} / {submission.maxScore} points)
        </div>
      </div>

      {isFacultyOrAdmin && (
        <div className="mb-4">
          {editingScores ? (
            <div className="space-x-2">
              <button
                onClick={saveScores}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Scores
              </button>
              <button
                onClick={() => setEditingScores(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingScores(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Scores
            </button>
          )}
        </div>
      )}

      <div className="mb-6">
        {submission.answers.map((answer) => renderAnswer(answer))}
      </div>

      <button
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Return to Quizzes
      </button>
    </div>
  );
};

export default QuizReview;