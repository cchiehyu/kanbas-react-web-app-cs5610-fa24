import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { FaSearch } from 'react-icons/fa';
import { deleteQuiz, setQuizzes, togglePublishQuiz } from './reducer';
import * as client from "./client";
import { Quiz, RootState } from './types';

export default function QuizList() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    quizId: '',
    quizTitle: ''
  });

  const quizzes = useSelector((state: RootState) => 
    state.quizzesReducer.quizzes.filter(quiz => 
      quiz.course === cid &&
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const fetchedQuizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(fetchedQuizzes));
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, [cid, dispatch]);

  const handleDeleteClick = (quizId: string, title: string) => {
    setDeleteDialog({
      isOpen: true,
      quizId,
      quizTitle: title
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await client.deleteQuiz(deleteDialog.quizId);
      dispatch(deleteQuiz(deleteDialog.quizId));
      setDeleteDialog({
        isOpen: false,
        quizId: '',
        quizTitle: ''
      });
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handlePublishToggle = async (quizId: string) => {
    try {
      await client.publishQuiz(quizId);
      dispatch(togglePublishQuiz(quizId));
    } catch (error) {
      console.error("Error toggling quiz publish status:", error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const getAvailabilityStatus = (quiz: Quiz): string => {
    const now = new Date().getTime();
    const availableFrom = new Date(quiz.availableFromDate).getTime();
    const availableUntil = new Date(quiz.availableUntilDate).getTime();

    if (now > availableUntil) {
      return "Closed";
    } else if (now >= availableFrom && now <= availableUntil) {
      return "Available";
    } else {
      return `Not available until ${formatDate(quiz.availableFromDate)}`;
    }
  };

  const getStudentScore = (quizId: string) => {
    // This will be replaced with actual grade lookup logic later
    return currentUser.role === 'STUDENT' ? Math.floor(Math.random() * 100) : undefined;
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="input-group" style={{ width: '250px' }}>
          <input 
            type="text"
            className="form-control"
            placeholder="Search for Quiz"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text bg-transparent">
            <FaSearch />
          </span>
        </div>
        <div className="d-flex gap-2">
          <Link 
            to={`/Kanbas/Courses/${cid}/Quizzes/new`}
            className="btn btn-danger"
          >
            + Quiz
          </Link>
          <div className="dropdown">
            <button 
              className="btn btn-light" 
              type="button" 
              data-bs-toggle="dropdown"
            >
              <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">Sort by Due Date</a></li>
              <li><a className="dropdown-item" href="#">Sort by Title</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quizzes Section */}
      <div className="border rounded bg-light">
        <div className="p-3 border-bottom">
          <h5 className="m-0">▾ Assignment Quizzes</h5>
        </div>
        
        <div className="list-group list-group-flush">
          {quizzes.map((quiz) => (
            <div 
              key={quiz._id} 
              className="list-group-item d-flex align-items-center"
            >
              <RiQuestionAnswerLine className="text-success fs-4 me-3" />
              
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center">
                  <Link 
                    to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="text-decoration-none text-dark fw-bold"
                  >
                    {quiz.title}
                  </Link>
                  <div className="d-flex align-items-center gap-2">
                    {quiz.published && (
                      <span className="text-success">✓</span>
                    )}
                    <div className="dropdown">
                      <button 
                        className="btn btn-light btn-sm"
                        data-bs-toggle="dropdown"
                      >
                        <BsThreeDotsVertical />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <Link 
                            to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                            className="dropdown-item"
                          >
                            Edit
                          </Link>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item"
                            onClick={() => handleDeleteClick(quiz._id, quiz.title)}
                          >
                            Delete
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item"
                            onClick={() => handlePublishToggle(quiz._id)}
                          >
                            {quiz.published ? 'Unpublish' : 'Publish'}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="text-secondary small mt-1">
                  <span>{getAvailabilityStatus(quiz)}</span>
                  <span className="mx-2">|</span>
                  <span>Due {formatDate(quiz.dueDate)}</span>
                  <span className="mx-2">|</span>
                  <span>{quiz.points} pts</span>
                  <span className="mx-2">|</span>
                  <span>{quiz.numberOfQuestions} Questions</span>
                  {currentUser.role === 'STUDENT' && (
                    <>
                      <span className="mx-2">|</span>
                      <span>Score: {getStudentScore(quiz._id)} / {quiz.points}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteDialog.isOpen && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Quiz</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setDeleteDialog({
                    isOpen: false,
                    quizId: '',
                    quizTitle: ''
                  })}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete the quiz "{deleteDialog.quizTitle}"?
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setDeleteDialog({
                    isOpen: false,
                    quizId: '',
                    quizTitle: ''
                  })}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}