import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizByCourseId } from '../data/quizzes';

const QuizAttempt = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const quiz = getQuizByCourseId(parseInt(courseId));

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          No Quiz Available
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          This course does not have a quiz yet.
        </p>
      </div>
    );
  }

  const handleSelect = (qIndex, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [qIndex]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let correct = 0;

    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      }
    });

    setScore(correct);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center 
        bg-white dark:bg-gray-900 
        p-6 rounded-xl shadow">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Quiz Result
        </h2>

        <p className="text-xl mb-2 text-gray-800 dark:text-gray-200">
          Score: {score} / {quiz.questions.length}
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {score >= quiz.questions.length / 2
            ? '🎉 Congratulations! You passed.'
            : '❌ You did not pass. Try again.'}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 
            text-white rounded-lg"
        >
          Back to Course
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 
      bg-white dark:bg-gray-900 
      rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {quiz.title}
      </h1>

      {quiz.questions.map((q, qi) => (
        <div
          key={q.id}
          className="mb-6 p-4 border 
            border-gray-200 dark:border-gray-700 
            rounded-lg bg-gray-50 dark:bg-gray-800"
        >
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Q{qi + 1}. {q.question}
          </h3>

          {q.options.map((opt, oi) => (
            <label
              key={oi}
              className="flex items-center mb-2 cursor-pointer 
                text-gray-800 dark:text-gray-200"
            >
              <input
                type="radio"
                name={`question-${qi}`}
                checked={answers[qi] === oi}
                onChange={() => handleSelect(qi, oi)}
                className="mr-2 accent-blue-600"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="px-8 py-3 bg-green-600 hover:bg-green-700 
          text-white rounded-lg"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizAttempt;
