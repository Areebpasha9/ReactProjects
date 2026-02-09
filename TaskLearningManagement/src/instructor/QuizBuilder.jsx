import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveQuiz } from '../data/quizzes';
import { showToast } from '../utils';

const QuizBuilder = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]);
  };

  const handleSave = () => {
    if (!title || questions.length === 0) {
      showToast('Please add quiz title and at least one question', 'warning');
      return;
    }

    const quiz = {
      id: Date.now(),
      courseId: parseInt(courseId),
      title,
      timeLimit: 10,
      questions
    };

    saveQuiz(quiz);
    showToast('Quiz created successfully', 'success');
    navigate('/instructor/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto p-6
      bg-white dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      min-h-screen"
    >
      <h1 className="text-2xl font-bold mb-6">
        Create Quiz
      </h1>

      {/* Quiz Title */}
      <input
        className="w-full p-3 rounded-lg mb-6
          bg-white dark:bg-gray-800
          border border-gray-300 dark:border-gray-700
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Quiz Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* Questions */}
      {questions.map((q, qi) => (
        <div
          key={q.id}
          className="border rounded-lg p-4 mb-6
            bg-gray-50 dark:bg-gray-800
            border-gray-300 dark:border-gray-700"
        >
          {/* Question */}
          <input
            className="w-full p-2 rounded mb-3
              bg-white dark:bg-gray-900
              border border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-100"
            placeholder={`Question ${qi + 1}`}
            value={q.question}
            onChange={e => {
              const updated = [...questions];
              updated[qi].question = e.target.value;
              setQuestions(updated);
            }}
          />

          {/* Options */}
          {q.options.map((opt, oi) => (
            <div key={oi} className="flex items-center mb-2 gap-2">
              <input
                type="radio"
                checked={q.correctAnswer === oi}
                onChange={() => {
                  const updated = [...questions];
                  updated[qi].correctAnswer = oi;
                  setQuestions(updated);
                }}
              />
              <input
                className="flex-1 p-2 rounded
                  bg-white dark:bg-gray-900
                  border border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-gray-100"
                placeholder={`Option ${oi + 1}`}
                value={opt}
                onChange={e => {
                  const updated = [...questions];
                  updated[qi].options[oi] = e.target.value;
                  setQuestions(updated);
                }}
              />
            </div>
          ))}
        </div>
      ))}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={addQuestion}
          className="px-4 py-2 rounded-lg
            bg-gray-200 dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          + Add Question
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-lg
            bg-blue-600 hover:bg-blue-700
            text-white font-medium"
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizBuilder;
