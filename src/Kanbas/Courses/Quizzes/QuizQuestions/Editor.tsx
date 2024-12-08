import React, { useState, useEffect  } from 'react';
import { useSelector } from 'react-redux';
import { QuizQuestion, QuizQuestionRootState } from './questionTypes';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TrueFalseEditor';
import FillBlankEditor from './FillBlankEditor';

export default function QuestionEditor({ questionId, onClose }: { questionId?: string; onClose: () => void }) {

  const question = useSelector((state: QuizQuestionRootState) =>
    questionId ? state.questionsReducer.questions.find(q => q._id === questionId) : undefined
  );

  const [questionType, setQuestionType] = useState(question?.questionType || 'MULTIPLE_CHOICE');
  const [points, setPoints] = useState(question?.points || 4);
  
  useEffect(() => {
    if (question?.questionType) {
      setQuestionType(question.questionType);
    }
  }, [question]);

  const renderQuestionEditor = () => {
    const editorProps = {
      questionId,
      onClose,
      points,
      setPoints
    };
  
    switch (questionType) {
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceEditor {...editorProps} />;
      case 'TRUE_FALSE':
        return <TrueFalseEditor {...editorProps} />;
      case 'FILL_BLANK':
        return <FillBlankEditor {...editorProps} />;
      default:
        return <MultipleChoiceEditor {...editorProps} />;
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-3">
          <select
            className="form-select"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuizQuestion['questionType'])}
            style={{ width: 'auto' }}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_BLANK">Fill in the Blank</option>
          </select>
          <div className="d-flex align-items-center">
            <span className="me-2">pts:</span>
            <input
              type="number"
              className="form-control"
              style={{ width: '60px' }}
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              />
          </div>
        </div>
      </div>
      {renderQuestionEditor()}
    </div>
  );
}