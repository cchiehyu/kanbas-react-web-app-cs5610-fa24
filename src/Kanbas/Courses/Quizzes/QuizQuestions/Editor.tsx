// editor.tsx
import React, { useState } from 'react';
import { QuizQuestionForm } from './questionTypes';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TrueFalseEditor';
import FillBlankEditor from './FillBlankEditor';

export default function QuestionEditor({ questionId, onClose }: { questionId?: string; onClose: () => void }) {
  const [questionType, setQuestionType] = useState('MULTIPLE_CHOICE');

  const renderQuestionEditor = () => {
    switch (questionType) {
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceEditor questionId={questionId} onClose={onClose} />;
      case 'TRUE_FALSE':
        return <TrueFalseEditor questionId={questionId} onClose={onClose} />;
      case 'FILL_BLANK':
        return <FillBlankEditor questionId={questionId} onClose={onClose} />;
      default:
        return <MultipleChoiceEditor questionId={questionId} onClose={onClose} />;
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3">
          <select 
            className="form-select"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_BLANK">Fill in the Blank</option>
          </select>
          <div className="d-flex align-items-center">
            <span className="me-2">pts:</span>
            <input type="number" className="form-control" style={{ width: '60px' }} defaultValue="4" />
          </div>
        </div>
      </div>
      {renderQuestionEditor()}
    </div>
  );
}