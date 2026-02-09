const QUIZ_KEY = 'lms_quizzes';

// Get all quizzes
export const getAllQuizzes = () => {
  return JSON.parse(localStorage.getItem(QUIZ_KEY)) || [];
};

// Get quiz by course ID
export const getQuizByCourseId = (courseId) => {
  const quizzes = getAllQuizzes();
  return quizzes.find(q => q.courseId === courseId);
};

// ✅ SAVE QUIZ 
 export const saveQuiz = (quiz) => {
const quizzes = getAllQuizzes();
const index = quizzes.findIndex(q => q.courseId === quiz.courseId);

if (index !== -1) {
  quizzes[index] = quiz; // update
} else {
  quizzes.push(quiz); // create
}

localStorage.setItem(QUIZ_KEY, JSON.stringify(quizzes));
 }
// Update quiz
export const updateQuiz = (courseId, updatedQuiz) => {
  const quizzes = getAllQuizzes();
  const index = quizzes.findIndex(q => q.courseId === courseId);

  if (index !== -1) {
    quizzes[index] = updatedQuiz;
    localStorage.setItem(QUIZ_KEY, JSON.stringify(quizzes));
  }
};
