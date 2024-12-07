import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { QuizQuestionRootState } from '../QuizQuestions/questionTypes';
import { UserAnswer } from './QuizPreviewType';

export default function QuizSubmission() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const userAnswers = location.state?.userAnswers || [];
  const startTime = location.state?.startTime ? new Date(location.state.startTime) : new Date();
  const endTime = new Date();

  const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

  const quiz = useSelector((state: any) => 
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const questions = useSelector((state: QuizQuestionRootState) => 
    state.questionsReducer.questions.filter(q => q.quizId === qid)
  );

  const calculateScore = () => {
    let correctAnswers = 0;
    let totalPoints = 0;
  
    questions.forEach(question => {
      const userAnswer = userAnswers.find((a: UserAnswer) => a.questionId === question._id);
      if (!userAnswer) return;
  
      totalPoints += question.points;
  
      switch (question.questionType) {
        case 'MULTIPLE_CHOICE':
          const correctChoice = question.choices?.find(c => c.isCorrect);
          if (correctChoice && userAnswer.answer === correctChoice.text) {
            correctAnswers += question.points;
          }
          break;
        
        case 'TRUE_FALSE':
          if (userAnswer.answer === question.correctAnswer) {
            correctAnswers += question.points;
          }
          break;
        
        case 'FILL_BLANK':
          const correct = question.correctAnswers?.some(ans => 
            ans.caseSensitive 
              ? ans.text === userAnswer.answer
              : ans.text.toLowerCase() === (userAnswer.answer as string).toLowerCase()
          );
          if (correct) {
            correctAnswers += question.points;
          }
          break;
      }
    });
  
    return {
      score: correctAnswers,
      total: totalPoints,
      percentage: totalPoints > 0 ? Math.round((correctAnswers / totalPoints) * 100) : 0
    };
  };

  const score = calculateScore();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h3>{quiz?.title}</h3>

      <div style={{ 
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold',
          marginBottom: '20px',
          color: score.percentage >= 70 ? '#2D8C3C' : '#D12B1F'
        }}>
          {score.percentage}%
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            Score:
          </div>
          <div>
            {score.score} out of {score.total} points
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            Time Spent:
          </div>
          <div>
            {timeSpent} minutes
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            Submitted:
          </div>
          <div>
            {new Date().toLocaleString()}
          </div>
        </div>

        {quiz?.showCorrectAnswers && (
          <button
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/review`)}
            style={{
              backgroundColor: '#2D8C3C',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            View Correct Answers
          </button>
        )}
      </div>

      <div style={{ 
        marginTop: '20px',
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Return to Quizzes
        </button>

        {quiz?.multipleAttempts && (
          <button
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview/take`)}
            style={{
              backgroundColor: '#2D8C3C',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Take Quiz Again
          </button>
        )}
      </div>
    </div>
  );
}