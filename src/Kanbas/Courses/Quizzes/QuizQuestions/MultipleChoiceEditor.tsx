import React, { useState } from 'react';
import { QuizQuestionForm } from './questionTypes';

export default function MultipleChoiceEditor({ questionId, onClose }: { questionId?: string; onClose: () => void }) {
  const [answers, setAnswers] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: true }
  ]);

  return (
    <div>
      <div className="mb-4">
        <p className="text-secondary mb-2">Enter your question and multiple answers, then select the one correct answer.</p>
        
        <div className="border rounded">
          <div className="bg-light border-bottom p-2">
            <div className="d-flex gap-2">
              <select className="form-select form-select-sm" style={{ width: '70px' }}>
                <option>12pt</option>
              </select>
              <select className="form-select form-select-sm" style={{ width: '120px' }}>
                <option>Paragraph</option>
              </select>
              <div className="btn-group">
                <button className="btn btn-light btn-sm border">B</button>
                <button className="btn btn-light btn-sm border">I</button>
                <button className="btn btn-light btn-sm border">U</button>
              </div>
            </div>
          </div>
          
          <div className="p-3">
            <textarea 
              className="form-control border-0"
              placeholder="Question"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h6>Answers:</h6>
        {answers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center gap-2 mb-2">
            <div style={{ width: '24px' }}>
              <input
                type="radio"
                name="correctAnswer"
                checked={answer.isCorrect}
                onChange={() => {
                  setAnswers(answers.map((a, i) => ({
                    ...a,
                    isCorrect: i === index
                  })));
                }}
              />
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Possible Answer"
              value={answer.text}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[index].text = e.target.value;
                setAnswers(newAnswers);
              }}
            />
            {answers.length > 2 && (
              <button 
                className="btn btn-link text-danger"
                onClick={() => setAnswers(answers.filter((_, i) => i !== index))}
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        <button 
          className="btn btn-link text-danger"
          onClick={() => setAnswers([...answers, { text: '', isCorrect: false }])}
        >
          + Add Another Answer
        </button>
      </div>

      <div className="d-flex justify-content-start gap-2">
        <button className="btn btn-light" onClick={onClose}>Cancel</button>
        <button className="btn btn-danger">Update Question</button>
      </div>
    </div>
  );
}